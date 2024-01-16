require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require("express")
const cors = require("cors") // import cors module
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

// Allow requests from the specified origin (replace 'http://your-react-app-url' with the actual URL)
const corsOptions = {
  origin: ['https://degree-verification-software.vercel.app', 'https://degree-verification-software-server.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// app.use(cors(corsOptions));

app.use(cors(corsOptions)) // use cors middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { User } = require('./models/User')
const { Degree } = require('./models/Degree')
const { Report } = require('./models/Report')

app.get("/", (req, res) => {
    res.send("Hello!")
})

app.post("/api/login", async (req, res) => {
  const { cnic, password } = req.body;

  // Find user with provided CNIC
  const user = await User.findOne({ cnic });
  if (!user || password !== user.password) {
    return res.status(400).json({ success: false, message: "Invalid CNIC or password." });
  }

  // User is authenticated, generate a JWT
  const token = jwt.sign({ _id: user._id }, 'BASIL', { expiresIn: '1h' });
  res.json({ success: true, token, user });
});

app.post("/api/signup", async (req, res) => {
    const user = new User(req.body);
  
    try {
      const savedUser = await user.save();
      res.json({ success: true, message: "Thanks for signing up!" });
    } catch (err) {
      console.log(err);
      if (err.code === 11000) {
        res.status(400).json({ success: false, message: "CNIC, Mobile or Email already exists." });
      } else {
        res.status(500).json({ success: false, message: "Error registering user." });
      }
    }
});

app.get("/api/home", (req, res) => {
    // User is authenticated, send home data
    res.json({ success: true, data: 'Home data' });
});

app.post("/api/verification", async (req, res) => {
    const { degreeSerialNo, studentRegistrationNo } = req.body;

    // Find degree with provided Degree Serial No and Student Registration No
    const degree = await Degree.findOne({ degreeSerialNo, studentRegistrationNo });
    if (!degree) {
      return res.status(400).json({ success: false, message: "Invalid Degree Serial No or Student Registration No." });
    }
  
    // Degree is found, return the degree
    res.json({ success: true, degree });
});

app.get("/api/report", async (req, res) => {
  const { cnic } = req.query;

  // Find Report with provided CNIC
  const report = await Report.findOne({ cnic });
  // const report = await Report.findOne({ user.username, user.cnic, user.mobile, user.email })
  if (!report) {
    return res.status(400).json({ success: false, message: "User hasn't verified any degrees" });
  }

  res.json({ success: true, report });
});

app.post("/api/report", async (req, res) => {

  const { username, cnic, mobile, email, verifiedDegrees } = req.body;
  
  try {
    // Check if a report for this user already exists
    let report = await Report.findOne({ cnic });

    if (report) {
      // If a report already exists, add the new degree to the verifiedDegrees array
      report.verifiedDegrees.push(...verifiedDegrees);
    } else {
      // If no report exists, create a new one
      report = new Report({
        username,
        cnic,
        mobile,
        email,
        verifiedDegrees,
      });
    }

    // Save the report
    await report.save();

    res.json({ success: true, report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.use(expressJwt({ secret: 'BASIL', algorithms: ['HS256'] }).unless({ path: ['/api/login', '/api/signup'] }));

module.exports = app