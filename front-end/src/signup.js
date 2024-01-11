import React, { useState } from 'react';
// require("dotenv").config({ silent: true })
import './signup.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Signup = () => {
  const [username, setUsername] = useState('');
  const [cnic, setCnic] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if all fields are filled out
    if (!username || !cnic || !mobile || !email || !password || !confirmPassword) {
      alert("All fields are required!");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Check if CNIC is 13 numbers
    if (cnic.length !== 13 || isNaN(cnic)) {
      alert("CNIC must be 13 digits!");
      return;
    }

    // Check if mobile is 11 numbers
    if (mobile.length !== 11 || isNaN(mobile)) {
      alert("Mobile must be 11 digits!");
      return;
    }
  
    // Create user object
    const user = {
      username,
      cnic,
      mobile,
      email,
      password
    };
  
    // Send user data to your backend
    fetch(`${BACKEND_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Registration successful!");
      } else {
        alert("Registration failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="signup-container">
      <div className="left-side" style={{ flex: 1 }}>
      <img src="/logo.png" alt="Peoples University of Medical & Health Sciences for Women" />
      <h2>PUMHSW DEGREE VERIFICATION PORTAL</h2>
      <h3>PUMHSW Admission Portal for DPT, PHARM-D, BSPH, BS NURSING</h3>
    </div>
      <div className="right-side" style={{ flex: 1 }}>
        <form onSubmit={handleSubmit} className='submit-form'>
          <input type="text" placeholder="Username" className='signup-input' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="13-Digit CNIC (without dashes)" className='signup-input' value={cnic} onChange={(e) => setCnic(e.target.value)} />
          <input type="text" placeholder="11-Digit Mobile # 03XXXXXXXXX" className='signup-input' value={mobile} onChange={(e) => setMobile(e.target.value)} />
          <input type="email" placeholder="Email" className='signup-input' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password (6+ characters)" className='signup-input' value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" className='signup-input' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button type="submit" className='signup-button'>Register</button>
        </form>
        <p>Already have an account? <a href="/">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
