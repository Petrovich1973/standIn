import React from 'react'
import ReactDOM from 'react-dom'

import Step from './Step'

const steps = [
		{id: 1, name: 'Step', milliseconds: 0, intervalValue: 10, status: 'static', countStartVal: 0, countEndVal: 140, beforeId: 2, afterId: null},
		{id: 2, name: 'Step', milliseconds: 0, intervalValue: 200, status: 'static', countStartVal: 6000, countEndVal: 2000, beforeId: null, afterId: 3},
		{id: 3, name: 'Step', milliseconds: 0, intervalValue: 5, status: 'static', countStartVal: 0, countEndVal: 45, beforeId: 4, afterId: null},
		{id: 4, name: 'Step', milliseconds: 0, intervalValue: 200, status: 'static', countStartVal: 4000, countEndVal: 0, beforeId: null, afterId: 5},
		{id: 5, name: 'Step', milliseconds: 0, intervalValue: 5, status: 'static', countStartVal: 0, countEndVal: 45, beforeId: null, afterId: 777}
	]

class WizardToStanIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.initialState = {
			steps: steps,
			mode: false,
			start: false,
			end: false
		};
	}

	componentDidMount() {
		
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.isActive > this.props.isActive) {
			this.startWizard()
		}
	}

	startWizard() {
		let updateSteps = this.state.steps.map(m => {
								if(m.id === 1) {
									return {...m, status: 'ready'}
								} else {
									return m
								}
							})
		this.setState({
			start: true,
			steps: updateSteps
		})	
	}

	handleAactionStep(stepUpdate) {
		if(stepUpdate.id === 1 && this.state.steps.filter(f => f.id === stepUpdate.id)[0].status === 'ready') {
			let updateSteps = this.state.steps.map(m => {
									if(m.id === 1 || m.id === 2 ) {
										return {...m, status: 'active'}
									} else {
										return m
									}
								})
			this.setState({
				steps: updateSteps
			})
		}
		if(stepUpdate.id === 2 && stepUpdate.status === 'complete') {
			let updateSteps = this.state.steps.map(m => {
									if( m.id === 3 ) {
										return {...m, status: 'ready'}
									} else if( m.id === 1 || m.id === 2 ) {
										return {...m, status: 'complete'}
									} else {
										return m
									}
								})
			this.setState({
				steps: updateSteps
			})
		}
		if(stepUpdate.id === 3 && this.state.steps.filter(f => f.id === stepUpdate.id)[0].status === 'ready') {
			let updateSteps = this.state.steps.map(m => {
									if(m.id === 3 || m.id === 4 ) {
										return {...m, status: 'active'}
									} else {
										return m
									}
								})
			this.setState({
				steps: updateSteps,
				start: false
			})
		}
		if(stepUpdate.id === 4 && stepUpdate.status === 'complete') {
			let updateSteps = this.state.steps.map(m => {
									if( m.id === 5 ) {
										return {...m, status: 'ready'}
									} else if( m.id === 3 || m.id === 4 ) {
										return {...m, status: 'complete'}
									} else {
										return m
									}
								})
			this.setState({
				steps: updateSteps
			})
		}
		if(stepUpdate.id === 5 && this.state.steps.filter(f => f.id === stepUpdate.id)[0].status === 'ready') {
			let updateSteps = this.state.steps.map(m => {
									if(m.id === 5 ) {
										return {...m, status: 'active'}
									} else {
										return m
									}
								})
			this.setState({
				steps: updateSteps
			})
		}
		if(stepUpdate.id === 5 && stepUpdate.status === 'complete') {
			let updateSteps = this.state.steps.map(m => {
									if( m.id === 5 ) {
										return {...m, status: 'complete'}
									} else {
										return m
									}
								})
			this.setState({
				steps: updateSteps,
				end: true
			})
		}
	}

	render() {
		const { steps, start, end } = this.state;
		return (
			<div className="wizard toRight">
				<div className={start ? 'db green' : 'db'}>Main DB</div>
				{ steps.map(m => <Step key={m.id} step={m} handleAactionStep={this.handleAactionStep.bind(this)} />) }
				<div className={end ? 'db green' : 'db'}>Stand-In</div>
			</div>
			);
	}

}


WizardToStanIn.displayName = 'WizardToStanIn'

export default (WizardToStanIn)