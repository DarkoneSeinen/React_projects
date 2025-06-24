import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from './Blog'

const blog = {
  title: 'Testing React',
  author: 'Kent C. Dodds',
  url: 'https://example.com/blog',
  likes: 10,
  user: {
    username: 'tester',
    name: 'Test User'
  }
}

test('shows url and likes when view button is clicked', async () => {
  const user = userEvent.setup()
  render(<Blog blog={blog} onLike={() => {}} onDelete={() => {}} />)

  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText(blog.url)).toBeDefined()
  expect(screen.getByText(/likes 10/)).toBeDefined()
})

test('like button is clicked twice', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} onLike={mockHandler} onDelete={() => {}} />)

  await user.click(screen.getByText('view'))
  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
