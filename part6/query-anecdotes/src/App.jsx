import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import { useNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const [_, dispatch] = useNotification()

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updated) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updated.id ? updated : a))
      dispatch({ type: 'SHOW', payload: `anecdote '${updated.content}' voted` })
      setTimeout(() => dispatch({ type: 'HIDE' }), 5000)
    }
  })

  const { data, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>anecdote service not available due to problems in server</div>

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
