import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: selectedGenre ? { genre: selectedGenre } : {},
  })

  if (!show) return null
  if (loading) return <div>loading...</div>

  const books = data.allBooks

  // Obtener lista de géneros únicos
  const allGenres = [...new Set(books.flatMap((b) => b.genres))]

  return (
    <div>
      <h2>books</h2>
      {selectedGenre && <p>in genre <b>{selectedGenre}</b></p>}

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1em' }}>
        {allGenres.map((g) => (
          <button key={g} onClick={() => setSelectedGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
