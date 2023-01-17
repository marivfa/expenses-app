import React from 'react'
import TopNavbar from './TopNavbar'
import Footer from './Footer'

import MainRouter from '../MainRouter'

import '../style.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Main({ signOut }) {
  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <TopNavbar signOut={signOut} />
        <div className="container-fluid">
          <MainRouter />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            draggable={false}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}
