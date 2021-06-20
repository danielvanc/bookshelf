import * as React from 'react'

const AuthContext = React.createContext()

function useAuth() {
  const context = React.useContext(AuthContext)

  if (!context)
    throw new Error('useAuth must be used within an AuthContext provider')

  return context
}

export {AuthContext, useAuth}
