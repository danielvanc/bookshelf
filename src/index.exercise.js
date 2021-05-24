import React from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

function App() {
  const [showDialog, setShowDialog] = React.useState("none");
  return (
    <>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <input
          type="button"
          value="Login"
          onClick={() => setShowDialog("Login")}
        />
      </div>
      <div>
        <input
          type="button"
          value="Register"
          onClick={() => setShowDialog("Register")}
        />
      </div>

      <Dialog aria-label="Login form" isOpen={showDialog === "Login"}>
        <div>
          <button onClick={() => setShowDialog("none")}>Close</button>
        </div>
        <h3>Login</h3>
      </Dialog>

      <Dialog aria-label="Register form" isOpen={showDialog === "Register"}>
        <div>
          <button onClick={() => setShowDialog("none")}>Close</button>
        </div>
        <h3>Register</h3>
      </Dialog>
    </>
  )
}

const root = document.getElementById('root')

ReactDOM.render(<App />, root)
