const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Accout = new Schema({
  userName: String,
  passWord: String,
  role: String,
  address: String,
  numberPhone: String,
});

module.exports = mongoose.model('Accout', Accout);
