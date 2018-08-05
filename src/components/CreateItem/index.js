import React from 'react';
import ItemList from '../itemList';
import './index.css';

var Item = {
	description: "",
	priority: "",
	date: "",
	status: ""
}

class CreateItem extends React.Component {

	itemAssignment(){
		Item.date = Date.now(new Date());
		Item.status = "do it";
		// console.log(Item)
		ItemList.push(Object.assign({}, Item));
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
			<form className="inputBlock" action="" onSubmit={this.handleSubmit.bind(this)}>
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