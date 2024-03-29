import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Home from './home';
import VerificationPage from './verificationPage';
import Report from './report';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from "@vercel/speed-insights"
 
inject();
injectSpeedInsights();

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Update this to your actual authentication check

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Add more routes as needed */}

        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />

        <Route path="/verificationPage" element={isAuthenticated ? <VerificationPage /> : <Navigate to="/" />} />

        <Route path="/report" element={isAuthenticated ? <Report /> : <Navigate to="/" />} />

        {/* Add a catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </Router>
  );
};

export default App;