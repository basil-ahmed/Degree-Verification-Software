# Degree Verification Software

## Overview
Welcome to the Degree Verification Software created using MERN (MongoDB, Express.js, React, Node.js) stack technology. This application provides a seamless process for verifying degree details of students at Peoples University of Medical & Health Sciences for Women (PUMHSW).

## Login Page
![Login Page](/screenshots/login.png)

The login page allows authorized users to access the system securely. Users need to input their CNIC (13 digits) and password to log in. Upon successful authentication, the user is redirected to the home page.

### Features:
- Secure user authentication
- Informative left-side panel with university logo and details
- Clear error messages in case of login failure
- Easy navigation to the signup page for new users

## Signup Page
![Signup Page](/screenshots/signup.png)

New users can register using the signup page. The registration form collects essential details such as username, CNIC, mobile number, email, password, and confirms the password. The system ensures that all fields are filled correctly and passwords match.

### Features:
- User-friendly registration form
- Real-time input validation
- Immediate feedback on successful registration or failure

## Home Page
![Home Page](/screenshots/home.png)

The home page serves as the central hub for degree verification. Users can input the degree serial number and student registration number manually or use the QR code scanner for efficient data input. Upon successful verification, users are redirected to the verification page.

### Features:
- QR code scanner for quick data input
- User-friendly input fields with real-time validation
- Clear error messages in case of verification failure

## Verified Page
![Verified Page](/screenshots/verified.png)

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

## How to Run
1. Clone the repository: `git clone https://github.com/your_username/degree-verification-software.git`
2. Navigate to the project folder: `cd degree-verification-software`
3. Install dependencies: `npm install`
4. Run the application: `npm start`
5. Access the application in your browser: `http://localhost:3000`

Feel free to explore and enhance the Degree Verification Software for a seamless and secure user experience!
