import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
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

    const handleHome = () => {
      navigate('/home');
    };

    const handleDegreeDropdownClick = () => {
      setDegreeDropdownOpen(!degreeDropdownOpen);
      if (selectedDegree === degree) {
        setSelectedDegree(null);
      }
    };
  
    const handleDegreeClick = (degree) => {
      if (selectedDegree === degree) {
        setSelectedDegree(null);
      } else {
        setSelectedDegree(degree);
      }
    };

    const dataSet = [
      [
        'Username',
        'CNIC',
        'Mobile',
        'Email',
        'Student Name',
        'Father Name',
        'Program',
        'Specialization',
        'Admission Year',
        'Graduation Year',
        'Degree Issued On',
        'Degree Serial No',
        'Student Registration No',
      ],
      ...report.verifiedDegrees.map((degree) => [
        report.username,
        report.cnic,
        report.mobile,
        report.email,
        degree.studentName,
        degree.fatherName,
        degree.program,
        degree.specialization,
        degree.admissionYear,
        degree.graduationYear,
        new Date(degree.degreeIssuedOn).toISOString().split('T')[0],
        degree.degreeSerialNo,
        degree.studentRegistrationNo,
      ]),
    ];

    const handleDownload = () => {
      const ws = XLSX.utils.aoa_to_sheet(dataSet);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      const buf = new ArrayBuffer(wbout.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;
      saveAs(new Blob([buf], { type: 'application/octet-stream' }), 'report.xlsx');
    };

  return (
    <div className="verification-container">
      <header className="verification-header">
        <img src="/logo.png" alt="Peoples University of Medical & Health Sciences for Women" />
        <h1>Peoples University of Medical & Health Sciences for Women</h1>
        <button className="report-button" onClick={handleHome}>HOME</button>
        <button className="report-logout-button" onClick={handleLogout}>LOG OUT</button>
      </header>
      <main className="report-main-content">
        <h2>User Report Generated ✅</h2>
        <div className="user-info">
          <div className="info-block">
            <label>User's Name</label>
            <div className="info-value">{report.username}</div>
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
          <div className="info-block" id="verified-degrees-drop-down" onClick={handleDegreeDropdownClick}>
          <label>Verified Degrees ⬇</label>
          <div className="info-value">
            {report.verifiedDegrees.length}
          </div>
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
        {selectedDegree && (
          <div className="selected-degree-info">
            <div>Student Name: {selectedDegree.studentName}</div>
            <div>Father's Name: {selectedDegree.fatherName}</div>
            <div>Program: {selectedDegree.program}</div>
            <div>Specialization: {selectedDegree.specialization}</div>
            <div>Admission Year: {selectedDegree.admissionYear}</div>
            <div>Graduation Year: {selectedDegree.graduationYear}</div>
            <div>Degree Issued On: {new Date(selectedDegree.degreeIssuedOn).toISOString().split('T')[0]}</div>
            <div>Degree Serial No: {selectedDegree.degreeSerialNo}</div>
            <div>Student Registration No: {selectedDegree.studentRegistrationNo}</div>
          </div>
        )}
        </div>
      </main>
      <button className='download-button' onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Report;