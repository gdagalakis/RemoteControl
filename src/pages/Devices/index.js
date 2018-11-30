import React from 'react'
import DeviceConsumerHOC from 'lib/DeviceConsumerHOC'
import * as R from 'ramda'
import DeviceList from '../../components/DeviceList'

const Devices = props => <DeviceList {...props} />
const mapContextToProps = R.pick([
  'devices',
  'onDelete',
  'onChangeActive',
  'onSave',
])

export default DeviceConsumerHOC(mapContextToProps)(Devices)
