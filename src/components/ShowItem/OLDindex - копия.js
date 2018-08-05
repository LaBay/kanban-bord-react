import React from 'react';
import './index.css'



export default function ShowItem(props){
	// constructor(props){
	// 	super(props);
		
	// 	// this.onClickDone = this.onClickDone.bind(this);
	// };

	const {items} = props;

	 // console.log(items);


	function timeHandle(date){
		
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

	const itemElement = items.map(function(item){
		if(item.status === props.status){ return(
			<li key={item.date}>
		 		<h3>{item.description}</h3>
		 		<p>Priority: {item.priority}</p>
		 		<p>Date: {timeHandle(item.date)}</p>
		 		
	 		</li>
			)}else{return null}
	})
	// <p>Status: {item.status}</p>
	// console.log("props= ", props)


	return(
		<ul>
			{itemElement}
		</ul>
	)
}

