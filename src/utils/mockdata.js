import faker from 'faker'
import * as R from 'ramda'
import { guid } from 'utils'
import * as LS from 'localforage'

const createFakePlace = () => {
  const fakePlace = {
    id: guid(),
    name: faker.address.city(),
    description: faker.lorem.sentence(),
    position: {
      posLat: faker.address.latitude(),
      posLong: faker.address.longitude(),
    },
  }
  return fakePlace
}

const createFakeDevice = places => () => {
  const fakeDevice = {
    id: guid(),
    name: faker.commerce.product(),
    description: faker.lorem.sentence(),
    ip: faker.internet.ip(),
    place: faker.helpers.randomize(places),
  }
  return fakeDevice
}

const createMockData = async () => {
  const mock = await LS.getItem('mock')
  if (mock) return
  const places = R.times(createFakePlace, 10)
  console.log(places)
  const devices = R.times(createFakeDevice(places), 1000)
  console.log(devices)
  LS.setItem('places', places)
  LS.setItem('devices', devices)
  LS.setItem('mock', true)
}

export default createMockData
