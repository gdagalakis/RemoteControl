import React, { Component } from 'react'
import Select from 'react-select'
import { findById } from '../../lib/utils'
import * as R from 'ramda'

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
        const selectedValue = R.path(['selectedOption', 'value'], this.state)
        if (selectedValue) this.props.onChange(selectedValue)
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
                {desc}
                {': '}
                <Select
                    options={places}
                    value={selectedOption}
                    onChange={this.handleChange(onChange)}
                />
            </div>
        )
    }
}
export default PlaceSelector
