![Vercel](https://vercelbadge.vercel.app/api/basil-ahmed/Degree-Verification-Software)
[![Deployed](https://img.shields.io/badge/Deployed-Live-brightgreen.svg)]([http://128.199.12.71/](https://degree-verification-software.vercel.app/))

# Degree Verification Software

## Overview
Welcome to the Degree Verification Software created using MERN (MongoDB, Express.js, React, Node.js) stack technology. This application provides a seamless process for verifying degree details of students at Peoples University of Medical & Health Sciences for Women (PUMHSW).

## Login Page
<img width="800" alt="Screenshot 2024-01-12 at 2 37 38 AM" src="https://github.com/basil-ahmed/Degree-Verification-Software/assets/90772853/644ac155-50fe-4705-9419-7f516ff29f65">

The login page allows authorized users to access the system securely. Users need to input their CNIC (13 digits) and password to log in. Upon successful authentication, the user is redirected to the home page.

### Features:
- Secure user authentication
- Informative left-side panel with university logo and details
- Clear error messages in case of login failure
- Easy navigation to the signup page for new users
- JWT Tokens for Authorized sessions
- Protected Routes

## Signup Page
<img width="800" alt="Screenshot 2024-01-12 at 2 38 49 AM" src="https://github.com/basil-ahmed/Degree-Verification-Software/assets/90772853/0b8ef5e1-c100-47a8-a192-a7302fdd3f4f">


New users can register using the signup page. The registration form collects essential details such as username, CNIC, mobile number, email, password, and confirms the password. The system ensures that all fields are filled correctly and passwords match.

### Features:
- User-friendly registration form
- Real-time input validation
- Immediate feedback on successful registration or failure

## Home Page

<img width="800" alt="Screenshot 2024-01-12 at 2 40 22 AM" src="https://github.com/basil-ahmed/Degree-Verification-Software/assets/90772853/cad5cc69-38af-48bb-8773-35ff8bfa5f1b">

The home page serves as the central hub for degree verification. Users can input the degree serial number and student registration number manually or use the QR code scanner for efficient data input. Upon successful verification, users are redirected to the verification page.

### Features:
- QR code scanner for quick data input
- User-friendly input fields with real-time validation
- Clear error messages in case of verification failure

## Verified Page

<img width="800" alt="Image" src="https://github.com/basil-ahmed/Degree-Verification-Software/assets/90772853/ca32ff27-8fa1-46bd-9522-83f4f93118d4">

Upon successful verification, users are redirected to the verified page, showcasing the detailed degree information. The page displays key details such as student name, father's name, program, specialization, admission year, graduation year, degree issued date, degree serial number, and student registration number.

### Features:
- Detailed presentation of verified degree information
- Logout option to secure user sessions
- Visually appealing layout with university branding

## Technologies Used
- MongoDB: Database to store user and degree information
- Express.js: Web application framework for the backend
- React: Frontend library for building user interfaces
- Node.js: JavaScript runtime for the server
- JWT Tokens & Passport.js: For Authentication
- HTML5, CSS3: Markup and styling for web pages
- HTML5 QR Code Scanner: Library for scanning QR codes in the browser
- Vercel Continuous Integration
- Vercel Web Analytics

## How to Run
1. Clone the repository: `git clone https://github.com/your_username/degree-verification-software.git`
2. Navigate to the project folder: `cd degree-verification-software`
3. Install dependencies: `npm install`
4. Run the application: `npm start`
5. Access the application in your browser: `http://localhost:3000`

Feel free to explore and enhance the Degree Verification Software for a seamless and secure user experience!

## Demo:
![website](https://github.com/basil-ahmed/Degree-Verification-Software/assets/90772853/a4c6440a-9ee1-4e4f-a840-212aaf086d14)
