import { guid } from 'utils'
import { createServer } from 'service-mocker/server'
import * as R from 'ramda'
import * as LS from 'localforage'
import { findById } from 'lib/utils'

const { router } = createServer('http://localhost/api')

const getDevices = async () => {
  const value = await LS.getItem('devices')
  console.log(value)
  return value || []
}

const getPlaces = async () => {
  const value = await LS.getItem('places')
  console.log(value)
  return value || []
}

router.get('/places', async (req, res) => {
  const places = await getPlaces()
  res.json(places)
})

router.post('/places/create', async (req, res) => {
  let newPlace = await req.json()
  newPlace.id = guid()
  const places = await getPlaces()
  const updatedPlaces = [...places, newPlace]
  await LS.setItem('places', updatedPlaces)
  console.log(updatedPlaces)
  res.json(newPlace)
})

router.get('/devices', async (req, res) => {
  const devices = await getDevices()
  console.log(devices)
  const limit = req.query.limit || 10
  const offset = req.query.offset || 0
  const reqDevices = R.compose(
    R.take(limit),
    R.drop(offset),
  )(devices)
  console.log(reqDevices)
  const result = { data: reqDevices, total: devices.length, limit, offset }
  res.json(result)
})

router.post('/devices/create', async (req, res) => {
  let newDevice = await req.json()
  newDevice.id = guid()
  const devices = await getDevices()
  const updatedDevices = [...devices, newDevice]
  await LS.setItem('devices', updatedDevices)
  console.log(updatedDevices)
  res.json(newDevice)
})

router.put('/devices/edit/:id', async (req, res) => {
  let newDevice = await req.json()
  const devices = await getDevices()
  const deviceFoundIndex = devices.findIndex(findById(req.params.id))
  const updatedDevices = R.adjust(
    R.mergeDeepLeft(newDevice),
    deviceFoundIndex,
    devices,
  )
  await LS.setItem('devices', updatedDevices)
  console.log(updatedDevices)
  res.json(newDevice)
})

router.delete('/devices/remove/:id', async (req, res) => {
  const devices = await getDevices()
  const updatedDevices = R.remove(
    devices.findIndex(findById(req.params.id)),
    1,
    devices,
  )
  await LS.setItem('devices', updatedDevices)
  console.log(updatedDevices)
  res.sendStatus(200)
})
