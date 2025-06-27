import { Provider } from 'react-redux'
import store from './store'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h2>Anecdotes</h2>
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    </Provider>
  )
}

export default App
