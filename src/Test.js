import React from 'react'
import ReactDOM from 'react-dom'

class Test extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.initialState = {
			status: this.props.status
		};
	}

	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			status: nextProps.status
		})
	}

	clickStep() {
		console.log(this.state.status)
		if(this.state.status < 1005) {
			this.props.handleClick();
		}
	}

	render() {
		//const { step } = this.props;
		//console.log(this.state.step)
		return (
				<div  onClick={() => this.clickStep(this)}>
					<div>
						<div className="name">{this.state.status}</div>
					</div>
				</div>
			);
	}

}


Test.displayName = 'Test'

export default (Test)