const { muntipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

const Ticket = require('../Models/ticket');
const Accout = require('../Models/accouts');
const UserBuyTicket = require('../Models/userbuyticket');
const ticket = require('../Models/ticket');

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
        res.cookie('id', req.params.id);
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

  //[POST] /ticket/user/save
  save(req, res, next) {
    let nameTicket;
    res.cookie('countTicket', req.body.count);
    if (req.body.loaiVe == '45000') {
      nameTicket = 'VÉ THƯỜNG';
    } else if (req.body.loaiVe == '95000') {
      nameTicket = 'VÉ VIP 1';
    } else {
      nameTicket = 'VÉ VIP 2';
    }
    res.cookie('nameTicket', nameTicket);
    Ticket.findById(req.cookies.id).then((ticket) => {
      let price = parseInt(req.body.count) * parseInt(req.body.loaiVe);
      res.cookie('price', price);
      const userBuyTicket = new UserBuyTicket(req.cookies);
      if (parseInt(ticket.count) > parseInt(req.body.count)) {
        userBuyTicket.save().then(() => {
          Ticket.updateOne(
            { _id: req.cookies.id },
            { count: parseInt(ticket.count) - parseInt(req.body.count) }
          ).then(() => {
            res.clearCookie(req.cookies);
            res.render('delivery');
          });
        });
      } else {
        res.json('SỐ LƯỢNG VÉ TRONG KHO KHÔNG ĐỦ');
      }
    });
  }

  //[GET] /ticket/buyUser
  buyUser(req, res, next) {
    UserBuyTicket.find({ userName: req.cookies.userName, deleted: false })
      .then((ticket) =>
        res.render('buyUser', { ticket: muntipleMongooseToObject(ticket) })
      )
      .catch(next);
  }

  //[DELETE] /ticket/deleteticketUser
  deleteticketUser(req, res, next) {
    UserBuyTicket.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[DELETE] /ticket/deleteticket
  deleteTicket(req, res, next) {
    UserBuyTicket.delete({ _id: req.params.id })
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

  buyUserList(req, res, next) {
    UserBuyTicket.find({ userName: req.cookies.userName, deleted: true })
      .then((ticket) =>
        res.render('bookedTicket', {
          ticket: muntipleMongooseToObject(ticket),
        })
      )
      .catch(next);
  }
}

module.exports = new NewController();
