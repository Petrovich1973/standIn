import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickInput = this.handleClickInput.bind(this);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value;
    }

    handleClickInput(e) {
        this.props.onChange({name: this.props.name, value: e.target.value});
    }    

    render() {
        const { name, value } = this.props;
        return (
            <div>
                <div>{name}</div>
                <input className="input" name={name} value={value} onChange={ this.handleClickInput } />
            </div>
        );
    }
}

Input.displayName = 'Input';

export default Input