var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    password: String,
    privatekey: String,
    published_data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', userSchema);