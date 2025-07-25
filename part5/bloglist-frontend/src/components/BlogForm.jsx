import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create new blog</h3>
      <div>
        title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="title"
        />

        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="author"
        />

        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder="url"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
