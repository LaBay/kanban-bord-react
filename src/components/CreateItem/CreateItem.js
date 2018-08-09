import React from 'react';
import './index.css';

let Item = {
	description: "",
	priority: "",
	date: "",
	status: ""
}

class CreateItem extends React.Component {
	constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	itemAssignment(){
		Item.date = Date.now(new Date());
		Item.status = "do it";
		const items = this.props.items;
		const updateItems = this.props.updateItems;
		items.push(Object.assign({}, Item));
		updateItems(items);
		for (let i in Item) Item[i] = "";
	}

	handleDescription(event) {
		Item.description = event.target.value;
	}

	handlePriority(event) {
		Item.priority = event.target.value;
	}

	handleSubmit(event){
		if((Item.description.length > 0) && (Item.priority.length > 0)){
			this.itemAssignment();
			event.target.reset();
		}else{alert("Fill all fields")};
		event.preventDefault();
	}

	render() {

		return(
			<form className="inputBlock" action="" onSubmit={this.handleSubmit}>
				<textarea  placeholder="Enter a task" onChange={this.handleDescription}/>	
				<label htmlFor="nothing">Set priority: 
					
					<input id="radio1" type="radio" name="priority" value="low" onClick={this.handlePriority}/>
					<label htmlFor="radio1">low</label>
					
					<input id="radio2" type="radio" name="priority" value="normal" onClick={this.handlePriority}/>
					<label htmlFor="radio2">normal</label>
					
					<input id="radio3" type="radio" name="priority" value="high" onClick={this.handlePriority}/>
					<label htmlFor="radio3">high</label>

				</label>
				<br/>
				<input type="submit" value="Create" />
			</form>
	 	)
	}
}

export default CreateItem