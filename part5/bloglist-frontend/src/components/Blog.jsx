import { useState } from 'react'

const Blog = ({ blog, onLike, onDelete }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => onLike(blog)}>like</button>
          </div>
          <button onClick={() => onDelete(blog)}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
