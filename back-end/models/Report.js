const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    username: String,
    cnic: { type: String, unique: true },
    mobile: { type: String, unique: true },
    email: { type: String, unique: true },
    numberOfVerifications: Number,
    studentName: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    admissionYear: {
        type: Number,
        required: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    degreeIssuedOn: {
        type: Date,
        required: true
    },
    degreeSerialNo: {
        type: String,
        required: true
    },
    studentRegistrationNo: {
        type: String,
        required: true
    }
});

const Report = mongoose.model('Report', reportSchema);

module.exports = {
    Report,
}