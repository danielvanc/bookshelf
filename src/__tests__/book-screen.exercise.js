import * as React from 'react'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import {queryCache} from 'react-query'
import {buildUser, buildBook} from 'test/generate'
import * as auth from 'auth-provider'
import {AppProviders} from 'context'
import {App} from 'app'

// 🐨 after each test, clear the queryCache and auth.logout
afterEach(() => {
  queryCache.clear()
  auth.logout()
})

test('renders all the book information', async () => {
  window.localStorage.setItem(auth.localStorageKey, 'TEST_AUTH_2')

  const user = buildUser()
  const book = buildBook()
  const URL = `/book/${book.id}`
  window.history.pushState({}, 'page title', URL)

  // - url ends with `/list-items`: respond with {listItems: []}

  const originalFetch = window.fetch
  window.fetch = async (url, config) => {
    if (url.endsWith('/bootstrap')) {
      return {
        ok: true,
        json: async () => ({
          user: {...user, token: 'TEST_AUTH_2'},
          listItems: [],
        }),
      }
    } else if (url.endsWith(`/books/${book.id}`)) {
      return {
        ok: true,
        json: async () => ({book}),
      }
    }
    return originalFetch(url, config)
  }

  render(<App />, {wrapper: AppProviders})

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // 🐨 assert the book's info is in the document
  screen.debug()
})
