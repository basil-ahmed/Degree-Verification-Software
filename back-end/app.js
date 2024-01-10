require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require("express")
const cors = require("cors") // import cors module
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');

app.use(cors()) // use cors middleware

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
  const token = jwt.sign({ _id: user._id }, 'BASIL');
  res.json({ success: true, token });
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

app.use(expressJwt({ secret: 'BASIL', algorithms: ['HS256'] }).unless({ path: ['/api/login', '/api/signup'] }));

module.exports = app