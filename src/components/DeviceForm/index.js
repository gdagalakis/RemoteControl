import React, { Component } from 'react'
import FormInput from '../FormInput'
import { FormWrapper } from './style.js'
import './style.js'
import InteractWithHistory from 'lib/InteractWithHistoryHOC'
import { DevicesContext } from 'lib/DevicesProvider'

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

    handleSubmit = onSubmit => e => {
        const { clearQuery } = this.props
        e.preventDefault()
        onSubmit(this.state.form)
        this.setState({ form: {} })
        clearQuery()
    }

    render() {
        const { form } = this.state
        return (
            <DevicesContext.Consumer>
                {value => (
                    <FormWrapper onSubmit={this.handleSubmit(value.onSubmit)}>
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
                )}
            </DevicesContext.Consumer>
        )
    }
}

export default InteractWithHistory(DeviceForm)
