const mongoose = require('mongoose');
const { degreeSchema } = require('./Degree');

const reportSchema = new mongoose.Schema({
    username: String,
    cnic: { type: String, unique: true },
    mobile: { type: String, unique: true },
    email: { type: String, unique: true },
    verifiedDegrees: [degreeSchema]
});

const Report = mongoose.model('Report', reportSchema);

module.exports = {
    Report,
}