import { guid } from 'utils'
import { createServer } from 'service-mocker/server'
import * as R from 'ramda'
import * as LS from 'localforage'

const { router } = createServer('http://localhost/api')

const getDevices = async () => {
  const value = await LS.getItem('devices')
  console.log(value)
  return value || []
}

router.post('/process', async (req, res) => {
  let body = await req.json()
  res.json({ result: body })
})

// or you can use the shorthand method
router.get('/greet', async (req, res) => {
  res.json({ result: 'hello!' })
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
  let body = await req.json()
  body.id = guid()
  const devices = await getDevices()
  const updatedDevices = [...devices, body]
  await LS.setItem('devices', updatedDevices)
  console.log(updatedDevices)
  res.json({ result: body })
})
