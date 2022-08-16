const mongoose = require('mongoose');
const DB = process.env.DB_URL;

mongoose.connect(DB)
    .then(() => {
        console.log('Database is connected successfully!');
    })
    .catch((err) => {
        console.log('While making the connection with database : ', err);
    });