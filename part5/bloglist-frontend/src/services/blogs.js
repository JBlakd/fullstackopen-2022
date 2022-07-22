import axios from 'axios'
const baseUrl = '/api/blogs'

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   return request.then(response => response.data)
// }

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }