import axios from 'axios'
const baseUrl = 'https://literate-space-trout-979xvx5x4xgwf7vp5-3001.app.github.dev/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}

const addComment = async (id, comment) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  const updated = {
    ...anecdote.data,
    comments: [...(anecdote.data.comments || []), comment],
  }
  const response = await axios.put(`${baseUrl}/${id}`, updated)
  return response.data
}

export default { getAll, create, update, addComment }