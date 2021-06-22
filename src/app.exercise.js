import * as React from 'react'
import {useAuth} from './context/auth-context'

import {FullPageSpinner} from './components/lib'
// import AuthenticatedApp from './authenticated-app'
// import UnauthenticatedApp from './unauthenticated-app'
const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))
function App() {
  const {user} = useAuth()

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  )
}

export {App}
