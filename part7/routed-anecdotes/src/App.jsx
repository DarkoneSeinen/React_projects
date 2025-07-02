import { useMatch, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import Anecdote from './components/Anecdote';
import About from './components/About';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import Notification from './components/Notification';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAnecdotes, voteAnecdote, addAnecdote } from './reducers/anecdoteReducer';
import { setNotification } from './reducers/notificationReducer';
import { setUser } from './reducers/userReducer';
import LoginForm from './components/LoginForm';
import loginService from './services/loginService'; 

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(initializeAnecdotes());
    const saved = window.localStorage.getItem('loggedUser');
    if (saved) dispatch(setUser(JSON.parse(saved)));
  }, [dispatch]);

  const match = useMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null;

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
  };

  const handleCreate = (anecdote) => {
    dispatch(addAnecdote(anecdote));
    dispatch(setNotification(`A new anecdote '${anecdote.content}' created!`, 5));
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      dispatch(setUser(user));
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      dispatch(setNotification(`Welcome ${user.name}`, 5));
    } catch (error) {
      dispatch(setNotification('Wrong credentials', 5));
    }
  };

  return (
    <>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification />

      <Routes>
        <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
        <Route path="/create" element={<CreateNew addAnecdote={handleCreate} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} vote={handleVote} />} />
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/" element={user ? <AnecdoteList anecdotes={anecdotes} /> : <LoginForm handleLogin={handleLogin} />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
