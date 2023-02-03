import React from 'react'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { User, Logout } from 'tabler-icons-react'
import '../style.css'

export default function TopNavbar({ signOut }) {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars"></i>
      </button>
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>

        <Nav>
          <NavDropdown
            title={
              <div className="pull-left">
                {
                  JSON.parse(
                    JSON.parse(localStorage.getItem('token')).attributes
                  ).name
                }
                <img
                  className="img-profile rounded-circle"
                  src="../img/undraw_profile.svg"
                  alt="Avatar"
                />
              </div>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item eventKey={1.1} href="/profile">
              <User /> Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey={1.3} onClick={signOut}>
              <Logout /> Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </ul>
    </nav>
  )
}
