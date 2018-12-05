import React, { Component } from 'react'
import Select from 'react-select'
import * as R from 'ramda'
import P from 'prop-types'
import PlacesConsumerHOC from 'lib/PlacesConsumerHOC'
import { findById } from '../../lib/utils'

class PlaceSelector extends Component {
  constructor(props) {
    super(props)
    const { value, places: options } = props
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
  componentDidUpdate(prevProps) {
    if (prevProps.places !== this.props.places) {
      const { places: options } = this.props
      const places = options.map(item => ({ value: item, label: item.name }))
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ places })
    }
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
  value: P.string,
  places: P.array,
  onChange: P.func,
  desc: P.string,
}
const mapContextToProps = R.pick(['places'])
export default PlacesConsumerHOC(mapContextToProps)(PlaceSelector)
