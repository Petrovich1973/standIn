import React, { Component } from 'react';

class Clock extends Component {

	constructor(props){
		super(props);
		this.state = {
			currentCount: 0,
			intervalCount: 1
		}
	}

	timer() {
		this.setState({
			currentCount: this.state.currentCount + this.state.intervalCount
		})
		if(this.state.currentCount < 1) { 
			clearInterval(this.intervalId);
		}
	}

	componentDidMount() {
		this.setState({
			intervalCount: this.props.intervalCount || 1
		})
		this.intervalId = setInterval(this.timer.bind(this), 1000);
	}

	componentWillUnmount(){
		clearInterval(this.intervalId);
	}

	render() {
		return <span>{this.state.currentCount}</span>
	}

}

module.exports = Clock;