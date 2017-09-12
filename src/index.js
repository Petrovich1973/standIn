import React from 'react';
import ReactDOM from 'react-dom';

import Select from './Select';

import Input from './Input';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
		this.state = this.initialState = {
            select1: {
                options: ["red","green","Длинный пункт выпадающего списка","blue","purple","orange","gray","black","white"],
                current: "green"
            },
            select2: {
                options: ["Ира","Петя","Волшебный голос Джельсомино Баттона","Николай","Митрофан","Олеся","Григорий","Игорь","Катерина","Анжелочка"],
                current: "Анжелочка"
            }
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeSelect = this.onChangeSelect.bind(this);
    }

    componentWillMount() {
        this.createStateInput();
        this.createStateSelect();
    }

    createStateInput() {
        let res = {};
        for (var i = 0; i < 400; i++) {
            res['input' + i] = '';
        }
        this.setState({ input: res });
    }

    createStateSelect() {
        let res = {};
        for (var i = 0; i < 400; i++) {
            res['select' + i] = '';
        }
        this.setState({ select: res });
    }

    onChangeInput(element) {
        this.setState({ input: {...this.state.input, [element.name]: element.value} });
    }

    createListInputs() {
        return Object.keys(this.state.input).map((m, i) => {
            return (
                <div
                key={i} 
                className="cell">
                    <Input 
                    onChange={this.onChangeInput}
                    name={m}
                    value={ this.state.input[m] }
                    />
                </div>
            )
        });
    }

    // onChangeInput(element) {
    //     this.setState({ input: {...this.state.input, [element.target.name]: element.target.value} });
    // }

    // createListInputs() {
    //     return Object.keys(this.state.input).map((m, i) => {
    //         return (
    //             <div
    //             key={i} 
    //             className="cell">
    //                 <input 
    //                 className="input"
    //                 onChange={this.onChangeInput}
    //                 name={m}
    //                 value={ this.state.input[m] }
    //                 />
    //             </div>
    //         )
    //     });
    // }

    onChangeSelect(element) {
        this.setState({ select: {...this.state.select, [element.name]: element.value} });
    }

    createListSelects() {
        return null;
        return Object.keys(this.state.select).map((m, i) => {
            return (
                <div
                key={i} 
                className="cell">
                    <Select 
                    onChange={this.onChangeSelect}
                    name={m}
                    value={ this.state.select[m] }
                    options={this.state.select1.options}
                    />
                </div>
            )
        });
    }

	render() {
        return (
            <div className="container">

                <div className="grid">

                    { this.createListInputs() }

                    { this.createListSelects() }

                </div>

            </div>
        );
	}
}

App.displayName = 'App';

ReactDOM.render(<App />, document.getElementById('root'));