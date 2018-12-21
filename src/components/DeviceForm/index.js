import React, { useState } from 'react'
import InteractWithHistory from 'lib/InteractWithHistoryHOC'
import PlaceSelector from 'components/PlaceSelector'
import * as R from 'ramda'
import DeviceConsumerHOC from 'lib/DeviceConsumerHOC'
import P from 'prop-types'
import FormInput from '../FormInput'
import FormWrapper from './style.js'

function DeviceForm(props) {
  const { query, onSubmit } = props
  const [form, setForm] = useState(query)

  const handleChange = name => inputText => {
    const { updateQuery } = props
    const newForm = {
      ...form,
      [name]: inputText,
    }
    setForm(newForm)
    updateQuery({
      ...newForm,
      place: R.path(['place', 'id'], newForm),
    })
  }

  const handleSubmit = () => e => {
    const { clearQuery } = this.props
    e.preventDefault()
    onSubmit(form)
    this.setState({ form: {} })
    clearQuery()
  }

  return (
    <FormWrapper onSubmit={handleSubmit()}>
      <FormInput
        desc="Name"
        name="name"
        value={form.name || ''}
        onChange={handleChange('name')}
      />
      <FormInput
        desc="IP"
        isFunny
        value={form.ip || ''}
        name="ip"
        onChange={handleChange('ip')}
      />
      <FormInput
        desc="Description"
        name="description"
        value={form.description || ''}
        onChange={handleChange('description')}
      />
      <PlaceSelector
        desc="Place"
        value={query.place}
        onChange={handleChange('place')}
      />
      <input type="submit" value="Submit" />
    </FormWrapper>
  )
}

DeviceForm.propTypes = {
  query: P.object,
  onSubmit: P.func,
}
const mapContextToProps = R.pick(['onSubmit'])

export default R.compose(
  InteractWithHistory,
  DeviceConsumerHOC(mapContextToProps),
)(DeviceForm)
