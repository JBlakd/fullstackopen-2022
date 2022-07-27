import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  console.log('createNew content: ', content)
  const response = await axios.post(baseUrl, { "content": content })
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew }