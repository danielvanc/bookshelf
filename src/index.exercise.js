import React from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'

function App() {
  return (
    <>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <input
          type="button"
          value="Login"
          onClick={() => alert('Clicked login')}
        />
      </div>
      <div>
        <input
          type="button"
          value="Register"
          onClick={() => alert('Clicked register')}
        />
      </div>
    </>
  )
}

const root = document.getElementById('root')

ReactDOM.render(<App />, root)
