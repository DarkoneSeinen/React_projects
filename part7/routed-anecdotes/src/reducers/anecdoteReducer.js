import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.payload
    case 'VOTE':
      return state.map(a =>
        a.id === action.payload.id ? action.payload : a
      )
    case 'CREATE':
      return [...state, action.payload]
    default:
      return state
  }
}

export const initializeAnecdotes = () => async dispatch => {
  const data = await anecdoteService.getAll()
  dispatch({ type: 'INIT', payload: data })
}

export const voteAnecdote = (anecdote) => async dispatch => {
  const updated = await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
  dispatch({ type: 'VOTE', payload: updated })
}

export const addAnecdote = (anecdote) => async dispatch => {
  const newA = await anecdoteService.create(anecdote)
  dispatch({ type: 'CREATE', payload: newA })
}

export default anecdoteReducer
