import React, { useState } from 'react';
import './login.css';

const BACKEND_URL = 'http://localhost:5002';

const Login = () => {
 const [cnic, setCnic] = useState('');
 const [password, setPassword] = useState('');

 const handleSubmit = (e) => {
  e.preventDefault();

  // Create user object
  const user = {
    cnic,
    password
  };

  // Send user data to your backend
  fetch(`${BACKEND_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Save the JWT to local storage
      localStorage.setItem('token', data.token);
      // Redirect the user to the home page
      window.location.href = '/home';
    } else {
      alert(data.message);
    }
  });
};

 return (
    <div className="login-container">
      <h2>PUMHSW ADMISSION PORTAL</h2>
      <h3>PUMHSW Admission Portal for DPT, PHARM-D, BSPH, BS NURSING</h3>
      <form className='login-form' 
      onSubmit={handleSubmit}>
        <label className='login-label'>
          CNIC:
          <input type="text" className='login-input' value={cnic} onChange={(e) => setCnic(e.target.value)} />
        </label>
        <label className='login-label'>
          Password:
          <input type="password" className='login-input' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" className='login-button'>Login</button>
      </form>
      <p>Dont't have an account? <a href="/signup">Sign Up</a></p>
    </div>
 );
};

export default Login;