// require("dotenv").config({ silent: true });
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate
import {Html5QrcodeScanner} from 'html5-qrcode'; // Import QR scanner
import './home.css';

const BACKEND_URL = "https://degree-verification-software-server.vercel.app";

const Home = () => {

  const navigate = useNavigate(); // Get the navigate function
  const location = useLocation();
  const [scanResult, setScanResult] = useState(null); // State to store scan results
  const [degreeSerialNo, setDegreeSerialNo] = useState("");
  const [studentRegistrationNo, setstudentRegistrationNo] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const verifyButtonRef = useRef(null);

  const cnic = location.state.user.cnic;

  useEffect(() => {

    const scanner = new Html5QrcodeScanner('reader',
    { qrbox: {
      width: 500,
      height: 500
    },
    fps: 5});

    scanner.render(onScanSuccess, onScanFailure);

    function onScanSuccess(qrCodeMessage) {
      const lines = qrCodeMessage.split('\n');
      if (lines.length >= 2) {
        setDegreeSerialNo(lines[0]);
        setstudentRegistrationNo(lines[1]);
      }
      scanner.clear();
    }

    function onScanFailure(error) {
      // handle scan failure, usually better to ignore and keep scanning.
      console.warn(`QR error = ${error}`);
      // scanner.clear();
    }

    // Change the background color when the component mounts
    document.body.style.background = `url('/bg2.jpeg')`;
    // document.body.style.background = "#f9f9f9";
 
    // Cleanup function
  return () => {
    scanner.clear();
    document.body.style.background = null;
  };

  }, []);

  useEffect(() => {
    if (verifyButtonRef.current) {
      verifyButtonRef.current.click();
    }
  }, [degreeSerialNo, studentRegistrationNo]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    navigate('/'); // Redirect the user to the login page
  };

  const handleReport = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/api/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cnic }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate report');
      }
  
      // Navigate to the verification page and pass the degree data to it
      navigate('/report', { state: { report: data.report } });
    } catch (error) {
      // Show an error message
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${BACKEND_URL}/api/verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ degreeSerialNo, studentRegistrationNo }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify degree');
      }
  
      // Navigate to the verification page and pass the degree data to it
      navigate('/verificationPage', { state: { degree: data.degree } });
    } catch (error) {
      // Show an error message
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <img src="/logo.png" alt="Peoples University of Medical & Health Sciences for Women" />
        <h1>Peoples University of Medical & Health Sciences for Women</h1>
        <button className="report-button" onClick={handleReport}>GET REPORT</button>
        <button className="logout-button" onClick={handleLogout}>LOG OUT</button>
      </header>
      <main className="main-content">
        <h2>OFFICE OF THE REGISTRAR</h2>
        <form onSubmit={handleVerify}>
          <div className="input-group">
            <label htmlFor="degreeSerialNo">Degree Serial No:</label>
            <input id="degreeSerialNo" type="text" className='inputBox' placeholder="Enter Serial No Here" required value={degreeSerialNo} onChange={e => setDegreeSerialNo(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="studentRegistrationNo">Student Reg No:</label>
            <input id="studentRegistrationNo" className='inputBox' type="text" placeholder="Enter Student Reg No Here" required value={studentRegistrationNo} onChange={e => setstudentRegistrationNo(e.target.value)} />
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          <button ref={verifyButtonRef} type="submit" className="verify-button">Verify</button>
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
