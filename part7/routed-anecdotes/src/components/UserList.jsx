import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const anecdotes = useSelector(state => state.anecdotes)

  // Agrupar por usuario
  const userMap = {}
  anecdotes.forEach(blog => {
    const user = blog.user
    if (user) {
      userMap[user.id] = userMap[user.id] || { ...user, blogs: [] }
      userMap[user.id].blogs.push(blog)
    }
  })

  const users = Object.values(userMap)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
