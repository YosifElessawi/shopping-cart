import supertest from 'supertest'
import app from '../server'

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('test main endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })

  it('test user endpoint', async () => {
    const response = await request.get('/users')
    expect(response.status).toBe(200)
  })

  it('test products endpoint', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200)
  })

  it('test orders endpoint', async () => {
    const response = await request.get('/orders')
    expect(response.status).toBe(200)
  })
})
