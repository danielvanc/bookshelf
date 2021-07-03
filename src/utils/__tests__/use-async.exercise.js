import {renderHook, act} from '@testing-library/react-hooks'
import {useAsync} from '../hooks'

// 💰 This is a way you can create a promise
// which you can imperatively resolve or reject whenever you want.
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

// Usage:
// const {promise, resolve} = deferred()
// promise.then(() => console.log('resolved'))
// do stuff/make assertions you want to before calling resolve
// resolve()
// await promise
// do stuff/make assertions you want to after the promise has resolved

test('calling run with a promise which resolves', async () => {
  const {promise, resolve} = deferred()

  const {result} = renderHook(() => useAsync())

  expect(result.current).toEqual({
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'idle',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  let p
  act(() => {
    p = result.current.run(promise)
  })

  expect(result.current.status).toEqual('pending')

  // await act(async () => await resolve())
  const resolvedValue = Symbol('resolved value')
  await act(async () => {
    resolve(resolvedValue)
    await p
  })

  // expect(result.current.isSuccess).toBe(true)
  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'resolved',
    data: resolvedValue,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  act(() => result.current.reset())

  expect(result.current.isIdle).toBe(true)
})

test('calling run with a promise which rejects', async () => {
  const {promise, reject} = deferred()

  const {result} = renderHook(() => useAsync())

  expect(result.current).toEqual({
    isIdle: true,
    isLoading: false,
    isError: false,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'idle',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  let p
  act(() => {
    p = result.current.run(promise)
  })

  expect(result.current.status).toEqual('pending')

  const rejectedValue = Symbol('resolved value')
  await act(async () => {
    reject(rejectedValue)
    await p.catch(err => err)
  })

  expect(result.current.isError).toBe(true)
  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: true,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: rejectedValue,
    status: 'rejected',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })

  act(() => result.current.reset())

  expect(result.current.isIdle).toBe(true)
})

test('can specify an initial state', async () => {
  const initialState = {
    status: 'resolved',
    data: {name: 'Daniel'},
  }
  const {result} = renderHook(() => useAsync(initialState))

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: initialState.status,
    data: initialState.data,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('can set the data', async () => {
  const {result} = renderHook(() => useAsync())
  const newData = {age: 40}
  act(() => {
    result.current.setData(newData)
  })

  expect(result.current.data).toEqual(newData)

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: false,
    isSuccess: true,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: null,
    status: 'resolved',
    data: newData,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('can set the error', async () => {
  const {result} = renderHook(() => useAsync())
  const newData = 'rejected'
  act(() => {
    result.current.setError('rejected')
  })

  expect(result.current.error).toEqual(newData)

  expect(result.current).toEqual({
    isIdle: false,
    isLoading: false,
    isError: true,
    isSuccess: false,
    setData: expect.any(Function),
    setError: expect.any(Function),
    error: newData,
    status: 'rejected',
    data: null,
    run: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('No state updates happen if the component is unmounted while pending', async () => {})
// 💰 const {result, unmount} = renderHook(...)
// 🐨 ensure that console.error is not called (React will call console.error if updates happen when unmounted)

test('calling "run" without a promise results in an early error', async () => {})
