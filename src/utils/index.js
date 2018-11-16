export const objectToUrl = obj => {
    // let url="";
    // Object.keys(obj).map(i => url += i + "=" +obj[i] + "&" )
    return Object.keys(obj)
        .filter(i => !!obj[i])
        .map(i => `${i}=${obj[i]}`)
        .join('&')
    // return url
}

const splitReducer = (acc, strPair) => {
    const keyValue = strPair.split('=')
    acc[keyValue[0]] = keyValue[1]
    return acc
}

export const urlToObject = url => {
    // let result = {};
    const strPairs = url.split('&')
    return strPairs.reduce(splitReducer, {})
    //  strPairs.forEach(function(pair) {
    //   pair = pair.split('=');
    //   result[pair[0]]= pair[1];
    //   })
    //   return result;
}
