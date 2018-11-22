import React, { Component } from 'react'
import {
    Wrapper,
    IdItem,
    ItemName,
    ItemIP,
    ItemDescription,
    ItemActions,
} from './style.js'
import * as R from 'ramda'

const extractItem = R.pick(['ip', 'name', 'description'])
class DeviceItem extends Component {
    constructor(props) {
        super(props)
        const { name, ip, description } = props
        this.state = {
            editState: false,
            name: name,
            ip: ip,
            description: description,
        }
    }

    toggleEditState = () => {
        this.setState({ editState: !this.state.editState })
    }

    onSave = () => {
        const item = extractItem(this.state)
        this.props.saveChanges(item)
        this.toggleEditState()
    }

    render() {
        const {
            active,
            name,
            ip,
            description,
            onDelete,
            handleChange,
            index,
        } = this.props
        const { editState } = this.state
        return (
            <Wrapper>
                <IdItem>
                    <input
                        type="checkbox"
                        onChange={handleChange}
                        checked={active}
                    />
                    {index}
                </IdItem>
                <ItemName>
                    {editState ? (
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={e => {
                                this.setState({ name: e.target.value })
                            }}
                        />
                    ) : (
                        name
                    )}
                </ItemName>
                <ItemIP>
                    {editState ? (
                        <input
                            type="text"
                            value={this.state.ip}
                            onChange={e => {
                                this.setState({ ip: e.target.value })
                            }}
                        />
                    ) : (
                        ip
                    )}
                </ItemIP>
                <ItemDescription>
                    {editState ? (
                        <input
                            type="text"
                            value={this.state.description}
                            onChange={e => {
                                this.setState({ description: e.target.value })
                            }}
                        />
                    ) : (
                        description
                    )}
                </ItemDescription>
                <ItemActions>
                    <button onClick={onDelete}> delete </button>
                    {editState ? (
                        <button onClick={this.onSave}> save </button>
                    ) : (
                        <button onClick={this.toggleEditState}> edit </button>
                    )}
                </ItemActions>
            </Wrapper>
        )
    }
}
export default DeviceItem
