export const objectToUrl = obj => {
    return Object.keys(obj)
        .filter(i => !!obj[i])
        .map(i => `${i}=${obj[i]}`)
        .join('&')
}

const splitReducer = (acc, strPair) => {
    const keyValue = strPair.split('=')
    acc[keyValue[0]] = keyValue[1]
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
