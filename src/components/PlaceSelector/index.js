import React, { Component } from 'react'
import Select from 'react-select'
import * as R from 'ramda'
import P from 'prop-types'
import PlacesConsumerHOC from 'lib/PlacesConsumerHOC'
import { findById } from '../../lib/utils'

class PlaceSelector extends Component {
  static getDerivedStateFromProps(props) {
    const { value, places: options } = props
    const places = options.map(item => ({ value: item, label: item.name }))
    return {
      places,
      selectedOption: places[options.findIndex(findById(value))],
    }
  }

  constructor(props) {
    super(props)
    this.state = {}
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
  onChange: P.func,
  desc: P.string,
}
const mapContextToProps = R.pick(['places'])
export default PlacesConsumerHOC(mapContextToProps)(PlaceSelector)
