import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Home, 
  BookOpen, 
  UserCheck,
  FileText,
  Settings,
  LogOut
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <div className="bg-main text-white h-100 d-flex flex-column" style={{ Height: '100vh', overflow:'auto' }}>
      <div className="p-3 border-bottom border-secondary">
        <h4 className="mb-0 d-flex fs-5 align-items-center">
          <LayoutDashboard size={24} className="me-2" />
          Admin Portal
        </h4>
      </div>
      
      <Nav className="flex-column p-3 m-0 align-items-start">
        <Nav.Item>
          <Link 
            to="/admin" 
            className={`nav-link ${isActive('/admin') ? 'active' : ''} d-flex align-items-center`}
          >
            <Home size={18} className="me-2" />
            Dashboard
          </Link>
        </Nav.Item>
        
        <Nav.Item>
          <Link 
            to="/admin/members" 
            className={`nav-link ${isActive('/admin/members') ? 'active' : ''} d-flex align-items-center`}
          >
            <Users size={18} className="me-2" />
            Members
          </Link>
        </Nav.Item>
        
        <Nav.Item>
          <Link 
            to="/admin/bookings" 
            className={`nav-link ${isActive('/admin/bookings') ? 'active' : ''} d-flex align-items-center`}
          >
            <Calendar size={18} className="me-2" />
            Memebrs Bookings
          </Link>
        </Nav.Item>
         <Nav.Item>
          <Link 
            to="/admin/guest/bookings" 
            className={`nav-link ${isActive('/admin/guest/bookings') ? 'active' : ''} d-flex align-items-center`}
          >
            <Calendar size={18} className="me-2" />
            Non Members Bookings
          </Link>
        </Nav.Item>
        
        <Nav.Item>
          <Link 
            to="/admin/rooms" 
            className={`nav-link ${isActive('/admin/rooms') ? 'active' : ''} d-flex align-items-center`}
          >
            <Home size={18} className="me-2" />
            Rooms
          </Link>
        </Nav.Item>
        
        <Nav.Item>
          <Link 
            to="/admin/services" 
            className={`nav-link ${isActive('/admin/services') ? 'active' : ''} d-flex align-items-center`}
          >
            <BookOpen size={18} className="me-2" />
            Services
          </Link>
        </Nav.Item>
        
        {/* <Nav.Item>
          <Link 
            to="/admin/guests" 
            className={`nav-link ${isActive('/admin/guests') ? 'active' : ''} d-flex align-items-center`}
          >
            <UserCheck size={18} className="me-2" />
            Guests
          </Link>
        </Nav.Item> */}
        
        {/* <Nav.Item>
          <Link 
            to="/admin/reports" 
            className={`nav-link ${isActive('/admin/reports') ? 'active' : ''} d-flex align-items-center`}
          >
            <FileText size={18} className="me-2" />
            Reports
          </Link>
        </Nav.Item> */}
        
        <div className="border-top border-secondary my-3"></div>
        
        {/* <Nav.Item>
          <Link 
            to="/admin/settings" 
            className={`nav-link ${isActive('/admin/settings') ? 'active' : ''} d-flex align-items-center`}
          >
            <Settings size={18} className="me-2" />
            Settings
          </Link>
        </Nav.Item> */}
        
        <Nav.Item>
          <Link 
            to="/logout" 
            className="nav-link text-danger d-flex align-items-center"
          >
            <LogOut size={18} className="me-2" />
            Logout
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default AdminSidebar;