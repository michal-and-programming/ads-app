const mongoose = require('mongoose');

const connectToDB = () => {

  mongoose.connect(process.env.Mondo_URL);
  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connected to the database');
  });

  db.on('error', (err) => console.log('Error ' + err));
};

module.exports = connectToDB;