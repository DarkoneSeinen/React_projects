const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(a => <li key={a.id}>{a.content}</li>)}
    </ul>
  </div>
)

export default AnecdoteList
