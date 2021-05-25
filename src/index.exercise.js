import React from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

function LoginForm({onSubmit, buttonText }) {

  function handleSubmit(formData) {
    formData.preventDefault()
    const {username, password} = formData.target.elements;

    onSubmit({
      username: username.value,
      password: password.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
      </p>
      <p>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      </p>
      <button type="submit">{buttonText}</button>
    </form>
  )
}

function App() {
  const [showDialog, setShowDialog] = React.useState("none");

  function login(formData) {
    console.log('login', formData);
    
  }
  function register(formData) {
    console.log('register', formData);
  }

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
        <LoginForm onSubmit={login} buttonText={"Login"} />
      </Dialog>

      <Dialog aria-label="Register form" isOpen={showDialog === "Register"}>
        <div>
          <button onClick={() => setShowDialog("none")}>Close</button>
        </div>
        <h3>Register</h3>
        <LoginForm onSubmit={register} buttonText={"Register"} />
      </Dialog>
    </>
  )
}

const root = document.getElementById('root')

ReactDOM.render(<App />, root)
