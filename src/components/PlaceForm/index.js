import React, { Component, useState } from 'react'
import { PlacesContext } from 'lib/PlacesProvider'
import P from 'prop-types'
import FormInput from '../FormInput'
import FormWrapper from './style.js'
import InteractWithHistory from '../../lib/InteractWithHistoryHOC'

function PlaceForm(props) {
  const { query, updateQuery, clearQuery } = props
  const [form, setForm] = useState(query)

  const handleChange = name => inputText => {
    const newForm = {
      ...form,
      [name]: inputText,
    }

    setForm(newForm)
    updateQuery(newForm)
  }

  const handleSubmit = onSubmit => e => {
    e.preventDefault()
    onSubmit(form)
    setForm({})
    clearQuery()
  }
  return (
    <PlacesContext.Consumer>
      {({ onSubmit }) => (
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            desc="Name"
            name="name"
            value={form.name || ''}
            onChange={handleChange('name')}
          />
          <FormInput
            desc="Description"
            name="description"
            value={form.description || ''}
            onChange={handleChange('description')}
          />
          <div>
            <h3>Position</h3>
            <FormInput
              type="number"
              desc="Lat"
              name="posLat"
              value={form.posLat || ''}
              onChange={handleChange('posLat')}
            />
            <FormInput
              type="number"
              desc="Long"
              name="posLong"
              value={form.posLong || ''}
              onChange={handleChange('posLong')}
            />
          </div>
          <input type="submit" value="Submit" />
        </FormWrapper>
      )}
    </PlacesContext.Consumer>
  )
}

PlaceForm.propTypes = {
  query: P.object,
  updateQuery: P.func,
  clearQuery: P.func,
}

export default InteractWithHistory(PlaceForm)
