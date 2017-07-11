import React from 'react'
import ReactDOM from 'react-dom'

import { 
	Form,
	FormGroup,
	Col,
	ControlLabel,
	FormControl,
	Checkbox,
	ButtonGroup,
	Button } from 'react-bootstrap'

import WizardToStanIn from './WizardToStanIn'
import WizardToMainDataBase from './WizardToMainDataBase'

import Clock from './Clock'

import moment from 'moment'


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.initialState = {
			mode: 0,
			currentDB: 0,
			wizard: {
				WizardToStanIn: false,
				WizardToMainDataBase: false
			},
			milliseconds: 0
		};
	}

	toggleMode(current) {
		this.setState({
			mode: current
		})
	}

	togglecCurrentDB(current) {
		this.setState({
			currentDB: current
		})
	}

	startWizard(current) {
		this.setState({
			wizard: {...this.state.wizard, [current]: true}
		})
	}

	viewTime(value) {
		let seconds = moment.duration(value).seconds();
		let minutes = moment.duration(value).minutes();
		let hours = moment.duration(value).hours();
		let pad2 = (number) => {return (number < 10 ? '0' : '') + number};
		return pad2(hours) + ':' + pad2(minutes) + ':' + pad2(seconds);
	}

	upTimeAll(value) {
		if( value === true ) {
			this.intervalTimeAll = setInterval( this.timeIntervalAll.bind(this), 1000 )
		} else {
			clearInterval( this.intervalTimeAll )
		}		
	}

	timeIntervalAll() {
		this.setState({
			milliseconds: this.state.milliseconds += 1000
		})
	}

	render() {
		const { mode, currentDB } = this.state;
		return (
			<div>
				<div className="panel manager">
					<div className="container">
						<div className="pullLeft">
							<ButtonGroup>
								<Button 
								bsStyle={ mode === 0 ? 'success' : null } 
								onClick={ () => this.toggleMode(0) }>Ручной</Button>
								<Button 
								bsStyle={ mode === 1 ? 'success' : null } 
								onClick={ () => this.toggleMode(1) }>Автоматический</Button>
							</ButtonGroup>
						</div>
						<div className="pullRight">
							{ currentDB === 0 ? 
							<Button 
							bsStyle="warning" 
							onClick={ () => this.startWizard('WizardToStanIn') }>Перейти в Stand-In</Button> :
							<Button 
							bsStyle="warning" 
							onClick={ () => this.startWizard('WizardToMainDataBase') }>Перейти в Main DB</Button>
							}
						</div>
					</div>
				</div>
				<div className="panel controls">
					<div className="container"><Clock intervalCount={20}/> | <Clock intervalCount={1}/> {this.viewTime(this.state.milliseconds)}</div>
				</div>
				<div className="container">
					{ currentDB === 0 ? 
						<WizardToStanIn 
						upTimeAll={this.upTimeAll.bind(this)}
						isActive={this.state.wizard.WizardToStanIn} /> : 
						<WizardToMainDataBase 
						isActive={this.state.wizard.WizardToMainDataBase}/> }
				</div>
			</div>			
		)
	}
}



ReactDOM.render(<App />, document.getElementById('root'))