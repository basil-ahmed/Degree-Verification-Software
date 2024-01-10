import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {Html5QrcodeScanner} from 'html5-qrcode'; // Import QR scanner
import './home.css';

const Home = () => {

  const navigate = useNavigate(); // Get the navigate function
  const [scanResult, setScanResult] = useState(null); // State to store scan results

  useEffect(() => {

    const scanner = new Html5QrcodeScanner('reader',
    { fps: 5, qrbox: {
      width: 250,
      height: 250
    } });

    scanner.render(onScanSuccess, onScanFailure);

    function onScanSuccess(qrCodeMessage) {
      scanner.clear();
      setScanResult(qrCodeMessage);
    }

    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      console.warn(`QR error = ${error}`);
      // scanner.clear();
    }

    // Cleanup function
  return () => {
    scanner.clear();
  };

  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    navigate('/'); // Redirect the user to the login page
  };

  const handleVerify = (e) => {
    e.preventDefault();
    // Verification logic here
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <img src="logo.png" alt="Peoples University of Medical & Health Sciences for Women" />
        <h1>Peoples University of Medical & Health Sciences for Women</h1>
        <button className="logout-button" onClick={handleLogout}>LOG OUT</button>
      </header>
      <main className="main-content">
        <h2>OFFICE OF THE REGISTRAR</h2>
        <form onSubmit={handleVerify}>
          <div className="input-group">
            <label htmlFor="degreeSerialNo">Degree Serial No:</label>
            <input id="degreeSerialNo" type="text" placeholder="Enter Serial No Here" />
          </div>
          <div className="input-group">
            <label htmlFor="studentRegNo">Student Reg No:</label>
            <input id="studentRegNo" type="text" placeholder="Enter Student Reg No Here" />
          </div>
          <button type="submit" className="verify-button">Verify</button>
          {/* <button type="button">Scan QR Code</button> */}
          { scanResult
            ? <div className="scan-result">{scanResult}</div>
            : <div id="reader"></div>
          }
         
        </form>
      </main>
    </div>
  );
};

export default Home;
