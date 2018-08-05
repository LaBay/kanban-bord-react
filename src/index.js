import React, {Component} from 'react';
import CreateItem from './components/CreateItem/'
import ShowItem from './components/ShowItem/'
import {render} from 'react-dom';
import './index.css';
import items from './components/itemList';

class App extends Component{
	state = {
		isOpen: false,
		list: items
	}

	render(){
		const formBlock = this.state.isOpen && <CreateItem/>;
		console.log("this.state.list= ", this.state.list)
		const status = ["do it", "doing", "done", "aborted"];


		return(
			<div className="wrapper" >
				<section>
					<h2>DO IT</h2>
					<ShowItem items={this.state.list} status={status[0]} />
					<button className="createItem" onClick={this.handleClick}>{this.state.isOpen ? "Close Form" : "Add an item"}</button>
					{formBlock}
				</section>
				<section>
					<h2>DOING</h2>
					<ShowItem items={items} status={status[1]} />
				</section>
				<section>
					<h2>DONE</h2>
					<ShowItem items={items} status={status[2]} />
				</section>
				<section >
					<h2>ABORTED</h2>
					<ShowItem items={items} status={status[3]} />
				</section>
			</div>
		)
	}

	handleClick = () => {
		this.setState({
			isOpen: !this.state.isOpen

		})
	}
}

render (<App/>, document.getElementById('root'))