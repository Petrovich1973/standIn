import React from 'react'
import ReactDOM from 'react-dom'

import Icon from 'react-fontawesome'

import moment from 'moment'

const statuse = ['static', 'ready', 'active', 'complete'];

class Step extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.initialState = {
			step: this.props.step,
			time: '00:00:00' //можно удалить
		};
	}

	componentDidMount() {
		// this.setState({
		// 	step: this.props.step
		// })
	}

	componentWillUnmount() {
		clearInterval(this.intervalTime);
		clearInterval(this.intervalCount);
	}

	componentWillReceiveProps(nextProps) {
		// if(nextProps.step.status > this.props.step.status && nextProps.step.status === 'active') {
		// 	this.start()
		// }
		// if(nextProps.step.status === 'complete') {
		// 	this.stop()
		// }
	}

	start() {
		this.intervalTime = setInterval( this.timeInterval.bind(this), 1000 );
		this.intervalCount = setInterval( this.actionCount.bind(this), 1000 );
	}

	stop() {
		clearInterval(this.intervalTime);
		clearInterval(this.intervalCount);
	}

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

	timeInterval() {
		let step = this.props.step;
		step.milliseconds = step.milliseconds += 1000;
		this.sentToParent(step);
	}

	actionCount() {
		let step = this.props.step;
		step.countStartVal += step.intervalValue;
		if(this.props.step.countStartVal === this.props.step.countEndVal) {
			this.stop()
		}
		this.sentToParent(step);
	}

	clickStep() {
		let step = this.props.step;
		step.status = statuse[statuse.indexOf(step.status) + 1];
		if(step.status === 'active') {
			this.start()
		} else {
			this.stop()
		}
		this.sentToParent(step);
	}

	sentToParent(stepUpdate) {
		this.props.handleAactionStep(stepUpdate);
	}

	render() {
		const { step } = this.props;
		//console.log(this.state.step)
		return (
				<div className={step.status} onClick={() => this.clickStep(this)}>
					<div>
						<div className="name">{step.id} {step.name} {this.state.step.status}</div>
						<div className="time"><Icon name='clock-o' /> {this.time(step.milliseconds)}</div>
						<div className="counter">{this.counter(step.countStartVal, step.countEndVal)}</div>
					</div>
				</div>
			);
	}

}


Step.displayName = 'Step'

export default (Step)