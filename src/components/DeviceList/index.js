import React from 'react'
import P from 'prop-types'
import * as R from 'ramda'
import { AutoSizer, InfiniteLoader, List } from 'react-virtualized'
import DeviceItem from '../DeviceItem'
import { DevList } from './style.js'
import * as S from '../DeviceItem/style.js'

const loadNextPage = async (requestDevices, limit, offset) => {
  await requestDevices(limit, Number(offset) + 10)
}

const hasNextPage = (limit, offset, total) =>
  Number(total) > Number(limit) + Number(offset)

const loadMoreRows = (requestDevices, limit, offset, isNextPageLoading) => () =>
  (isNextPageLoading
    ? () => undefined
    : loadNextPage(requestDevices, limit, offset))

const isRowLoaded = (devices, limit, offset, total) => ({ index }) =>
  !hasNextPage(limit, offset, total) || index < devices.length

const rowRenderer = (
  onDelete,
  onChangeActive,
  onSave,
  devices,
  limit,
  offset,
  total,
) => {
  function RowRenderer({ index, key, style }) {
    let content

    if (!isRowLoaded(devices, limit, offset, total)({ index })) {
      content = 'Loading...'
    } else {
      content = (
        <DeviceItem
          key={R.path([index, 'id'], devices)}
          index={index + 1}
          {...devices[index]}
          onDelete={() => onDelete(R.path([index, 'id'], devices))}
          handleChange={() => onChangeActive(R.path([index, 'id'], devices))}
          saveChanges={onSave(R.path([index, 'id'], devices))}
        />
      )
    }

    return (
      <div key={key} style={{ ...style, border: '1px solid black' }}>
        {content}
      </div>
    )
  }
  RowRenderer.propTypes = {
    index: P.number,
    key: P.number,
    style: P.any,
  }
  return RowRenderer
}

const DeviceList = props => {
  const {
    devices,
    onDelete,
    onChangeActive,
    onSave,
    requestDevices,
    limit,
    offset,
    total,
    loading,
  } = props

  // eslint-disable-next-line no-param-reassign

  const rowCount = hasNextPage(limit, offset, total)
    ? devices.length + 1
    : devices.length

  return (
    <div className="deviceList">
      <DevList>
        <S.Header>
          <S.IdItem>ACTIVE ID</S.IdItem>
          <S.ItemName>NAME</S.ItemName>
          <S.ItemIP>IP</S.ItemIP>
          <S.ItemDescription>DESCRIPTION</S.ItemDescription>
          <S.ItemPlaceSelector>PLACE</S.ItemPlaceSelector>
          <S.ItemActions>ACTIONS</S.ItemActions>
        </S.Header>
        <InfiniteLoader
          isRowLoaded={isRowLoaded(devices, limit, offset, total)}
          loadMoreRows={loadMoreRows(requestDevices, limit, offset, loading)}
          rowCount={rowCount}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={registerChild}
                  onRowsRendered={onRowsRendered}
                  rowRenderer={rowRenderer(
                    onDelete,
                    onChangeActive,
                    onSave,
                    devices,
                    limit,
                    offset,
                    total,
                  )}
                  rowCount={rowCount}
                  height={height}
                  rowHeight={100}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>

        {/* {devices.map((item, index) => (
          <DeviceItem
            key={item.id}
            index={index + 1}
            {...item}
            onDelete={() => onDelete(item.id)}
            handleChange={() => onChangeActive(item.id)}
            saveChanges={onSave(item.id)}
          />
        ))} */}
      </DevList>
    </div>
  )
}
DeviceList.propTypes = {
  devices: P.array,
  onDelete: P.func,
  onChangeActive: P.func,
  onSave: P.func,
  requestDevices: P.func,
  limit: P.oneOfType([P.string, P.number]),
  offset: P.oneOfType([P.string, P.number]),
  total: P.oneOfType([P.string, P.number]),
  loading: P.bool,
}

rowRenderer.propTypes = {
  list: P.list,
}

export default DeviceList
