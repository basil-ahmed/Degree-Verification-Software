import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './report.css';

const Report = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state.user;

    console.log(user);

    useEffect(() => {
      // Change the background color when the component mounts
      document.body.style.background = `url('/bg2.jpeg')`;
  
      // Reset the background color when the component unmounts
      return () => {
        document.body.style.background = null;
      };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
  

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        // Navigate to the home page
        navigate('/');
        // Clear the degree data
        location.state.degree = null;
      };

  return (
    <div className="verification-container">
      <header className="verification-header">
        <img src="/logo.png" alt="Peoples University of Medical & Health Sciences for Women" />
        <h1>Peoples University of Medical & Health Sciences for Women</h1>
        <button className="verify-logout-button" onClick={handleLogout}>LOG OUT</button>
      </header>
      <main className="report-main-content">
        <h2>User Report Generated ✅</h2>
        <div className="user-info">
          <div className="info-block">
            <label>User's Name</label>
            <div className="info-value">{user.name}</div>
          </div>
          <div className="info-block">
            <label>User's CNIC</label>
            <div className="info-value">{user.cnic}</div>
          </div>
          <div className="info-block">
            <label>User's Email</label>
            <div className="info-value">{user.email}</div>
          </div>
          <div className="info-block">
            <label>User's Mobile</label>
            <div className="info-value">{user.mobile}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;