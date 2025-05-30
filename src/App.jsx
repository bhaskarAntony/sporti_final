import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { useLanguage } from './context/LangaugeContext';
import Header1 from './components/Header/Header';
import { TranslationHOC } from './helpers/TranslationHOC';
import Home from './pages/Home/Home';
import FoodCart from './pages/food/FoodCart';
import MainRoomBook from './pages/Rooms/MainRoomBook';
import RoomView from './pages/Rooms/RoomView';
import Event from './pages/Events/Event';
import About from './pages/about/About';
import LiveStream from './pages/Events/LiveStream';
import Faqs from './pages/faqs/Faqs';
import Help from './pages/Help/Help';
import Gallery from './pages/gallery/Gallery';
import Events from './components/events/Events';
import SiteMap from './pages/sitemap/SiteMap';
import Contact from './pages/contact/Contact';
import Tems_and_conditions from './pages/terms/Tems_and_conditions';
import Privacy from './pages/privacy/Privacy';
import EventView from './pages/Events/EventView';
import ViewFood from './pages/food/ViewFood';
import Login from './pages/Login';
import Registration from './pages/registration/Registration';
import AdditionalDetailsForm from './pages/membership/AdditionalDetailsForm';
import Admin from './pages/membership/Admin';
import View from './pages/view/View';
import Payment from './pages/payment/Payment';
import ServiceBook from './pages/Booking/ServiceBook';
import Services from './pages/services/Services';
import ErrorPage from './pages/notFound/ErrorPage';
import Footer from './components/footer/Footer';
// import ProtectedRoute from './components/ProtectedRoute';
import FontSizeChanger from 'react-font-size-changer';
import ScrollToTop from './components/ScrollToTop';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from './context/AuthContext';
import Cookies from 'js-cookie';
import Security from './components/security/Security';
import Confirm from './pages/Booking/Confirm';
import ConfirmRoom from './pages/Rooms/ConfirmRoom';
import AdminApp from './admin/App';
import Feedback from './admin/pages/feedback/Feedback';
import Login1 from './admin/components/login/Login';
import Header from './admin/components/appbar/PrimarySearchAppBar';
import VideoView from './admin/components/videos/VideoView';
import RedirectPayment from './pages/payment/RedirectPayment';
import ProtectedRoute from './components/ProtectedRoute';
import EditProfile from './pages/profile/EditProfile';
import RecentBookings from './pages/profile/RecentBookings';
import EditBooking from './pages/profile/EditBooking';
import CreateMember from './admin/pages/membership/CreateMember';
import PrevBookings from './pages/profile/PrevBookings';
import BookingHistory from './pages/profile/BookingHistory';
import ViewRoom from './pages/profile/ViewRoom';
import { ToastContainer } from 'react-toastify';
import NoFound from './NoFound';
import Dashboard from './pages/member/Dashboard';
import BookRoom from './pages/member/BookRoom';
import BookService from './pages/member/BookService';
import MyBookings from './pages/member/MyBookings';
import MyGuests from './pages/member/MyGuests';
import ConfirmBooking from './pages/member/ConfirmBooking';
import GuestLogin from './pages/GuestLogin.jsx';
import Profile from './pages/member/Profile';
import AdminRoute from './context/AdminRoute';
import AdminDashboard from './pages/admin/Dashboard';
import ManageMembers from './pages/admin/ManageMembers';
import ManageBookings from './pages/admin/ManageBookings';
import ManageRooms from './pages/admin/ManageRooms';
import ManageServices from './pages/admin/ManageServices';
import ManageGuests from './pages/admin/ManageGuests';
import Reports from './pages/admin/Reports';
import AuthContext from './context/AuthContext.jsx';
import { Navbar, Container, Nav, NavDropdown, Offcanvas, Button } from 'react-bootstrap';
import { Calendar, HomeIcon, LogOut, Settings, User, UserCircle } from 'lucide-react';
import BookingDetails from './pages/member/BookingDetails.jsx';
import GuestBooking from './pages/member/GuestBooking.jsx';
import GuestConfirmBooking from './pages/Guest/GuestConfirmBooking.jsx';
import GuestBookRoom from './pages/Guest/GuestBookRoom.jsx';
import CheckBookingStatus from './pages/Guest/CheckBookingStatus.jsx';
import ManageNonMemberBookings from './pages/admin/NonMemberBookingManager.jsx';

function App() {
   const { isAuthenticated, handleLogout, user} = useContext(AuthContext);
  const location = useLocation();
  console.log(location);
  const locationChecker = (location) =>{
    console.log(location.includes('admin'));
    
    if(location.includes('admin')==true){
      return true;
    }else{
      return false;
    }
  }
  
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('fs-6');
  const [theme, setTheme] = useState('light');
  const { setIsKannada, isKannada } = useLanguage();
  const [fontSizeIndex, setFontSizeIndex] = useState(5);
  const [fontSizeClass, setFontSizeClass] = useState('fs-6');

  // useEffect(() => {
  //   // const token = Cookies.get('token');
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     validateToken(token).then(isValid => {
  //       if (isValid) {
  //         setIsAuthenticated(true);
  //       }
  //     });
  //   }
  // }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.fontSize = fontSize;
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const highContrastClass = isHighContrast ? 'high-contrast' : '';

  const fontSizeClasses = [
    'fs-1', 'fs-2', 'fs-3', 'fs-4', 'fs-5', 'fs-6', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'display-1', 'display-2', 'display-3', 'display-4', 'display-5', 'display-6'
  ];

  useEffect(() => {
    setFontSizeClass(fontSizeClasses[fontSizeIndex]);
  }, [fontSizeIndex]);

  const increaseFontSize = () => {
    if (fontSizeIndex > 0) {
      setFontSizeIndex(prevIndex => prevIndex - 1);
    }
  };

  const decreaseFontSize = () => {
    if (fontSizeIndex < fontSizeClasses.length - 1) {
      setFontSizeIndex(prevIndex => prevIndex + 1);
    }
  };

  // useEffect(()=>{
    
  // })

  return (
    <div className={`App user-sporti overflow-hidden ${highContrastClass} ${fontSizeClass}`}>
      {/* <Security/> */}
      {
         location.pathname.includes('admin')?(
          null
         ):(
          <div className='d-flex justify-content-between gap-2 p-1 align-items-center'>
         
          {/* <div className='d-flex gap-3 align-items-center'>
              <button className='btn btn-light rounded-1 btn-sm' onClick={() => setIsKannada(!isKannada)}>
                  {isKannada ? 'ಇಂಗ್ಲೀಷ್' : 'Kannada'}
              </button>
              <button className="btn btn-light btn-sm rounded-1" onClick={() => setIsHighContrast(!isHighContrast)}>
                  {isKannada?(isHighContrast ? 'ಹೆಚ್ಚಿನ ಕಾನ್ಟ್ರಾಸ್ಟ್ ಇಲ್ಲ' : 'ಹೆಚ್ಚಿನ ಕಾನ್ಟ್ರಾಸ್ಟ್'):(isHighContrast ? 'No Contrast' : 'High Contrast')}
              </button>
              <FontSizeChanger
                  targets={['.content', '.content p', '.content h1', '.content h2', '.content h3', '.content h4', '.content h5', '.content h6', '.content span', '.content .f6']}
                  options={{
                      stepSize: 1,
                      range: 3
                  }}
                  customButtons={{
                      up: <button className="fbtn border-0 rounded" onClick={increaseFontSize}>A+</button>,
                      down: <button className="fbtn border-0 rounded" onClick={decreaseFontSize}>A-</button>,
                      style: {
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: 'black',
                          WebkitBoxSizing: 'border-box',
                          WebkitBorderRadius: '5px',
                          width: '30px'
                      },
                      buttonsMargin: 10
                  }}
              />
          </div> */}
        {/* <div className='d-flex align-items-center pannel'>
       
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
                       <NavDropdown.Item onClick={handleLogout}>
                         <LogOut size={16} className="me-2" />
                         Logout
                       </NavDropdown.Item>
                     </NavDropdown>
                   </>
                 ) : (
                   <div className='d-flex gap-2'>
                     <Nav.Link as={Link} to="/login">
                       <Button variant="outline-light" className='btn-sm'>Member Login</Button>
                     </Nav.Link>
                     <Nav.Link as={Link} to="/guest/login">
                       <Button variant="light" className='btn-sm'>Non Member Login</Button>
                     </Nav.Link>
                   </div>
                 )}
        </div> */}

      </div>
         )
      }
     
      <TranslationHOC>
        <ScrollToTop />
        
       {
        
        location.pathname.includes('admin')?(
        null
        ):(
          // <Header/>
          <Header1 toggleTheme={toggleTheme} theme={theme} />
        )
       }
        <ToastContainer/>
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Registration />} />
          <Route path='/event' element={<Event />} />
            <Route path='/about' element={<About />} />
            <Route path='/stream' element={<LiveStream />} />
            <Route path='/faqs' element={<Faqs />} />
            <Route path='/help' element={<Help />} />
            <Route path='/gallery/:id' element={<Gallery />} />
            <Route path='/events&gallery' element={<Events />} />
            <Route path='/site_map' element={<SiteMap />} />
            <Route path='/contact/:sporti' element={<Contact />} />
            <Route path='/terms_and-conditions' element={<Tems_and_conditions />} />
            <Route path='/privacy_policy' element={<Privacy />} />

            <Route path='/services/:sporti' element={<Services />} />
            <Route path='/payment/:applicationNo' element={<Payment />} />

            <Route path='/room/:sporti' element={<MainRoomBook />} /> 
            {/* <Route path='/services/book/:sporti' element={<PrivateRoute><ServiceBook /></PrivateRoute> } /> */}

            <Route path='/eventView/:id' element={<EventView />} />
            <Route path='/confirm/details' element={<Confirm />} />
            <Route path='/confirm/room/details' element={<ConfirmRoom />} />
            <Route path='/view/video/:sporti' element={<VideoView />} />
            <Route path='/payment/success/:applicationNo' element={<RedirectPayment />} />
            <Route path='/edit/profile' element={<EditProfile />} />
            <Route path='/recent/bookings' element={<RecentBookings />} />
            <Route path='/previous/bookings' element={<PrevBookings />} />
            <Route path='/history' element={<BookingHistory />} />
            <Route path='/edit/booking/:id' element={<EditBooking />} />
            <Route path='/view/details' element={<ViewRoom />} />
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/guest/login' element={<GuestLogin/>}/>
          {/* </Route> 


           


           

          {/* <Route element={<ProtectedRoute />}>
            <Route path='/cart' element={<FoodCart />} />
          
            <Route path='/roomview/:id/:sportiId' element={<RoomView />} />
            
            <Route path='/food/order/:id' element={<ViewFood />} />
            <Route path='/additional-details/:id' element={<AdditionalDetailsForm />} />
            <Route path='/admin/:id' element={<Admin />} />
            <Route path='/view/:id' element={<View />} />
          </Route> */}
          <Route path='/*' element={<ErrorPage />} />
         
         {/* <Route element={<ProtectedRoute/>}>
        
         </Route> */}
         {/* <Route path='/admin/*' element={<AdminApp />} /> */}
          <Route path='/admin/feedback' element={<Feedback/>} />
          {/* <Route path='/create/membership' element={<CreateMember/>}/> */}
          <Route path='/admin/login' element={<Login1/>} />

          <Route path="/guest-login" element={<GuestLogin />} />

{/* Member Routes */}
<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
<Route path="/book-room" element={<ProtectedRoute><BookRoom /></ProtectedRoute>} />
<Route path="/book-service" element={<ProtectedRoute><BookService /></ProtectedRoute>} />
<Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
<Route path="/booking/:id" element={<BookingDetails />} />
<Route path="/guest-booking" element={<ProtectedRoute><GuestBooking /></ProtectedRoute>} />
<Route path="/my-guests" element={<ProtectedRoute><MyGuests /></ProtectedRoute>} />
<Route path="/confirm-booking" element={<ProtectedRoute><ConfirmBooking /></ProtectedRoute>} />
<Route path="/guest/book-room" element={<GuestBookRoom/>}/>
<Route path="/guest/confirm-booking" element={<GuestConfirmBooking />} />
<Route path="/guest/booking/status" element={<CheckBookingStatus />} />


 {/* Admin Routes */}
 <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/members" element={<AdminRoute><ManageMembers /></AdminRoute>} />
                <Route path="/admin/bookings" element={<AdminRoute><ManageBookings /></AdminRoute>} />
                <Route path="/admin/rooms" element={<AdminRoute><ManageRooms /></AdminRoute>} />
                <Route path="/admin/services" element={<AdminRoute><ManageServices /></AdminRoute>} />
                <Route path="/admin/guests" element={<AdminRoute><ManageGuests /></AdminRoute>} />
                <Route path="/admin/reports" element={<Reports />} />
                <Route path="/admin/guest/bookings" element={<ManageNonMemberBookings />} />

           
     {/* <Route path='/' element={<Dashbo/>}/> */}
     
        </Routes>
        <marquee behavior="scroll" direction="left" scrollamount="10" className='d-block p-1 text-white bg-danger'>
        {
            isKannada?(<span><b>ಹಕ್ಕು ನಿರಾಕರಣೆ:</b> ಕರ್ನಾಟಕದ ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳಿಗೆ ಮಾತ್ರ ಸ್ಪೋರ್ಟಿ ಈವೆಂಟ್‌ಗಳನ್ನು ಪ್ರವೇಶಿಸಬಹುದು</span>):(
              <span><b>Disclaimer:</b> SPORTI events accessible for Senior Police Officers  of Karnataka only</span>
            )
          }
          </marquee>
        <Footer />
     
      </TranslationHOC>
    </div>
  );
}

export default App;
