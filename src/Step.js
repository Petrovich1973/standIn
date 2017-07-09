import React from 'react'
import ReactDOM from 'react-dom'

import Icon from 'react-fontawesome'

import moment from 'moment'

class Step extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.initialState = {
			step: this.props.step
		};
	}

	componentDidMount() {
	}

	componentWillUnmount() {
		clearInterval(this.intervalCount);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			step: nextProps.step
		})
	}

	// start() {
	// 	this.intervalCount = setInterval( this.actionCount.bind(this), 1000 );
	// }

	// stop() {
	// 	clearInterval(this.intervalCount);
	// }

	time(value) {
		let seconds = moment.duration(value).seconds();
		let minutes = moment.duration(value).minutes();
		let hours = moment.duration(value).hours();
		let pad2 = (number) => {return (number < 10 ? '0' : '') + number};
		return pad2(hours) + ':' + pad2(minutes) + ':' + pad2(seconds);
	}

	counter(a, b) {
		let sep = a > b ? '>' : a < b ? '/' : '=';
		return a + ' ' + sep + ' ' + b;
	}

	// timeInterval() {
	// 	let step = this.props.step;
	// 	step.milliseconds = step.milliseconds += 1000;
	// 	this.sentToParent(step);
	// }

	// actionCount() {
	// 	let step = this.props.step;
		
	// 	if(step.countStartVal < step.countEndVal) {
	// 		step.countStartVal += step.intervalValue;
	// 	}
	// 	if(step.countStartVal > step.countEndVal) {
	// 		step.countStartVal -= step.intervalValue;
	// 	}
	// 	if(step.countStartVal === step.countEndVal) {
	// 		this.stop()
	// 	}
	// 	this.sentToParent(step);
	// }

	clickStep() {
		this.props.handleAactionStep(this.state.step.id);
	}

	render() {
		const { step } = this.state;
		return (
				<div className={step.status} onClick={() => this.clickStep(this)}>
					<div>
						<div className="name">{step.id} {step.name}</div>
						<div className="time"><Icon name='clock-o' /> {this.time(step.milliseconds)}</div>
						<div className="counter">{this.counter(step.countStartVal, step.countEndVal)}</div>
					</div>
				</div>
			);
	}

}


Step.displayName = 'Step'

export default (Step)