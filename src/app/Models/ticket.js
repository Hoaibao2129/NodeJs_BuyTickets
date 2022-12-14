const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ticket = new Schema({
  day: String,
  time: String,
  clb: String,
  stadium: String,
  price: String,
  image: String,
  role: String,
});

module.exports = mongoose.model('Ticket', Ticket);
