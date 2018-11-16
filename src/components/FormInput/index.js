import React, { Component } from 'react'
import './style.css'

class FormInput extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(ev) {
        this.props.onChange(ev.target.value, this.props.name)
    }

    render() {
        return (
            <label className={this.props.className}>
                {this.props.desc}
                {': '}
                <input
                    value={this.props.value}
                    type="text"
                    onChange={this.handleChange}
                />
            </label>
        )
    }
}

export default FormInput
