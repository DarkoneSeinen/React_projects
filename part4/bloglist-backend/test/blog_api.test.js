import { test, describe, beforeEach, after } from 'node:test'
import assert from 'node:assert/strict'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'

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

// desconectar después de todas las pruebas
after(async () => {
  await mongoose.connection.close()
})
