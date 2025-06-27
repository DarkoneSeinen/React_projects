const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = [
  {
    content: 'If it hurts, do it more often',
    id: getId(),
    votes: 0
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    id: getId(),
    votes: 0
  }
]

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return state
        .map(anecdote =>
          anecdote.id === action.payload.id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote
        )
        .sort((a, b) => b.votes - a.votes)

    case 'NEW_ANECDOTE':
      return [...state, action.payload].sort((a, b) => b.votes - a.votes)

    default:
      return state
  }
}

export const voteAnecdote = (id) => ({
  type: 'VOTE',
  payload: { id }
})

export const createAnecdote = (content) => ({
  type: 'NEW_ANECDOTE',
  payload: {
    content,
    id: getId(),
    votes: 0
  }
})

export default anecdoteReducer
