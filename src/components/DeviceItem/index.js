import React, { Component, useState } from 'react'
import PlaceSelector from 'components/PlaceSelector'
import P from 'prop-types'
import {
  Row,
  ItemPlaceSelector,
  IdItem,
  ItemName,
  ItemIP,
  ItemDescription,
  ItemActions,
} from './style.js'

function DeviceItem(props) {
  const {
    name,
    ip,
    description,
    place,
    saveChanges,
    active,
    onDelete,
    handleChange,
    index,
    style,
  } = props
  const [editState, setEditState] = useState(false)
  const [curName, setCurName] = useState(name)
  const [curIp, setCurIp] = useState(ip)
  const [curPlace, setCurPlace] = useState(place)
  const [curDescription, setCurDescription] = useState(description)

  const toggleEditState = () => {
    setEditState(!editState)
  }

  const onSave = () => {
    const item = { curDescription, curIp, curName, curPlace }
    console.table(item)
    saveChanges(item)
    toggleEditState()
  }

  return (
    <Row style={style}>
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
              setCurName(e.target.value)
            }}
          />
        ) : (
          curName
        )}
      </ItemName>
      <ItemIP>
        {editState ? (
          <input
            type="text"
            value={curIp}
            onChange={e => {
              setCurIp(e.target.value)
            }}
          />
        ) : (
          curIp
        )}
      </ItemIP>
      <ItemDescription>
        {editState ? (
          <input
            type="text"
            value={curDescription}
            onChange={e => {
              setCurDescription(e.target.value)
            }}
          />
        ) : (
          curDescription
        )}
      </ItemDescription>
      <ItemPlaceSelector>
        {editState ? (
          <PlaceSelector
            value={curPlace.id}
            onChange={e => {
              setCurPlace(e)
            }}
          />
        ) : (
          curPlace.name
        )}
      </ItemPlaceSelector>
      <ItemActions>
        <button type="button" onClick={onDelete}>
          {' '}
          delete{' '}
        </button>
        {editState ? (
          <button type="button" onClick={onSave}>
            {' '}
            save{' '}
          </button>
        ) : (
          <button type="button" onClick={toggleEditState}>
            {' '}
            edit{' '}
          </button>
        )}
      </ItemActions>
    </Row>
  )
}

DeviceItem.defaultProps = {
  place: {},
  name: '',
  ip: '',
  active: false,
  description: '',
}
DeviceItem.propTypes = {
  name: P.string,
  ip: P.string,
  place: P.object,
  description: P.string,
  saveChanges: P.func,
  active: P.bool,
  onDelete: P.func,
  handleChange: P.func,
  index: P.number,
  style: P.object,
}
export default DeviceItem
