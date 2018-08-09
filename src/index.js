import React, {Component} from 'react';
 
import CreateItem from './components/CreateItem/CreateItem.js'
import ShowItem from './components/ShowItem/ShowItem.js'
import {render} from 'react-dom';
import './index.css';

let items = [];

if(typeof localStorage.itemList !== "undefined"){items = JSON.parse(localStorage.getItem("itemList"))
	}else{localStorage.setItem("itemList", JSON.stringify(items))};



class App extends Component{

	state = {
		isOpen: false,
		list: JSON.parse(localStorage.getItem("itemList")),
	}

	render(){
		const formBlock = this.state.isOpen && <CreateItem items={this.state.list} updateItems={this.updateItems}/>;
		const status = ["do it", "doing", "done", "aborted"];

		return(
			<div className="wrapper" >
				<section>
					<h2>DO IT</h2>
					<ShowItem items={this.state.list} status={status[0]} updateItems={this.updateItems}/> 
					<button className="createItem" onClick={this.handleClick}>{this.state.isOpen ? "Close Form" : "Add an item"}</button>
					{formBlock}
				</section>
				<section>
					<h2>DOING</h2>
					<ShowItem items={this.state.list} status={status[1]} updateItems={this.updateItems}/>
				</section>
				<section>
					<h2>DONE</h2>
					<ShowItem items={this.state.list} status={status[2]} updateItems={this.updateItems}/>
				</section>
				<section >
					<h2>ABORTED</h2>
					<ShowItem items={this.state.list} status={status[3]} updateItems={this.updateItems}/>
				</section>
			</div>
		)
	}

	handleClick = () => {
		this.setState({
			isOpen: !this.state.isOpen

		})
	}

	updateItems = (items) => {
		localStorage.setItem('itemList', JSON.stringify(items));
		this.setState({
			list: items
		})
	}
}

render (<App/>, document.getElementById('root'))