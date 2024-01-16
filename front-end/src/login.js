import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// require("dotenv").config({ silent: true })
import './login.css';

const BACKEND_URL = "https://degree-verification-software-server.vercel.app";

const Login = () => {

 const navigate = useNavigate(); // Get the navigate function
 
 const [cnic, setCnic] = useState('');
 const [password, setPassword] = useState('');

//  const handleSubmit = (e) => {
//   e.preventDefault();

//   // Create user object
//   const user = {
//     cnic,
//     password
//   };

//   // Send user data to your backend
//   fetch(`${BACKEND_URL}/api/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   })
//   .then(response => response.json())
//   .then(data => {
//     if (data.success) {
//       // Save the JWT to local storage
//       localStorage.setItem('token', data.token);
//       // Redirect the user to the home page
//       window.location.href = '/home';
//     } else {
//       alert(data.message);
//     }
//   });
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Create user object
    const user = {
      cnic,
      password,
    };

    const response = await fetch(`${BACKEND_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    if (data.success) {
      // Save the JWT to local storage
      localStorage.setItem('token', data.token);
       // Navigate to the verification page and pass the degree data to it
       navigate('/home', { state: { user: data.user } });
    } else {
      alert(data.message);
    }
  } catch (error) {
    // Show an error message
    console.error(error);
    // Handle the error as needed
  }
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