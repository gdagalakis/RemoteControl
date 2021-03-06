const apiUrl = 'http://localhost/api'

export const read = async url => {
  const response = await fetch(`${apiUrl}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

export const create = async (url, data) => {
  const response = await fetch(`${apiUrl}${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response.json()
}

export const update = async (url, data) => {
  const response = await fetch(`${apiUrl}${url}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}

export const destroy = async url => {
  const response = await fetch(`${apiUrl}${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}
