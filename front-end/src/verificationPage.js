import React from 'react';
import './verificationPage.css';

const VerificationPage = () => {
  return (
    <div className="verification-container">
      <header className="verification-header">
        <img src="logo.png" alt="Peoples University of Medical & Health Sciences for Women" />
        <h1>Peoples University of Medical & Health Sciences for Women</h1>
        <button className="logout-button">LOG OUT</button>
      </header>
      <main className="main-content">
        <h2>OFFICE OF THE REGISTRAR</h2>
        <div className="student-info">
          <div className="info-block">
            <label>Student's Name</label>
            <div className="info-value">SYED BASIT ALI</div>
          </div>
          <div className="info-block">
            <label>Father's Name</label>
            <div className="info-value">SYED ASIF ALI</div>
          </div>
          <div className="info-block">
            <label>Program</label>
            <div className="info-value">BSCS</div>
          </div>
          <div className="info-block">
            <label>Specialization</label>
            <div className="info-value">XXXX</div>
          </div>
          <div className="info-block">
            <label>Admission Year</label>
            <div className="info-value">SPRING 2016</div>
          </div>
          <div className="info-block">
            <label>Graduation Year</label>
            <div className="info-value">FALL 2020</div>
          </div>
          <div className="info-block">
            <label>Degree Issued On</label>
            <div className="info-value">01/10/2021</div>
          </div>
          <div className="info-block">
            <label>Degree Serial No.</label>
            <div className="info-value">XXXX</div>
          </div>
          <div className="info-block">
            <label>Student Registration No.</label>
            <div className="info-value">XXXX</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerificationPage;
