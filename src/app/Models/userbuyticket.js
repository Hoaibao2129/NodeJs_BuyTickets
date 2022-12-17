const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const userBuyTicket = new Schema(
  {
    userid: String,
    day: String,
    clb: String,
    stadium: String,
    userName: String,
    countTicket: String,
    price: String,
    nameTicket: String,
  },
  {
    timestamps: true,
  }
);

userBuyTicket.plugin(mongooseDelete);

module.exports = mongoose.model('userBuyTicket', userBuyTicket);
