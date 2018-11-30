import React, { Component } from 'react'
import InteractWithHistory from 'lib/InteractWithHistoryHOC'
import { DevicesContext } from 'lib/DevicesProvider'
import PlaceSelector from 'components/PlaceSelector'
import * as R from 'ramda'
import P from 'prop-types'
import FormInput from '../FormInput'
import FormWrapper from './style.js'

class DeviceForm extends Component {
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
    updateQuery({
      ...newForm,
      place: R.path(['place', 'id'], newForm),
    })
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
    const { query } = this.props
    return (
      <DevicesContext.Consumer>
        {({ onSubmit }) => (
          <FormWrapper onSubmit={this.handleSubmit(onSubmit)}>
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
            <PlaceSelector
              desc="Place"
              value={query.place}
              onChange={this.handleChange('place')}
            />
            <input type="submit" value="Submit" />
          </FormWrapper>
        )}
      </DevicesContext.Consumer>
    )
  }
}
DeviceForm.propTypes = {
  clearQuery: P.func,
  updateQuery: P.func,
  query: P.object,
}
export default InteractWithHistory(DeviceForm)
