import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommended = ({ show, favoriteGenre }) => {
  const result = useQuery(ALL_BOOKS)

  if (!show || !favoriteGenre) return null
  if (result.loading) return <div>loading...</div>

  const books = result.data.allBooks.filter((b) =>
    b.genres.includes(favoriteGenre)
  )

  return (
    <div>
      <h2>Recommended</h2>
      <p>Books in your favorite genre <b>{favoriteGenre}</b></p>

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
    </div>
  )
}

export default Recommended
