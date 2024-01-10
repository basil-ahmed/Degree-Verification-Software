import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { QrReader } from 'react-qr-reader'; // Import QrReader
import './home.css';

const Home = () => {

  const navigate = useNavigate(); // Get the navigate function
  const [showScanner, setShowScanner] = useState(false); // State to toggle QR scanner
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    return () => {
      setIsScanning(false);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    navigate('/'); // Redirect the user to the login page
  };

  const handleScan = data => {
    if (data) {
      console.log('QR code data:', data);
      setIsScanning(false);
      setShowScanner(false); // Hide scanner after successful scan
    }
  };

  const handleError = err => {
    console.error(err);
    setIsScanning(false);
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
          <button type="button" onClick={() => { 
            setShowScanner(true); 
            setTimeout(() => setIsScanning(true), 1000); // Add a delay before setting isScanning to true
          }}>Scan QR Code</button>
          {showScanner && isScanning && ( // Show QR scanner when showScanner is true
          <QrReader
            delay={300}
            onError={handleError}
            onResult={handleScan}
            style={{ width: '100%' }}
          />
        )}
        </form>
      </main>
    </div>
  );
};

export default Home;
