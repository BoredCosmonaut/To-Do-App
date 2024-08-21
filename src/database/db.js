const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo')
    .then(() => {
        console.log("Mongo connection open");
    })
    .catch(error => {
        console.log(error);
    });

const db = mongoose.connection;

module.exports = db;