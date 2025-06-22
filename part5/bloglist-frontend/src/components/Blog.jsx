// src/components/Blog.jsx
import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => setVisible(!visible)

  const showDetails = () => (
    <div>
      <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>{blog.user?.name || 'unknown user'}</div>
      {blog.user && currentUser.username === blog.user.username && (
        <button onClick={() => handleDelete(blog)}>remove</button>
      )}
    </div>
  )

  return (
    <div style={blogStyle}>
      {!visible
        ? <div>{blog.title} {blog.author} <button onClick={toggleVisibility}>view</button></div>
        : showDetails()
      }
    </div>
  )
}

export default Blog
