import React, { useState } from 'react';
import './signup.css';

const BACKEND_URL = 'http://localhost:5002';

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
    fetch(`${BACKEND_URL}/api/signup`, { // replace '/api/signup' with your actual signup API endpoint
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
      <h2>PUMHSW ADMISSION PORTAL</h2>
      <h3>PUMHSW Admission Portal for DPT, PHARM-D, BSPH, BS NURSING</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="13-Digit CNIC (without dashes)" value={cnic} onChange={(e) => setCnic(e.target.value)} />
        <input type="text" placeholder="11-Digit Mobile # 03XXXXXXXXX" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password (6+ characters)" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
};

export default Signup;
