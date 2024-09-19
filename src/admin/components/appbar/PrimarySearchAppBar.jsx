import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/images/image.png'
import { useAuth } from '../privateRoutes/AuthContext';

function Header() {
  const {isAuthenticated, user,login, logout, validateToken, setIsAuthenticated} = useAuth()
  return (
    <Navbar expand="lg" className="bg-body-tertiary text-light " >
      <Container>
        <Navbar.Brand href="/admin" className='text-light'><img src={logo} alt="" className="logo" />SPORTI ADMIN</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center gap-2">
            <Nav.Link href="/admin" className='text-light'>Home</Nav.Link>
            <Nav.Link href="/" className='text-light'>SPORTI HOME</Nav.Link>
            <Nav.Link href="/admin/feedbacks" className='text-light'>Feedbacks</Nav.Link>
            {/* <Nav.Link href="/bookings">Bookings</Nav.Link> */}
           {/* <NavDropdown title="Bookings" id="basic-nav-dropdown" className='btn btn-light btn-sm p-1 py-0'>
              <NavDropdown.Item href="/admin/room/bookings" className='text-light' >Room Bookings</NavDropdown.Item>
              <NavDropdown.Item href="/main/hall/bookings" className='text-light'>
                Main Hall Bookings
              </NavDropdown.Item>
              <NavDropdown.Item href="/conference/hall/bookings" className='text-light'>Conference Hall Bookings</NavDropdown.Item>
              <NavDropdown.Item href="/barbeque/area/bookings" className='text-light'>
                Barbeque Bookings
              </NavDropdown.Item>
             
            </NavDropdown> */}
            <a href="/admin/new/room/booking" className='btn btn-light btn-sm p-2 text-dark'>New Room Booking</a>
            <a href="/admin/new/service" className='btn btn-light btn-sm p-2'>New Event Booking</a>
            {
              isAuthenticated?(
                <button className='btn btn-danger btn-sm p-2' onClick={()=>logout()}>Logout</button>
              ):(null)
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;