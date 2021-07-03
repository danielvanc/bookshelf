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
  // 🐨 this will be very similar to the previous test, except you'll reject the
  // promise instead and assert on the error state.
  // 💰 to avoid the promise actually failing your test, you can catch
  //    the promise returned from `run` with `.catch(() => {})`

  const {promise, resolve, reject} = deferred()

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
  const rejectedValue = Symbol('resolved value')
  await act(async () => {
    reject(rejectedValue)
    await p.catch(err => err)
  })

  console.log('result.current', result.current)

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

test('can specify an initial state', async () => {})
// 💰 useAsync(customInitialState)

test('can set the data', async () => {})
// 💰 result.current.setData('whatever you want')

test('can set the error', async () => {})
// 💰 result.current.setError('whatever you want')

test('No state updates happen if the component is unmounted while pending', async () => {})
// 💰 const {result, unmount} = renderHook(...)
// 🐨 ensure that console.error is not called (React will call console.error if updates happen when unmounted)

test('calling "run" without a promise results in an early error', async () => {})
