import React from 'react';
import ReactDOM from 'react-dom';

import Select from './Select';

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
        this.onChange1 = this.onChange1.bind(this);
        this.onChange2 = this.onChange2.bind(this);
    }

    onChange1(value) {
        this.setState({ select1: {...this.state.select1, current: value} });
    }

    onChange2(value) {
        this.setState({ select2: {...this.state.select2, current: value} });
    }

	render() {
        const { select1, select2 } = this.state;
        return (
            <div className="container">

                <div className="row">

                    <div className="col-md-6">
                        <h3>{select1.current}</h3>
                        <Select 
                        onChange={this.onChange1}
                        value={select1.current}
                        options={select1.options}
                        />
                    </div>

                    <div className="col-md-6">
                        <h3>{select2.current}</h3>
                        <Select 
                        onChange={this.onChange2}
                        value={select2.current}
                        options={select2.options}
                        />
                    </div>

                </div>

            </div>
        );
	}
}

App.displayName = 'App';

ReactDOM.render(<App />, document.getElementById('root'));