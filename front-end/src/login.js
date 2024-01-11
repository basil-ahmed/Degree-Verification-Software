import React, { useState } from 'react';
// require("dotenv").config({ silent: true })
import './login.css';

const BACKEND_URL = "https://degree-verification-software-server.vercel.app/";

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
  <div className="login-container" style={{ display: 'flex' }}>
    <div className="left-side" style={{ flex: 1 }}>
      <img src="/logo.png" alt="Peoples University of Medical & Health Sciences for Women" />
      <h2>PUMHSW DEGREE VERIFICATION PORTAL</h2>
      <h3 className='login-desc'>PUMHSW Admission Portal for DPT, PHARM-D, BSPH, BS NURSING</h3>
    </div>
    <div className="right-side" style={{ flex: 1 }}>
      <h3 className='login-heading'>LOGIN</h3>
      <form className='login-form' onSubmit={handleSubmit}>
        <label className='login-label'>
          CNIC:
        </label>
        <input type="text" className='login-input' placeholder="13-Digit (without dashes)" value={cnic} onChange={(e) => setCnic(e.target.value)} />
        <label className='login-label'>
          Password:
        </label>
        <input type="password" className='login-input' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className='login-button'>Login</button>
      </form>
      <p>Dont't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  </div>
);
};

export default Login;