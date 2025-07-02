const Anecdote = ({ anecdote, vote }) => {
  if (!anecdote) return <p>Anecdote not found</p>;

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
      <button onClick={() => vote(anecdote)}>vote</button>
    </div>
  );
};

export default Anecdote;
