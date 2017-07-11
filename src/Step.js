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
		if( nextProps.step.status != this.state.step.status) {
			nextProps.step.status === 'active' ? this.startClock() : null
		}
		this.setState({
			step: {...this.state.step, status: nextProps.step.status}
		})
	}

	startClock() {
		this.intervalCount = setInterval( this.actionCount.bind(this), 1000 );
	}

	stopClock() {
		clearInterval(this.intervalCount);
	}

	viewTime(value) {
		let seconds = moment.duration(value).seconds();
		let minutes = moment.duration(value).minutes();
		let hours = moment.duration(value).hours();
		let pad2 = (number) => {return (number < 10 ? '0' : '') + number};
		return pad2(hours) + ':' + pad2(minutes) + ':' + pad2(seconds);
	}

	viewCounter(a, b) {
		let sep = a > b ? '>' : a < b ? '/' : '=';
		return a + ' ' + sep + ' ' + b;
	}

	timeInterval() {
		let step = this.state.step;
		step.milliseconds = step.milliseconds += 1000;
		this.setState({
			step: step
		})
	}

	actionCount() {
		this.timeInterval()
		let step = this.state.step;
		
		if(step.countStartVal < step.countEndVal) {
			step.countStartVal += step.intervalValue;
		}
		if(step.countStartVal > step.countEndVal) {
			step.countStartVal -= step.intervalValue;
		}
		if(step.countStartVal === step.countEndVal) {
			step.status = 'complete';
			this.stopClock();
			this.props.handleAactionStep(step);
		}
		this.setState({
			step: step
		})
	}

	clickStep() {
		this.props.clickStep(this.state.step);
	}

	render() {
		const { step } = this.state;
		return (
				<div className={step.status} onClick={() => this.clickStep(this)}>					
					<div>
						<div className="name">{step.id} {step.name}</div>
						<div className="time"><Icon name='clock-o' /> {this.viewTime(step.milliseconds)}</div>
						<div className="counter">{this.viewCounter(step.countStartVal, step.countEndVal)}</div>
					</div>
				</div>
			);
	}

}


Step.displayName = 'Step'

export default (Step)