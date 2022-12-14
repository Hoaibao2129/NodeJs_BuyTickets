const { muntipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

const Ticket = require('../Models/ticket');
const Accout = require('../Models/accouts');
const UserBuyTicket = require('../Models/userbuyticket');

class NewController {
  //[GET] /news
  ticketPage(req, res, next) {
    Ticket.find({})
      .then((ticket) =>
        res.render('listTicket', {
          ticket: muntipleMongooseToObject(ticket),
        })
      )
      .catch(next);
  }

  //[GET] /ticket/buy/:id
  buy(req, res, next) {
    Ticket.findById(req.params.id)
      .then((ticket) => {
        res.cookie('day', ticket.day);
        res.cookie('clb', ticket.clb);
        res.cookie('stadium', ticket.stadium);
        res.render('inforTicket', { ticket: mongooseToObject(ticket) });
      })
      .catch(next);
  }

  //[GET] /ticket/buy/user
  user(req, res, next) {
    Accout.findById(req.cookies.userid)
      .then((accout) => {
        res.cookie('userName', accout.userName);
        res.render('inforUser', { accout: mongooseToObject(accout) });
      })
      .catch(next);
  }

  //[]
  save(req, res, next) {
    const userBuyTicket = new UserBuyTicket(req.cookies);
    userBuyTicket
      .save()
      .then(() => {
        res.clearCookie(req.cookies);
        res.render('delivery');
      })
      .catch(next);
  }

  //[GET] /ticket/buyUser
  buyUser(req, res, next) {
    UserBuyTicket.find({ userName: req.cookies.userName })
      .then((ticket) =>
        res.render('buyUser', { ticket: muntipleMongooseToObject(ticket) })
      )
      .catch(next);
  }

  //[DELETE] /ticket/deleteticket
  deleteTicket(req, res, next) {
    UserBuyTicket.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  search(req, res, next) {
    Ticket.find({
      clb: { $regex: '.*' + req.query.search + '.*', $options: 'i' },
    })
      .then((ticket) =>
        res.render('home', {
          ticket: muntipleMongooseToObject(ticket),
          showLogin: false,
          showOut: true,
          showBtn: true,
        })
      )
      .catch(next);
  }
}

module.exports = new NewController();
