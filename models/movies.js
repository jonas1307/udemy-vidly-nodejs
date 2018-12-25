const { genreSchema } = require('./genres');
const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model('movies', schema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(1).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };
    return Joi.validate(movie, schema)
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
