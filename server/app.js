require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');

// Use the environment variable for MongoDB connection
mongoose.connect(process.env.MONGO_URI)
   .then(() => {
       console.log('Connected to MongoDB');

       // Import the User model after MongoDB connection is successful
       const User = require('./models/userModels');
   })
   .catch(err => console.error('Could not connect to MongoDB', err));

// Define a sample route to test the server
app.get('/', (req, res) => {
    res.send('Server is running and connected to MongoDB');
});

http.listen(3000, function() {
    console.log('Server is running on port 3000...');
});
