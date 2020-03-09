var mongoose = require('mongoose');
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phon: String,
    gender: String,
    created_at: {
        type: Date,
        default: Date.now
    }
});

var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = (callback, limit) => {
    User.find(callback).limit(limit)
}