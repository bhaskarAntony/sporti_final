import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';  // Ensure AOS (Animate On Scroll) is included if used

import { AuthProvider } from './context/AuthContext';  // Import AuthProvider
import { DialogProvider } from './components/popups/DialogContext';  // Import DialogProvider
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import { LanguageProvider } from './context/LangaugeContext';  // Import LanguageProvider
import { AuthProviderAdmin } from './admin/components/privateRoutes/AuthContext';
import { BookingProvider } from './admin/components/hooks/BookingContext';
import { AlertProvider } from './context/AlertContext.jsx';
import { AllAuthProvider } from './context/AuthContext.jsx';
import { GuestAuthProvider } from './context/GuestAuthContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));




root.render(
      <BrowserRouter>
    <AlertProvider>
      <AllAuthProvider>
      <AuthProvider>
  <GuestAuthProvider>
    
<AuthProviderAdmin>
<BookingProvider>
<DialogProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </DialogProvider>
</BookingProvider>
</AuthProviderAdmin>
  </GuestAuthProvider>
</AuthProvider>
      </AllAuthProvider>
    </AlertProvider>

      </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
