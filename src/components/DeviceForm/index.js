import React, { Component } from 'react'
import FormInput from '../FormInput'
import { FormWrapper } from './style.js'
import './style.js'
import InteractWithHistory from '../../lib/InteractWithHistoryHOC'

class DeviceForm extends Component {
    constructor(props) {
        super(props)
        this.state = { form: props.query }
    }

    handleChange = name => inputText => {
        const newForm = {
            ...this.state.form,
            [name]: inputText,
        }

        this.setState({ form: newForm })
        this.props.updateQuery(newForm)
    }

    handleSubmit = e => {
        const { onSubmit, clearQuery } = this.props
        e.preventDefault()
        onSubmit(this.state.form)
        this.setState({ form: {} })
        clearQuery()
    }

    render() {
        const { form } = this.state
        return (
            <FormWrapper onSubmit={this.handleSubmit}>
                <FormInput
                    desc="Name"
                    name="name"
                    value={form.name || ''}
                    onChange={this.handleChange('name')}
                />
                <FormInput
                    desc="IP"
                    isFunny
                    value={form.ip || ''}
                    name="ip"
                    onChange={this.handleChange('ip')}
                />
                <FormInput
                    desc="Description"
                    name="description"
                    value={form.description || ''}
                    onChange={this.handleChange('description')}
                />
                <input type="submit" value="Submit" />
            </FormWrapper>
        )
    }
}

export default InteractWithHistory(DeviceForm)
