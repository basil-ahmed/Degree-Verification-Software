import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './report.css';

const Report = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const report = location.state.report;

    const [degreeDropdownOpen, setDegreeDropdownOpen] = useState(false);
    const [selectedDegree, setSelectedDegree] = useState(null);

    console.log(report);

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
        // Clear the report data
        location.state.report = null;
    };

    const handleDegreeDropdownClick = () => {
      setDegreeDropdownOpen(!degreeDropdownOpen);
    };
  
    const handleDegreeClick = (degree) => {
      setSelectedDegree(degree);
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
            <div className="info-value">{report.name}</div>
          </div>
          <div className="info-block">
            <label>User's CNIC</label>
            <div className="info-value">{report.cnic}</div>
          </div>
          <div className="info-block">
            <label>User's Email</label>
            <div className="info-value">{report.email}</div>
          </div>
          <div className="info-block">
            <label>User's Mobile</label>
            <div className="info-value">{report.mobile}</div>
          </div>
          <div className="info-block">
          <label>Verified Degrees</label>
          <div className="info-value" onClick={handleDegreeDropdownClick}>
            {report.verifiedDegrees.length}
          </div>
          {degreeDropdownOpen && (
            <div className="degree-dropdown">
              {report.verifiedDegrees.map((degree, index) => (
                <div key={index} onClick={() => handleDegreeClick(degree)}>
                  {degree.studentName}
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedDegree && (
          <div className="selected-degree-info">
            <div>Student Name: {selectedDegree.studentName}</div>
            <div>Father's Name: {selectedDegree.fatherName}</div>
            <div>Program: {selectedDegree.program}</div>
            <div>Specialization: {selectedDegree.specialization}</div>
            <div>Admission Year: {selectedDegree.admissionYear}</div>
            <div>Graduation Year: {selectedDegree.graduationYear}</div>
            <div>Degree Issued On: {selectedDegree.degreeIssuedOn}</div>
            <div>Degree Serial No: {selectedDegree.degreeSerialNo}</div>
            <div>Student Registration No: {selectedDegree.studentRegistrationNo}</div>
          </div>
        )}
        </div>
      </main>
    </div>
  );
};

export default Report;