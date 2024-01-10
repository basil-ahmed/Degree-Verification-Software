import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './verificationPage.css';

const VerificationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const degree = location.state.degree;

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
      <main className="verification-main-content">
        <h2>VERIFIED DEGREE DETAILS ✅</h2>
        <div className="student-info">
          <div className="info-block">
            <label>Student's Name</label>
            <div className="info-value">{degree.studentName}</div>
          </div>
          <div className="info-block">
            <label>Father's Name</label>
            <div className="info-value">{degree.fatherName}</div>
          </div>
          <div className="info-block">
            <label>Program</label>
            <div className="info-value">{degree.program}</div>
          </div>
          <div className="info-block">
            <label>Specialization</label>
            <div className="info-value">{degree.specialization}</div>
          </div>
          <div className="info-block">
            <label>Admission Year</label>
            <div className="info-value">{degree.admissionYear}</div>
          </div>
          <div className="info-block">
            <label>Graduation Year</label>
            <div className="info-value">{degree.graduationYear}</div>
          </div>
          <div className="info-block">
            <label>Degree Issued On</label>
            <div className="info-value"> {new Date(degree.degreeIssuedOn).toLocaleDateString()}</div>
          </div>
          <div className="info-block">
            <label>Degree Serial No.</label>
            <div className="info-value">{degree.degreeSerialNo}</div>
          </div>
          <div className="info-block">
            <label>Student Registration No.</label>
            <div className="info-value">{degree.studentRegistrationNo}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerificationPage;
