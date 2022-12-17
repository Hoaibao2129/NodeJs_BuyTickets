const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Ticket = new Schema({
  day: String,
  time: String,
  clb: String,
  stadium: String,
  price: String,
  image: String,
  role: String,
  count: String,
});

// Add plugin
Ticket.plugin(mongooseDelete);

module.exports = mongoose.model('Ticket', Ticket);
