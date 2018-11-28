import React, { Component } from 'react'
import Select from 'react-select'
import { findById } from '../../lib/utils'
class PlaceSelector extends Component {
    options = []
    constructor(props) {
        super(props)
        const { value, placeId } = this.props
        value.map(item => this.options.push({ value: item, label: item.name }))
        this.state = {
            selectedOption: this.options[value.findIndex(findById(placeId))],
        }
    }

    handleChange = action => ev => {
        this.setState({ selectedOption: ev })
        action(ev.value)
        // pass ev.value.id ?
    }

    render() {
        const { desc, onChange } = this.props

        return (
            <div>
                {desc}
                {': '}
                <Select
                    options={this.options}
                    value={this.state.selectedOption}
                    onChange={this.handleChange(onChange)}
                />
            </div>
        )
    }
}
export default PlaceSelector
