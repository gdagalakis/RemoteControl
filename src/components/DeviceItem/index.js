import React, { Component } from 'react'
import * as R from 'ramda'
import P from 'prop-types'
import { Wrapper, ItemPlaceSelector, IdItem, ItemName, ItemIP, ItemDescription, ItemActions } from './style.js'

const extractItem = R.pick(['ip', 'name', 'description'])
class DeviceItem extends Component {
  constructor(props) {
    super(props)
    const { name, ip, description } = props
    this.state = {
      editState: false,
      curName: name,
      curIp: ip,
      curDescription: description,
    }
  }

  toggleEditState = () => {
    const { editState } = this.state
    this.setState({ editState: !editState })
  }

  onSave = () => {
    const { saveChanges } = this.props
    const item = extractItem(this.state)
    saveChanges(item)
    this.toggleEditState()
  }

  render() {
    const { active, name, ip, description, onDelete, handleChange, index } = this.props
    const { editState, curName, curIp, curDescription } = this.state
    return (
      <Wrapper>
        <IdItem>
          <input type="checkbox" onChange={handleChange} checked={active} />
          {index}
        </IdItem>
        <ItemName>
          {editState ? (
            <input
              type="text"
              value={curName}
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
              value={curIp}
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
              value={curDescription}
              onChange={e => {
                this.setState({ description: e.target.value })
              }}
            />
          ) : (
            description
          )}
        </ItemDescription>
        <ItemPlaceSelector>
          {editState ? (
            <input
              type="text"
              value={curDescription}
              onChange={e => {
                this.setState({ description: e.target.value })
              }}
            />
          ) : (
            description
          )}
        </ItemPlaceSelector>
        <ItemActions>
          <button type="button" onClick={onDelete}>
            {' '}
            delete{' '}
          </button>
          {editState ? (
            <button type="button" onClick={this.onSave}>
              {' '}
              save{' '}
            </button>
          ) : (
            <button type="button" onClick={this.toggleEditState}>
              {' '}
              edit{' '}
            </button>
          )}
        </ItemActions>
      </Wrapper>
    )
  }
}

DeviceItem.propTypes = {
  name: P.string,
  ip: P.string,
  description: P.string,
  saveChanges: P.func,
  active: P.bool,
  onDelete: P.func,
  handleChange: P.func,
  index: P.number,
}
export default DeviceItem
