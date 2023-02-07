import { useEffect, useState, useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Storage } from 'aws-amplify'
import { User, Logout } from 'tabler-icons-react'
import { UsersContext } from '../context/UsersContext'
import '../style.css'

export default function TopNavbar({ signOut }) {
  const [isLoading, setIsLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState(null)
  const imgDefault = '../img/undraw_profile.svg'
  const [currentUser] = useContext(UsersContext)

  const checkImageExist = async () => {
    if (!currentUser) return
    setIsLoading(true)
    try {
      const res = await Storage.get(`photo-${currentUser.id}`, {
        level: 'public',
        download: true,
        contentType: ' "image/png"',
      })
      if (res) {
        let image = new Image()
        image.src = URL.createObjectURL(res.Body)
        setImageUrl(image.src)
      }
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    checkImageExist()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

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
                {currentUser ? currentUser.name : ''}
                <img
                  className="img-profile rounded-circle"
                  src={imageUrl ? imageUrl : imgDefault}
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
