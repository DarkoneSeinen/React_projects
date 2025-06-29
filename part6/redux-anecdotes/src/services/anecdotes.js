import axios from 'axios'

const baseUrl = 'https://literate-space-trout-979xvx5x4xgwf7vp5-3001.app.github.dev/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

export default { getAll, createNew }
