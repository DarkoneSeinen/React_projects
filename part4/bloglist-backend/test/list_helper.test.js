import { test, describe } from 'node:test'
import assert from 'node:assert'
import { totalLikes } from '../utils/list_helper.js'

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [
    { title: 'A', author: 'X', url: '', likes: 7 },
    { title: 'B', author: 'Y', url: '', likes: 3 },
    { title: 'C', author: 'Z', url: '', likes: 10 }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of empty list is zero', () => {
    const result = totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 20)
  })
})
