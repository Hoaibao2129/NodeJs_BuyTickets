const { muntipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

const Ticket = require('../Models/ticket');
const Accout = require('../Models/accouts');
const UserBuyTicket = require('../Models/userbuyticket');

class manageController {
  //[GET] /show
  show(req, res, next) {
    Accout.find({ role: '2' })
      .then((accout) => {
        res.render('manageUser', {
          accout: muntipleMongooseToObject(accout),
        });
      })
      .catch(next);
  }

  // [GET] /manage/showTicketBuy

  showTicketBuy(req, res, next) {
    UserBuyTicket.find({ deleted: false })
      .then((userbuyticket) =>
        res.render('userBuyTicket', {
          userbuyticket: muntipleMongooseToObject(userbuyticket),
        })
      )
      .catch(next);
  }

  //[GET] /manage/showTicket

  showTicket(req, res, next) {
    Ticket.find({})
      .then((ticket) =>
        res.render('manageTicket', { ticket: muntipleMongooseToObject(ticket) })
      )
      .catch(next);
  }

  //[GET] /manage/addPage
  addPage(req, res, next) {
    res.render('addTicketPage');
  }

  //[POST] /manage/addTicket

  addTicket(req, res, next) {
    req.body.image =
      'https://cdn.bongdaplus.vn/Assets/Media/2022/02/24/62/V-LEAGUE-1.jpg';
    const ticket = new Ticket(req.body);
    ticket
      .save()
      .then(() => res.redirect('/manage/ticket'))
      .catch(next);
  }

  // [GET] /manage/PageUpdateTicket/:id

  PageUpdateTicket(req, res, next) {
    Ticket.findById(req.params.id)
      .then((ticket) =>
        res.render('PageUpdateTicket', { ticket: mongooseToObject(ticket) })
      )
      .catch(next);
  }

  //[PUT] /manage/update/:id

  update(req, res, next) {
    Ticket.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/manage/ticket'))
      .catch(next);
  }

  //[DELETE] /manage/deleteTicket/:id
  deleteTicket(req, res, next) {
    Ticket.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[DELETE] /manage/deleteUser/:id
  deleteUser(req, res, next) {
    Accout.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  //[GET] /
  search(req, res, next) {
    Accout.find({
      userName: { $regex: '.*' + req.query.search + '.*', $options: 'i' },
      role: '2',
    })
      .then((accout) =>
        res.render('manageUser', {
          accout: muntipleMongooseToObject(accout),
        })
      )
      .catch(next);
  }

  // [GET] /manage/confirmTicket/:id
  confirmTicket(req, res, next) {
    UserBuyTicket.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  // [GET] /manage/listTicket
  listTicket(req, res, next) {
    UserBuyTicket.find({ deleted: true })
      .then((userbuyticket) =>
        res.render('listTicketBuy', {
          userbuyticket: muntipleMongooseToObject(userbuyticket),
        })
      )
      .catch(next);
  }
}

module.exports = new manageController();
