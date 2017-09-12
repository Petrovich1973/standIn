import React from 'react';
import ReactDOM from 'react-dom';

class Select extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = this.initialState = {
            open: false,
            maxWidth: 20000
        };
        this.isOpen = this.isOpen.bind(this);
        this.outSide = this.outSide.bind(this);
        this.mw = this.mw.bind(this);
    }

    componentWillMount() { 
        window.addEventListener('resize', this.mw);

        document.addEventListener('click', this.outSide.bind(this), true);
        document.addEventListener("keydown", this.escFunction.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.outSide.bind(this), true);
        document.removeEventListener("keydown", this.escFunction.bind(this), false);
    }

    mw() {
        let max = (window.innerWidth - 20) - (this.selectRef.getBoundingClientRect().left + window.scrollX);
        this.setState({
            maxWidth: max
        })
    }

    isOpen() {
        this.setState({
            open: !this.state.open
        });
        this.mw();
    }

    handleClickOption(value) {
        this.props.onChange(value);
        setTimeout( this.isOpen, 100);
    }

    outSide(event) {
        const domNode = ReactDOM.findDOMNode(this);

        if (!domNode || !domNode.contains(event.target)) {
            this.setState({
                open: false
            });
        }
    }

    escFunction(event) {
        if(event.keyCode === 27) {
            this.setState({
                open: false
            });
        }
    }

    render() {
        const { value, options } = this.props;
        const { open, maxWidth } = this.state;
        return (
            <div className={open ? 'select open' : 'select'} ref={(node) => { this.selectRef = node }}>
                <div 
                className="select__current"
                onClick={this.isOpen}>
                    {value}
                </div>
                <div className="select__list" style={{maxWidth: `${maxWidth}px`}}>
                    {options.map((m, i) => {
                        return (
                            <div 
                            key={i} 
                            value={m}
                            onClick={() => this.handleClickOption(m)}
                            className={m === value ? 'active' : ''}>
                                <i className="fa fa-ban colorRed" /> {m}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

Select.displayName = 'Select';

export default Select