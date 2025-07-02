import axios from 'axios'
const baseUrl = 'https://literate-space-trout-979xvx5x4xgwf7vp5-3001.app.github.dev/anecdotes'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (data) => {
  const res = await axios.post(baseUrl, data)
  return res.data
}

const update = async (id, data) => {
  const res = await axios.put(`${baseUrl}/${id}`, data)
  return res.data
}

export default { getAll, create, update, setToken }
