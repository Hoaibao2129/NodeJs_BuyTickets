const { muntipleMongooseToObject } = require('../../until/mongoose');
const Accout = require('../Models/accouts');
const Ticket = require('../Models/ticket');

class NewController {
  //[GET] /login
  loginPage(req, res, next) {
    res.render('login');
  }

  //[POST] /login/accouts

  login(req, res, next) {
    Accout.findOne({ userName: req.body.useName, passWord: req.body.passWord })

      .then((accout) => {
        if (!accout) {
          res.status(300).json('ĐĂNG NHẬP THẤT BẠI');
        } else if (accout.role === '2') {
          res.cookie('userid', accout._id);
          res.cookie('userName', accout.userName);
          res.redirect('/login/usePageLogin');
        } else if (accout.role === '1') {
          res.render('pageAdmin');
        }
      })
      .catch(next);
  }

  // [GET] /login/usePageLogin
  usePageLogin(req, res, next) {
    Ticket.find({})
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
