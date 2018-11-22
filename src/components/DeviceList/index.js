import React, { Component } from 'react'
import DeviceItem from '../DeviceItem'
import * as S from '../DeviceItem/style.js'

class DeviceList extends Component {
    componentWillUpdate(nextProps) {
        if (nextProps.devices.length == 1) {
            alert('one device left')
        }
    }

    render() {
        const { devices, onDelete, onChange } = this.props
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
                            key={index}
                            index={index + 1}
                            {...item}
                            onDelete={() => onDelete(item.id)}
                            handleChange={() => onChange(item.id)}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default DeviceList
