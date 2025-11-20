const mongoose = require('mongoose');

const adShema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  date: {type: String, required: true},
  img: {type: String, required: true},
  price: {type: String, required: true},
  location: {type: String, required: true},
  infoSeller: {type: String, required: true},
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Ad', adShema);