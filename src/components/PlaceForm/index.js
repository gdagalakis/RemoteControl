import React, { Component } from 'react'
import { PlacesContext } from 'lib/PlacesProvider'
import P from 'prop-types'
import FormInput from '../FormInput'
import FormWrapper from './style.js'
import InteractWithHistory from '../../lib/InteractWithHistoryHOC'

class PlaceForm extends Component {
  constructor(props) {
    super(props)
    this.state = { form: props.query }
  }

  handleChange = name => inputText => {
    const { form } = this.state
    const { updateQuery } = this.props
    const newForm = {
      ...form,
      [name]: inputText,
    }

    this.setState({ form: newForm })
    updateQuery(newForm)
  }

  handleSubmit = onSubmit => e => {
    const { clearQuery } = this.props
    const { form } = this.state
    e.preventDefault()
    onSubmit(form)
    this.setState({ form: {} })
    clearQuery()
  }

  render() {
    const { form } = this.state
    return (
      <PlacesContext.Consumer>
        {({ onSubmit }) => (
          <FormWrapper onSubmit={this.handleSubmit(onSubmit)}>
            <FormInput desc="Name" name="name" value={form.name || ''} onChange={this.handleChange('name')} />
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
PlaceForm.propTypes = {
  query: P.string,
  updateQuery: P.func,
  clearQuery: P.func,
}

export default InteractWithHistory(PlaceForm)
