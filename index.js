const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const config = require('config');
const error = require('./middlewares/error');
const winston = require('winston');

winston.add(winston.transports.File, {filename: 'exceptions.log'});

process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
});

process.on('unhandledRejection', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
});

if (!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: jwtPrivateKey is not set.")
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('MongoDB connected.'))
.catch(err => console.error('Error connecting to MongoDB', err));

app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
