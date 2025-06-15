import { test, describe } from 'node:test'
import assert from 'node:assert'
import { favoriteBlog } from '../utils/list_helper.js'

describe('favorite blog', () => {
  const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    }
  ]

  test('returns the blog with the most likes', () => {
    const result = favoriteBlog(blogs)
    assert.deepStrictEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })

  test('returns null for empty list', () => {
    const result = favoriteBlog([])
    assert.strictEqual(result, null)
  })
})
