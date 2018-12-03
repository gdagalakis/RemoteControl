import { guid } from 'utils'
import { createServer } from 'service-mocker/server'
import * as R from 'ramda'

const { router } = createServer('http://localhost/api')
let devices = [] //  = localStorage.getItem('devices')

router.post('/process', async (req, res) => {
  let body = await req.json()
  res.json({ result: body })
})

// or you can use the shorthand method
router.get('/greet', async (req, res) => {
  res.json({ result: 'hello!' })
})

router.get('/devices', async (req, res) => {
  const limit = req.query.limit || 10
  const offset = req.query.offset || 0
  const reqDevices = R.compose(
    R.take(limit),
    R.drop(offset),
  )(devices)
  const result = { data: reqDevices, total: devices.length, limit, offset }

  console.log(result)
  res.json(result)
})

router.post('/devices/create', async (req, res) => {
  let body = await req.json()
  body.id = guid()
  devices = [...devices, body]
  // localStorage.setItem('devices', JSON.stringify(devices))
  console.log(devices)
  res.json({ result: body })
})
