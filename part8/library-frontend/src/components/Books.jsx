import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const { data: initialData } = useQuery(ALL_BOOKS)
  const [getBooksByGenre, { data: filteredData }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (genre) {
      getBooksByGenre({ variables: { genre } })
    }
  }, [genre, getBooksByGenre])

  if (!show) return null

  const books = genre
    ? filteredData?.allBooks || []
    : initialData?.allBooks || []

  const genres = Array.from(
    new Set(initialData?.allBooks.flatMap((b) => b.genres) || [])
  )

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <strong>{genre}</strong></p>}

      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setGenre(null)}>all genres</button>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
