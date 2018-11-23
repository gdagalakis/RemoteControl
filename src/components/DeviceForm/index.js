import React, { Component } from 'react'
import FormInput from '../FormInput'
import queryString from 'query-string'
import { FormWrapper } from './style.js'
import './style.js'
class Form extends Component {
    constructor(props) {
        super(props)
        const obj = queryString.parse(this.props.history.location.search)
        this.state = { form: obj }
    }

    handleChange = name => inputText => {
        const newform = {
            ...this.state.form,
            [name]: inputText,
        }

        this.setState({ form: newform })
        this.props.history.push('/?' + queryString.stringify(newform))
    }

    handleSubmit = e => {
        const { onSubmit, history } = this.props
        e.preventDefault()
        onSubmit(this.state.form)
        this.setState({ form: {} })
        history.push('')
    }

    render() {
        return (
            <FormWrapper id="myForm" onSubmit={this.handleSubmit}>
                <FormInput
                    desc="Name"
                    name="name"
                    value={this.state.form.name || ''}
                    onChange={this.handleChange('name')}
                />
                <FormInput
                    desc="IP"
                    isFunny
                    value={this.state.form.ip || ''}
                    name="ip"
                    onChange={this.handleChange('ip')}
                />
                <FormInput
                    desc="Description"
                    name="description"
                    value={this.state.form.description || ''}
                    onChange={this.handleChange('description')}
                />
                <input type="submit" value="Submit" />
            </FormWrapper>
        )
    }
}

export default Form
