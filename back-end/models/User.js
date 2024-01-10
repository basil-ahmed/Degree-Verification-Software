const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    cnic: { type: String, unique: true },
    mobile: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
});
  
const User = mongoose.model('User', userSchema);

// export the model so other modules can import it
module.exports = {
    User,
}