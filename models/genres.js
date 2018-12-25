const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const Genre = mongoose.model('genres', schema);

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;
module.exports.genreSchema = schema;
