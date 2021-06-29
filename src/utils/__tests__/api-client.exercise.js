import {server, rest} from 'test/server/test-server'

import {client} from '../api-client'

const apiURL = process.env.REACT_APP_API_URL

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test('calls fetch at the endpoint with the arguments for GET requests', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )

  const result = await client(endpoint)
  expect(result).toEqual(mockResult)
})

test('adds auth token when a token is provided', async () => {
  const token = 'asdflaskjfadsfdfpoufsdpofsfsf'
  const mockResult = {mockValue: 'VALUE'}
  const endpoint = 'test-endpoint'
  let request

  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  await client(endpoint, {token})

  expect(request.headers.get('Authorization')).toEqual(`Bearer ${token}`)
})

test('allows for config overrides', async () => {
  const token = 'asdflaskjfadsfdfpoufsdpofsfsf'
  const mockResult = {mockValue: 'VALUE'}
  const endpoint = 'test-endpoint'
  let request
  const customConfig = {
    token,
    mode: 'cors',
    method: 'PUT',
    headers: {
      'Content-Type': 'json',
    },
  }

  server.use(
    rest.put(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  await client(endpoint, customConfig)

  expect(request.headers.get('Content-Type')).toBe(
    customConfig.headers['Content-Type'],
  )
})

test('when data is provided, it is stringified and the method defaults to POST', async () => {
  const token = 'asdflaskjfadsfdfpoufsdpofsfsf'
  // const mockResult = {mockValue: 'VALUE'}
  const data = {name: 'Dan', age: 40}
  const endpoint = 'test-endpoint'
  // let request
  const customConfig = {
    data,
    token,
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'json',
    },
  }

  server.use(
    rest.post(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      // request = req
      return res(ctx.json(req.body))
    }),
  )

  const result = await client(endpoint, customConfig)

  expect(result).toEqual(data)
  // expect(request.body).toEqual(data)
})
