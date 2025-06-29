import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [, dispatch] = useNotification()

  const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'SHOW', payload: `anecdote '${data.content}' created` })
      setTimeout(() => dispatch({ type: 'HIDE' }), 5000)
    },
    onError: () => {
      dispatch({ type: 'SHOW', payload: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => dispatch({ type: 'HIDE' }), 5000)
    }
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'SHOW', payload: `anecdote '${data.content}' voted` })
      setTimeout(() => dispatch({ type: 'HIDE' }), 5000)
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  if (isLoading) return <div>loading data...</div>
  if (isError) return <div>anecdote service not available due to problems in server</div>

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm onCreate={(content) => newAnecdoteMutation.mutate({ content, votes: 0 })} />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
