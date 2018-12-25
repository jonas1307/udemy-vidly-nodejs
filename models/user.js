const mongoose = require('mongoose');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

const User = mongoose.model('users', schema);

function validateUser(user) {
    const options = {
        min: 6,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1
      }
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: new PasswordComplexity(options)
    };
    return Joi.validate(user, schema);
};

module.exports.User = User;
module.exports.validate = validateUser;
