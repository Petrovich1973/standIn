import React from 'react'
import ReactDOM from 'react-dom'

import Step from './Step'

import Test from './Test'

const steps = [
		{id: 1, name: 'Step', milliseconds: 0, intervalValue: 10, status: 'static', countStartVal: 0, countEndVal: 140, beforeId: 2, afterId: null},
		{id: 2, name: 'Step', milliseconds: 0, intervalValue: 100, status: 'static', countStartVal: 6000, countEndVal: 2000, beforeId: null, afterId: 3},
		{id: 3, name: 'Step', milliseconds: 0, intervalValue: 5, status: 'static', countStartVal: 0, countEndVal: 45, beforeId: 4, afterId: null},
		{id: 4, name: 'Step', milliseconds: 0, intervalValue: 100, status: 'static', countStartVal: 4000, countEndVal: 0, beforeId: null, afterId: 5},
		{id: 5, name: 'Step', milliseconds: 0, intervalValue: 5, status: 'static', countStartVal: 0, countEndVal: 45, beforeId: null, afterId: 777}
	]

class WizardToStanIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.initialState = {
			steps: steps,
			mode: false,
			start: true,
			end: false,

			status: 1000
		};
	}

	componentWillReceiveProps(nextProps) {
		// this.setState({
		// 	isRunning: nextProps.prop.isRunning > this.props.prop.isRunning
		// })
	}

	handleAactionStep(stepUpdate) {
		let newSteps = this.state.steps.map(m => {
			if(m.id === stepUpdate.id) {
				return {stepUpdate}
			} else {
				return {m}
			}
		})
		this.setState({
			steps: this.state.steps
		})
	}

	handleClick() {
		this.setState({
			status: this.state.status + 1
		})
	}

	render() {
		const { steps, start, end } = this.state;
		return (
			<div className="wizard toRight">
				{this.state.status}
				<Test handleClick={this.handleClick.bind(this)} status={this.state.status} />
				<div className={start ? 'db green' : 'db'}>Main DB</div>
				{ steps.map(m => <Step key={m.id} step={m} handleAactionStep={this.handleAactionStep.bind(this)} />) }
				<div className={end ? 'db green' : 'db'}>Stand-In</div>
			</div>
			);
	}

}


WizardToStanIn.displayName = 'WizardToStanIn'

export default (WizardToStanIn)