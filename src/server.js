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
  let body = await req.json()
  body.id = guid()
  const devices = await getDevices()
  const updatedDevices = [...devices, body]
  await LS.setItem('devices', updatedDevices)
  console.log(updatedDevices)
  res.json({ result: body })
})

router.put('/devices/edit/:id', async (req, res) => {
  let body = await req.json()
  const devices = await getDevices()
  const deviceFoundIndex = devices.findIndex(findById(req.params.id))
  const updatedDevices = R.adjust(
    R.mergeDeepLeft(body),
    deviceFoundIndex,
    devices,
  )
  await LS.setItem('devices', updatedDevices)
  console.log(updatedDevices)
  res.json({ result: body })
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
