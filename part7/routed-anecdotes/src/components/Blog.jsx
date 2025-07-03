import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import anecdoteService from '../services/anecdoteService';
import { initializeAnecdotes } from '../reducers/anecdoteReducer';

const Blog = () => {
  const { id } = useParams();
  const anecdotes = useSelector(state => state.anecdotes);
  const dispatch = useDispatch();
  const anecdote = anecdotes.find(a => a.id === id);

  const [comment, setComment] = useState('');

  const addComment = async (e) => {
    e.preventDefault();
    await anecdoteService.addComment(id, comment);
    setComment('');
    dispatch(initializeAnecdotes()); // recarga datos del backend
  };

  if (!anecdote) return <p>Loading...</p>;

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>

      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {anecdote.comments?.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
