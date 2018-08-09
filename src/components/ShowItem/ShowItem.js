import React, {Component} from 'react';
import './index.css'

class ShowItem extends Component{
	constructor(){
		super();
		this.onKeyPress = this.onKeyPress.bind(this);	
		this.moveToDoing = this.moveToDoing.bind(this);
		this.moveToDone = this.moveToDone.bind(this);
		this.moveToAborted = this.moveToAborted.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.findIndex = this.findIndex.bind(this);
	}

	timeHandle(date){
		
			let time = new Date(date);
			
			function zeroAdder(number){
				return (number < 10) ? ("0" + number) : number;
			}

			return 	zeroAdder(time.getDate()) + 
					"-" + zeroAdder(time.getMonth()) + 
					"-" + time.getFullYear() + 
					" " + zeroAdder(time.getHours()) + 
					":" + zeroAdder(time.getMinutes());
		};

	onClick(e){
		e.target.setAttribute("contenteditable", "true");
	}

	onKeyPress(e){
		let element = e.target;
		element.onblur = () => {
			let dataKey = element.parentElement.getAttribute("data-key");
			const items = this.props.items;
			const updateItems = this.props.updateItems;
			let temp = items.slice();
			temp[this.findIndex(dataKey)].description = element.innerHTML;
			updateItems(temp);
		}
	}

	moveToDoing(e){
		let dataKey = e.target.parentElement.getAttribute("data-key");
		const items = this.props.items;
		const updateItems = this.props.updateItems;
		let temp = items.slice();
        temp[this.findIndex(dataKey)].status = "doing";
		updateItems(temp);
	}

	moveToDone(e){
		let dataKey = e.target.parentElement.getAttribute("data-key");
		const items = this.props.items;
		const updateItems = this.props.updateItems;
		let temp = items.slice();
        temp[this.findIndex(dataKey)].status = "done";
		updateItems(temp);
	}

	moveToAborted(e){
		let dataKey = e.target.parentElement.getAttribute("data-key");
		const items = this.props.items;
		const updateItems = this.props.updateItems;
		let temp = items.slice();
		temp[this.findIndex(dataKey)].status = "aborted";
		updateItems(temp);
	}

	deleteItem(e){
		let dataKey = e.target.parentElement.getAttribute("data-key");
		const items = this.props.items;
		const updateItems = this.props.updateItems;
		let temp = items.slice();
		temp.splice([this.findIndex(dataKey)], 1);
		updateItems(temp);
	}

	changePriority = (e) => {
		let element = e.target;
		let dataKey = element.parentElement.parentElement.getAttribute("data-key");
		const items = this.props.items;
		const updateItems = this.props.updateItems;
		let temp = items.slice();
		temp[this.findIndex(dataKey)].priority = element.value;
		updateItems(temp);
	}

	findIndex(dataKey){
		return this.props.items.findIndex((el, i) => {
			if(el.date === parseInt(dataKey, 10)) return true
			else return false
		})
	}

	render(){
		let self = this;
		const {items, status} = this.props;
		const sortItems = items.slice();
		
		sortItems.sort((a,b) =>{
			if(a.priority === "high" && b.priority === "high") return a.date - b.date;
			if(a.priority === "normal" && b.priority === "high") return 1;
			if(a.priority === "low" && b.priority === "high") return 1;
			if(a.priority === "normal" && b.priority === "normal") return a.date - b.date;
			if(a.priority === "low" && b.priority === "normal") return 1;
			if(a.priority === "low" && b.priority === "low") return a.date - b.date;
			return false
		})
		
		const itemElement = sortItems.map(function(item){
			if(item.status === status){ 
				return(

					<li key={item.date} data-key={item.date}>
						<h3
							onClick = {(item.status === "do it") ? self.onClick : undefined} 
							onKeyPress={self.onKeyPress}>
							{item.description}
						</h3>
						<p  onBlur={(item.status === "do it" || item.status === "doing") ? self.changePriority : undefined}>
							<span>Priority: </span>
							<span className={(item.status === "do it" || item.status === "doing") ? "hide" : undefined}>{item.priority}</span> 
							
							{
								(item.status === "do it" || item.status === "doing") 
								? 
								(<select className="show">
									<option value="low">low</option>
									<option value="normal">normal</option>
									<option value="high">high</option>
								</select>) 
								: 
								undefined
							}
						</p>
										
						<p>Date: {self.timeHandle(item.date)}</p>
						{item.status === "do it" ? <button onClick={self.moveToDoing}>Move to DOING</button> : undefined}
						{item.status === "doing" ? <button onClick={self.moveToDone}>Move to DONE</button> : undefined}
						{(item.status === "do it" || item.status === "doing") ? <button onClick={self.moveToAborted}>Abort</button> : undefined}
						{(item.status === "done" || item.status === "aborted") ? <button onClick={self.deleteItem}>Delete</button> : undefined}
			
					</li>
					)}else{return null}
		})

		return(
			<ul>
				{itemElement}
			</ul>
		)
	}
}

export default ShowItem