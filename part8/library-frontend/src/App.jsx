import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import Notify from './components/Notify'

import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('phonenumbers-user-token'))
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.title).includes(object.title)

    const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: { genre: null } })
    if (dataInStore && !includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: null },
        data: {
          allBooks: dataInStore.allBooks.concat(addedBook)
        }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      alert(`Nuevo libro agregado: "${addedBook.title}" por ${addedBook.author.name}`)
      updateCacheWith(addedBook)
    }
  })

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <LoginForm setError={notify} setToken={setToken} />
      </div>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      {page === 'authors' && <Authors show={true} />}
      {page === 'books' && <Books show={true} />}
      {page === 'add' && <NewBook show={true} />}
      {page === 'recommend' && <Recommend show={true} />}
    </div>
  )
}

export default App
