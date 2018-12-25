const express = require('express');
const app = express();
const mongoose = require('mongoose');
const genres = require('./routes/genres');

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('MongoDB connected.'))
.catch(err => console.error('Error connecting to MongoDB', err));

app.use(express.json());

app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
