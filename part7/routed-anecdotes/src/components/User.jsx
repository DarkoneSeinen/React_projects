import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const { id } = useParams()
  const anecdotes = useSelector(state => state.anecdotes)

  const blogs = anecdotes.filter(b => b.user && b.user.id === id)
  const user = blogs[0]?.user

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>{blog.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
