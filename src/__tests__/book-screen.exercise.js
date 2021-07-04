// 🐨 here are the things you're going to need for this test:
import * as React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import {queryCache} from 'react-query'
import {buildUser, buildBook} from 'test/generate'
import * as auth from 'auth-provider'
import {AppProviders} from 'context'
import {App} from 'app'

// 🐨 after each test, clear the queryCache and auth.logout
// afterEach(() => {
//   queryCache.clear()
//   auth.logout()
// })

test('renders all the book information', async () => {
  // 🐨 "authenticate" the client by setting the auth.localStorageKey in localStorage to some string value (can be anything for now)
  // window.localStorage.setItem(auth.localStorageKey, 'TEST_AUTH')

  // 🐨 create a user using `buildUser`
  // const user = buildUser()
  // 🐨 create a book use `buildBook`
  // const book = buildBook()
  // 🐨 update the URL to `/book/${book.id}`
  // const URL = `/book/${book.id}`
  //   💰 window.history.pushState({}, 'page title', route)
  //   📜 https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
  // window.history.pushState({}, 'page title', URL)

  // 🐨 reassign window.fetch to another function and handle the following requests:
  // - url ends with `/bootstrap`: respond with {user, listItems: []}
  // - url ends with `/list-items`: respond with {listItems: []}
  // - url ends with `/books/${book.id}`: respond with {book}
  // 💰 window.fetch = async (url, config) => { /* handle stuff here*/ }
  // 💰 return Promise.resolve({ok: true, json: async () => ({ /* response data here */ })})

  // window.fetch = async (url, config) => {
  //   console.warn(url, config)
  //   return Promise.reject(new Error(`NEED TO HANDLE: ${url}`))
  // }

  // 🐨 render the App component and set the wrapper to the AppProviders

  render(<App />, {wrapper: AppProviders})

  // (that way, all the same providers we have in the app will be available in our tests)
  // 🐨 use waitFor to wait for the queryCache to stop fetching and the loading
  // indicators to go away
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitfor
  // 💰 if (queryCache.isFetching or there are loading indicators) then throw an error...
  // await waitFor(() => {
  //   if (queryCache.isFetching) {
  //     console.log('loading...')
  //   }
  // })

  // 🐨 assert the book's info is in the document
  screen.debug()
})
