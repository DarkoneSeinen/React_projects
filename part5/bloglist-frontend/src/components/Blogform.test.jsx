import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import BlogForm from './BlogForm'

test('calls createBlog with correct details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  await user.type(screen.getByPlaceholderText('title'), 'New Blog Title')
  await user.type(screen.getByPlaceholderText('author'), 'Blog Author')
  await user.type(screen.getByPlaceholderText('url'), 'http://blogurl.com')
  await user.click(screen.getByText('create'))

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'New Blog Title',
    author: 'Blog Author',
    url: 'http://blogurl.com'
  })
})
