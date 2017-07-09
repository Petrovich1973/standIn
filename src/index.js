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


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.initialState = {
			mode: 0,
			currentDB: 0,
			wizard: {
				WizardToStanIn: false,
				WizardToMainDataBase: false
			}
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
					<div className="container"><Clock intervalCount={20}/> | <Clock intervalCount={1}/></div>
				</div>
				<div className="container">
					{ currentDB === 0 ? 
						<WizardToStanIn 
						isActive={this.state.wizard.WizardToStanIn} /> : 
						<WizardToMainDataBase 
						isActive={this.state.wizard.WizardToMainDataBase}/> }
				</div>
			</div>			
		)
	}
}



ReactDOM.render(<App />, document.getElementById('root'))