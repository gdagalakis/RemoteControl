import React from 'react'
import P from 'prop-types'
import DeviceItem from '../DeviceItem'
import * as S from '../DeviceItem/style.js'

const DeviceList = props => {
  const { devices, onDelete, onChangeActive, onSave } = props
  return (
    <div className="deviceList">
      <ul>
        <S.Wrapper isHeader>
          <S.IdItem>ACTIVE ID</S.IdItem>
          <S.ItemName>NAME</S.ItemName>
          <S.ItemIP>IP</S.ItemIP>
          <S.ItemDescription>DESCRIPTION</S.ItemDescription>
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
      </ul>
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
