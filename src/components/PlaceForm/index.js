import React, { Component } from 'react'
import FormInput from '../FormInput'
import { FormWrapper } from './style.js'
import './style.js'
import InteractWithHistory from '../../lib/InteractWithHistoryHOC'
import { PlacesContext } from 'lib/PlacesProvider'
class PlaceForm extends Component {
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
            <PlacesContext.Consumer>
                {value => (
                    <FormWrapper onSubmit={this.handleSubmit(value.onSubmit)}>
                        <FormInput
                            desc="Name"
                            name="name"
                            value={form.name || ''}
                            onChange={this.handleChange('name')}
                        />
                        <FormInput
                            desc="Description"
                            name="description"
                            value={form.description || ''}
                            onChange={this.handleChange('description')}
                        />
                        <div>
                            <h3>Position</h3>
                            <FormInput
                                type="number"
                                desc="Lat"
                                name="posLat"
                                value={form.posLat || ''}
                                onChange={this.handleChange('posLat')}
                            />
                            <FormInput
                                type="number"
                                desc="Long"
                                name="posLong"
                                value={form.posLong || ''}
                                onChange={this.handleChange('posLong')}
                            />
                        </div>
                        <input type="submit" value="Submit" />
                    </FormWrapper>
                )}
            </PlacesContext.Consumer>
        )
    }
}

export default InteractWithHistory(PlaceForm)
