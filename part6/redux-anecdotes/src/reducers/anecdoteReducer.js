import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { content: 'If it hurts, do it more often', votes: 0, id: '1' },
  { content: 'Adding manpower to a late software project makes it later!', votes: 0, id: '2' }
]

const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const updated = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return [...state.map(a => a.id === id ? updated : a)].sort((a, b) => b.votes - a.votes)
    },
    createAnecdote(state, action) {
      const content = action.payload
      const newAnecdote = { content, id: getId(), votes: 0 }
      return [...state, newAnecdote].sort((a, b) => b.votes - a.votes)
    }
  }
})

export const { voteAnecdote, createAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer