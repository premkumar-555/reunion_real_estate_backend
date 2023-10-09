const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
user_name: {type: String, required: true},
email_ID: {type: String, required: true},
password: {type: String, required: true},
phone_number: {type: Number, required: true},
}, {
    timeStamps: true,
    versionKeys: false
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;