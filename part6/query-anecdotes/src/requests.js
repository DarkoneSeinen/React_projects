import axios from 'axios'

const baseUrl = 'https://literate-space-trout-979xvx5x4xgwf7vp5-3001.app.github.dev/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

export const updateAnecdote = (updatedAnecdote) =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote).then(res => res.data)
