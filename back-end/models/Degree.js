const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema({
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

const Degree = mongoose.model('Degree', degreeSchema);

module.exports = {
    Degree,
    degreeSchema
}