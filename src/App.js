import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import NavBar from './components/NavBar'
import Main from './components/Main'
import './App.css'
import FormLogin from './sections/login/FormLogin'

import useToken from './commons/useToken'

import { Amplify, Auth } from 'aws-amplify'
import awsconfig from './aws-exports'
import { UserProvider } from './context/UsersContext'
Amplify.configure(awsconfig)

const signOut = async () => {
  try {
    await Auth.signOut()
    localStorage.removeItem('token')
    setTimeout(function () {
      window.location.reload()
    }, 1000)
  } catch (error) {
    console.log('error signing out: ', error)
  }
}

function App() {
  const { token, setToken } = useToken()
  return (
    <div>
      {token ? (
        <BrowserRouter>
          <UserProvider>
            <div className="App">
              <div id="wrapper">
                <NavBar />
                <Main signOut={signOut} />
              </div>
            </div>
          </UserProvider>
        </BrowserRouter>
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-12 col-md-9">
              <FormLogin setToken={setToken} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
