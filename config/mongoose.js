const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting in MongoDB"));

db.once('open',function(){
    console.log('Connected to DB:: MONGO');
});

module.exports = db; 