import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => {
    console.log("PUT request response: ", response)
    return response.data
  })
}

const erase = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => {
    // console.log("DELETE request response: ", response)
    return response.status
  })
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, erase }