const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBuyTicket = new Schema(
  {
    userid: String,
    day: String,
    clb: String,
    stadium: String,
    userName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('userBuyTicket', userBuyTicket);
