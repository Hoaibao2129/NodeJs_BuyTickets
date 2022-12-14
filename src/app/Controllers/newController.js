const { muntipleMongooseToObject } = require('../../until/mongoose');
const Ticket = require('../Models/ticket');

class NewController {
  //[GET] /news
  index(req, res, next) {
    Ticket.find({})
      .then((ticket) =>
        res.render('home', {
          ticket: muntipleMongooseToObject(ticket),
          showLogin: true,
          showSignin: true,
        })
      )
      .catch(next);
  }
}

module.exports = new NewController();
