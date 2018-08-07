import React, {Component} from 'react';
import ItemList from '../itemList';
import './index.css'

class ShowItem extends Component{

    constructor(){
        super();

        this.moveToDoing = this.moveToDoing.bind(this);
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
		 console.log("contenteditable= ", e.target.getAttribute("contenteditable"));
	}

	onKeyPress(e){
		let element = e.target;
		let dataKey = element.parentElement.getAttribute("data-key");
		ItemList[ItemList.findIndex((el, i) => {
			if(el.date == dataKey) return true
				else return false
		})].description = element.innerHTML;
		console.log(ItemList)
	}

	moveToDoing(e){
		let dataKey = e.target.parentElement.getAttribute("data-key");

		const items = this.props.items;
		const updateItems = this.props.updateItems;

        let temp = items.slice();
        temp[this.findIndex(dataKey)].status = "doing";
		updateItems(temp);

		console.log(ItemList)
	}

	moveToDone(e){
		let dataKey = e.target.parentElement.getAttribute("data-key");
		ItemList[ItemList.findIndex((el, i) => {
			if(el.date == dataKey) return true
				else return false
		})].status = "done";
		console.log(ItemList)
	}

	moveToAborted(e){
		let dataKey = e.target.parentElement.getAttribute("data-key");
		ItemList[ItemList.findIndex((el, i) => {
			if(el.date == dataKey) return true
				else return false
		})].status = "aborted";
		console.log(ItemList)
	}

	deleteItem(e){
		let dataKey = e.target.parentElement.getAttribute("data-key");
		ItemList.splice([ItemList.findIndex((el, i) => {
			if(el.date == dataKey) return true
				else return false
		})], 1);
		console.log(ItemList)
	}

    findIndex(dataKey){
        return this.props.items.findIndex((el, i) => {
    		if(el.date == dataKey) return true
    	    else return false
    	})
    }

	render(){

		let self = this;
		const {items} = this.props;
		const status = this.props.status;

		const itemElement = items.map(function(item){
			if(item.status === status){ 
				return(

					<li key={item.date} data-key={item.date}>
				 		<h3  
				 			onClick = {(item.status === "do it") ? self.onClick : undefined} 
				 			onKeyPress={self.onKeyPress}>
				 			{item.description}
				 		</h3>
				 		<p>Priority: {item.priority}</p>
				 		<p>Date: {self.timeHandle(item.date)}</p>
				 		{/*<p>Status: {item.status}</p>*/}
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
