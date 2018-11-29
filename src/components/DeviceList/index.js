import React from 'react'
import P from 'prop-types'
import DeviceItem from '../DeviceItem'
import { DevListUl } from './style.js'
import * as S from '../DeviceItem/style.js'

const DeviceList = props => {
  const { devices, onDelete, onChangeActive, onSave } = props
  return (
    <div className="deviceList">
      <DevListUl>
        <S.Wrapper isHeader>
          <S.IdItem>ACTIVE ID</S.IdItem>
          <S.ItemName>NAME</S.ItemName>
          <S.ItemIP>IP</S.ItemIP>
          <S.ItemDescription>DESCRIPTION</S.ItemDescription>
          <S.ItemPlaceSelector>PLACE</S.ItemPlaceSelector>
          <S.ItemActions>ACTIONS</S.ItemActions>
        </S.Wrapper>
        {devices.map((item, index) => (
          <DeviceItem
            key={item.id}
            index={index + 1}
            {...item}
            onDelete={() => onDelete(item.id)}
            handleChange={() => onChangeActive(item.id)}
            saveChanges={onSave(item.id)}
          />
        ))}
      </DevListUl>
    </div>
  )
}
DeviceList.propTypes = {
  devices: P.object,
  onDelete: P.func,
  onChangeActive: P.func,
  onSave: P.func,
}
export default DeviceList
