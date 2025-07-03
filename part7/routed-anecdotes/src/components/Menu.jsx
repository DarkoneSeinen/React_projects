import { Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/" style={padding}>blogs</Link>
      <Link to="/users" style={padding}>users</Link>
      <Link to="/create" style={padding}>create</Link>
      <Link to="/login" style={padding}>login</Link>
    </div>
  )
}

export default Menu
