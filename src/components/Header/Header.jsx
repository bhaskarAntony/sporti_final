import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation} from 'react-router-dom';  // Import Link
import { useLanguage } from '../../context/LangaugeContext';
import { Navbar, Container, Nav, NavDropdown, Offcanvas, Button, Modal } from 'react-bootstrap';
import logo from '../../assets/images/main_logo.jpg';
import './style.css';
import AuthContext from '../../context/AuthContext.jsx';
import { Calendar, HomeIcon, LogOut, Settings, User, UserCircle } from 'lucide-react';
import GuestAuthContext from '../../context/GuestAuthContext.jsx';


function Header({ toggleTheme, theme }) {
  const [selectedLink, setSelectedLink] = useState('/')
  const location = useLocation()
  const [loginshow, setLoginShow] = useState(false);
  const [show, setShow] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const { isAuthenticated, handleLogout, user, logout} = useContext(AuthContext);
  const {isGuestAuthenticated, logoutGuest} = useContext(GuestAuthContext)
  const { isKannada } = useLanguage();
  console.log('user = ', user);
  

  useEffect(()=>{
    console.log(location.pathname);
    switch (location.pathname) {
      case '/':
        setSelectedLink('/')
        break;

      case '/about':
        setSelectedLink('about')
        break;
      case '/contact/sporti1':
        setSelectedLink('contact')
        break;
      case '/contact/sporti2':
        setSelectedLink('contact')
        break;
      case '/service/sporti1':
          setSelectedLink('sporti1')
          break;
      case '/service/sporti2':
          setSelectedLink('sporti2')
          break; 
      case '/events&gallery':
          setSelectedLink('events&gallery')
          break;
      case '/faqs':
          setSelectedLink('faqs')
          break;
      default:
        setSelectedLink('/')
        break;
    }
  }, [location.pathname])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showModal = () => {
    setLoginShow(true);
  }
  const closeModal = () => {
    setLoginShow(false);
  }
  return (
    <header>
      <Navbar expand="xl" className="navbar p-1" >
        <Container fluid className="p-0 d-flex justify-content-between">
          <div className="logo-container d-flex align-items-center">
            <Navbar.Brand as={Link} to="/">
              <div className="d-flex gap-2 align-items-center logo mx-3">
                <img src={logo} alt="logo" className="main-logo" />
                <h1 className="f3 fw-bold m-0">{isKannada ? 'ಸ್ಪೊರ್ಟಿ' : 'SPORTI'}</h1>
              </div>
            </Navbar.Brand>
          </div>

          <button
            className="btn p-0 bg-transparent text-white d-block d-xl-none"
            onClick={handleShow}
          >
            <i className="bi bi-list fs-1"></i>
          </button>

          <Navbar.Collapse id="navbarScroll" className="p-0">
            <div className="d-none d-lg-block w-100">
              <Nav className="me-auto my-2 my-lg-0 gap-2 p-2" style={{ maxHeight: '70px' }} navbarScroll>
                <Nav.Link as={Link} className={selectedLink == "/"?"active":null} to="/">{isKannada ? 'ಮನೆ' : 'Home'}</Nav.Link>
                {/* {isAuthenticated && (
                  <> */}
                    <Nav.Link className={selectedLink == "about"?"active":null} as={Link} to="/about">{isKannada ? 'ನಮ್ಮ ಬಗ್ಗೆ' : 'About Us'}</Nav.Link>
                    <Nav.Link className={selectedLink == "sporti1"?"active":null} as={Link} to="/services/sporti1">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-1' : 'SPORTI-1'}</Nav.Link>
                    <Nav.Link className={selectedLink == "sporti2"?"active":null} as={Link} to="/services/sporti2">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-2' : 'SPORTI-2'}</Nav.Link>
                    <Nav.Link className={selectedLink == "events&gallery"?"active":null} as={Link} to="/events&gallery">{isKannada ? 'ಘಟನೆಗಳು & ಚಿತ್ರಶಾಲೆ' : 'Events & Gallery'}</Nav.Link>
                    <Nav.Link className={selectedLink == "faqs"?"active":null} as={Link} to="/faqs">{isKannada ? 'ಪ್ರಶ್ನೆಗಳು' : "FAQ's"}</Nav.Link>
                    <NavDropdown
                      title={isKannada ? 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Contact us'}
                      id="basic-nav-dropdown2"
                      className={selectedLink == "contact"?"active":null}
                      show={showDropdown2}
                      onMouseEnter={() => setShowDropdown2(true)}
                      onMouseLeave={() => setShowDropdown2(false)}
                    >
                      <NavDropdown.Item as={Link} to="/contact/sporti1">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-1' : 'SPORTI-1'}</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/contact/sporti2">{isKannada ? 'ಸ್ಪೊರ್ಟಿ-2' : 'SPORTI-2'}</NavDropdown.Item>
                    </NavDropdown>
                  {/* </>
                )} */}
              
              </Nav>
            </div>
          </Navbar.Collapse>
            <div className='d-flex align-items-center pannel'>
                 
                {isAuthenticated ? (
                             <>
                               {user.role === 'admin' && (
                                 <Nav.Link as={Link} to="/admin" className="px-3">Admin</Nav.Link>
                               )}
                               
                               <NavDropdown  
                               className='btn btn-lght'
                                 title={
                                   <div className="d-inline-flex align-items-center">
                                     <UserCircle size={32} className="me-1 mt-1 bg-white text-dark rounded-circle" />
                                     {/* <span>{user.name}</span> */}
                                   </div>
                                 } 
                                 id="user-dropdown"
                                 align="end"
                               >
                                 <NavDropdown.Item as={Link} to="/dashboard">
                                   <HomeIcon size={16} className="me-2" />
                                   Dashboard
                                 </NavDropdown.Item>
                                 <NavDropdown.Item as={Link} to="/profile">
                                   <Settings size={16} className="me-2" />
                                   Profile
                                 </NavDropdown.Item>
                                 <NavDropdown.Item as={Link} to="/my-bookings">
                                   <Calendar size={16} className="me-2" />
                                   My Bookings
                                 </NavDropdown.Item>
                                 {user.role === 'member' && (
                                   <NavDropdown.Item as={Link} to="/my-guests">
                                     <User size={16} className="me-2" />
                                     My Guests
                                   </NavDropdown.Item>
                                 )}
                                 <NavDropdown.Divider />
                                 <NavDropdown.Item onClick={logout}>
                                   <LogOut size={16} className="me-2" />
                                   Logout
                                 </NavDropdown.Item>
                               </NavDropdown>
                             </>
                           ):isGuestAuthenticated?(
                               <NavDropdown  
                               className='btn btn-lght'
                                 title={
                                   <div className="d-inline-flex align-items-center">
                                     <UserCircle size={32} className="me-1 mt-1 bg-white text-dark rounded-circle" />
                                     {/* <span>{user.name}</span> */}
                                   </div>
                                 } 
                                 id="user-dropdown"
                                 align="end"
                               >
                                 <NavDropdown.Item as={Link} to="/dashboard">
                                   <HomeIcon size={16} className="me-2" />
                                   Booking Status
                                 </NavDropdown.Item>
                                
                                 <NavDropdown.Divider />
                                 <NavDropdown.Item onClick={logoutGuest}>
                                   <LogOut size={16} className="me-2" />
                                   Logout
                                 </NavDropdown.Item>
                               </NavDropdown>
                           ) : (
                             <div className='d-flex gap-2'>
                            <Button variant="light" className='btn-sm' onClick={showModal}>Login</Button>

                              
                             </div>
                           )}
                  </div>
           {/* {
            isAuthenticated?(
              <a href='https://sporti-membership.vercel.app/' className="profile">
              <h1 className="fs-2 mb-0 fw-bold text-white">{user?.name[0]}</h1>
            </a>
            ):(null)
           } */}
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} className="mobile-nav p-2">
        <Offcanvas.Header closeButton className="bg-white rounded-3">
          <Offcanvas.Title>
            <div className="d-flex gap-2 align-items-center logo">
              <img src={logo} alt="logo" />
              <h1 className="fs-3 fw-bold">{isKannada ? 'ಸ್ಪೊರ್ಟಿ' : 'SPORTI'}</h1>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            <li><Link to="/" onClick={handleClose}>{isKannada ? 'ಮನೆ' : 'Home'}</Link></li>
            {/* {isAuthenticated && (
              <> */}
                <li><Link to="/about" onClick={handleClose}>{isKannada ? 'ನಮ್ಮ ಬಗ್ಗೆ' : 'About Us'}</Link></li>
                <li><Link to="/services/sporti1" onClick={handleClose}>{isKannada ? 'ಸ್ಪೊರ್ಟಿ-1' : 'SPORTI-1'}</Link></li>
                <li><Link to="/services/sporti2" onClick={handleClose}>{isKannada ? 'ಸ್ಪೊರ್ಟಿ-2' : 'SPORTI-2'}</Link></li>
                <li><Link to="/events&gallery" onClick={handleClose}>{isKannada ? 'ಘಟನೆಗಳು & ಚಿತ್ರಶಾಲೆ' : 'Events & Gallery'}</Link></li>
                <li><Link to="/faqs" onClick={handleClose}>{isKannada ? 'ಪ್ರಶ್ನೆಗಳು' : "FAQ's"}</Link></li>
                <li className="nav-item dropdown text-start">
                  <Link className="nav-link dropdown-toggle m-0" to="#" id="navbarDropdownServices2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {isKannada ? 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Contact us'}
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownServices2">
                    <li><Link className="dropdown-item text-dark" to="/contact/sporti1" onClick={handleClose}>{isKannada ? 'ಸ್ಪೊರ್ಟಿ-1' : 'SPORTI-1'}</Link></li>
                    <li><Link className="dropdown-item text-dark" to="/contact/sporti2" onClick={handleClose}>{isKannada ? 'ಸ್ಪೊರ್ಟಿ-2' : 'SPORTI-2'}</Link></li>
                  </ul>
                </li>
              {/* </> */}
            {/* )} */}

            {/* {!isAuthenticated ? (
              <li><Link to="/login" className='btn btn-light' onClick={handleClose}>{isKannada ? 'ಲಾಗಿನ್' : 'Login'}</Link></li>
            ):(<button className="btn btn-danger w-100" onClick={logout}>Logout</button> )} */}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

       <Modal show={loginshow} onHide={closeModal} centered className='modal-dialog-centered p-1' size="sm">
            <Modal.Header className="text-center justify-content-center">
              {/* <Modal.Title>{isKannada?'ಸ್ಪೋರ್ಟಿ - ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳ ತರಬೇತಿ ಮತ್ತು ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ':'SPORTI - Senior Police Officers Research and Training Institute'}</Modal.Title>   */}
              <Modal.Title className="text-dark text-center fs-6">LOGIN</Modal.Title>
            </Modal.Header>
            <hr />
            <Modal.Body className='d-flex flex-wrap gap-2 p-2'>
              <a href='/login' className="blue-btn">Member</a>
              <a href='/guest/login' className="blue-btn">non Member</a>
            </Modal.Body>
      
          </Modal>
    </header>
  );
}

export default Header;
