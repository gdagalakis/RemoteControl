export const objectToUrl = obj =>
  (obj
    ? Object.keys(obj)
      .filter(i => !!obj[i])
      .map(i => `${i}=${obj[i]}`)
      .join('&')
    : '')

const splitReducer = (acc, strPair) => {
  const [keyValue0, keyValue1] = strPair.split('=')
  acc[keyValue0] = keyValue1
  return acc
}

export const urlToObject = url => {
  const strPairs = url.split('&')
  return strPairs.reduce(splitReducer, {})
}

export const guid = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  )
}
