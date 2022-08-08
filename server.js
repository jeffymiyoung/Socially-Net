// Imports
const express = require('express');
const mongoose = require('mongoose');

// app connection
const app = express();
const PORT = process.env.port || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app routes
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socially-net', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Mongo Debug logging
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Server is listening on PORT: ${PORT}`));