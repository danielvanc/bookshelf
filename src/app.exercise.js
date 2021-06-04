/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
// 🐨 you're going to need this:
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

function App() {
  
  const [user, setUser] = React.useState(null)
  
  function login(form) {
    return auth.login(form).then(usr => setUser(usr));
  }

  function register(form) {
    return auth.register(form).then(usr => setUser(usr))
  }
  
  function logout() {
    auth.logout();
    setUser(null)
  }

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )

  // return <UnauthenticatedApp login={auth.login} register={auth.register} />
}



export {App}

/*
eslint
  no-unused-vars: "off",
*/
