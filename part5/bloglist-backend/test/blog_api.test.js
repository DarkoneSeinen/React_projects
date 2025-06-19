import { test, describe, beforeEach, after } from 'node:test'
import assert from 'node:assert/strict'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'
import bcrypt from 'bcrypt'
import User from '../models/user.js'


const api = supertest(app)

const initialBlogs = [
  {
    title: 'First blog',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 3,
  },
  {
    title: 'Second blog',
    author: 'Jane Smith',
    url: 'http://example.org',
    likes: 7,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as JSON', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.status, 200)
  assert.strictEqual(response.headers['content-type'].includes('application/json'), true)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  assert.ok(blog.id)
  assert.strictEqual(typeof blog.id, 'string')
  assert.strictEqual(blog._id, undefined)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New blog post',
    author: 'DarkoneSeinen',
    url: 'http://newblog.com',
    likes: 5
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length + 1)

  const titles = blogsAtEnd.body.map(b => b.title)
  assert(titles.includes(newBlog.title))
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete._id}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))
  })
})

describe('updating a blog', () => {
  test('succeeds in updating likes field', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]

    const updatedData = { ...blogToUpdate.toJSON(), likes: blogToUpdate.likes + 1 }

    const response = await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password', 10)
  const user = new User({ username: 'tester', passwordHash })
  await user.save()

  const response = await api
    .post('/api/login')
    .send({ username: 'tester', password: 'password' })

  token = response.body.token

  const blogObjects = initialBlogs.map(blog => new Blog({ ...blog, user: user._id }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('a valid blog can be added with token', async () => {
  const newBlog = {
    title: 'Secured blog',
    author: 'Root',
    url: 'http://secure.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Blog.find({})
  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('Secured blog')
})


test('blog is not added without token', async () => {
  const newBlog = {
    title: 'Unauthorized blog',
    author: 'Intruder',
    url: 'http://unauth.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const blogsAtEnd = await Blog.find({})
  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).not.toContain('Unauthorized blog')
})

