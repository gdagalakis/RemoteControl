import React, { Component } from 'react'
import Select from 'react-select'
import * as R from 'ramda'
import P from 'prop-types'
import { findById } from '../../lib/utils'

class PlaceSelector extends Component {
  constructor(props) {
    super(props)
    const { options, value } = this.props
    const places = options.map(item => ({ value: item, label: item.name }))
    this.state = {
      places,
      selectedOption: places[options.findIndex(findById(value))],
    }
  }

  componentDidMount() {
    const { onChange } = this.props
    const selectedValue = R.path(['selectedOption', 'value'], this.state)
    if (selectedValue) onChange(selectedValue)
  }

  handleChange = action => ev => {
    this.setState({ selectedOption: ev })
    action(ev.value)
  }

  render() {
    const { desc, onChange } = this.props
    const { places, selectedOption } = this.state
    return (
      <div>
        {desc ? desc + ': ' : ''}
        <Select
          options={places}
          value={selectedOption}
          onChange={this.handleChange(onChange)}
        />
      </div>
    )
  }
}
PlaceSelector.propTypes = {
  options: P.object,
  value: P.string,
  onChange: P.func,
  desc: P.string,
}
export default PlaceSelector
