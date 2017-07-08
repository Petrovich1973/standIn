import React from 'react'
import ReactDOM from 'react-dom'

import Step from './Step'

const steps = [
		{id: 1, name: 'Step', milliseconds: 0, intervalValue: 1, status: 'static', countStartVal: 0, countEndVal: 45, beforeId: 2, afterId: null},
		{id: 2, name: 'Step', milliseconds: 0, intervalValue: 100, status: 'static', countStartVal: 4000, countEndVal: 0, beforeId: null, afterId: 3},
		{id: 3, name: 'Step', milliseconds: 0, intervalValue: 1, status: 'static', countStartVal: 0, countEndVal: 45, beforeId: 4, afterId: null},
		{id: 4, name: 'Step', milliseconds: 0, intervalValue: 100, status: 'static', countStartVal: 6000, countEndVal: 2000, beforeId: null, afterId: 5},
		{id: 5, name: 'Step', milliseconds: 0, intervalValue: 1, status: 'static', countStartVal: 0, countEndVal: 140, beforeId: null, afterId: 777}
	]

class WizardToMainDataBase extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.initialState = {
			steps: steps,
			mode: false,
			start: true,
			end: false
		};
	}

	componentWillReceiveProps(nextProps) {
		// this.setState({
		// 	isRunning: nextProps.prop.isRunning > this.props.prop.isRunning
		// })
	}

	handleAactionStep(stepUpdate) {
		this.setState({
			steps: this.state.steps
		})
	}

	render() {
		const { steps, start, end } = this.state;
		return (
			<div className="wizard toLeft">
				<div className={start ? 'db green' : 'db'}>Stand-In</div>
				{ steps.map(m => <Step key={m.id} step={m} handleAactionStep={this.handleAactionStep.bind(this)} />) }
				<div className={end ? 'db green' : 'db'}>Main DB</div>
			</div>
			);
	}

}


WizardToMainDataBase.displayName = 'WizardToMainDataBase'

export default (WizardToMainDataBase)