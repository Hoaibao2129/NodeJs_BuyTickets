const { muntipleMongooseToObject } = require('../../until/mongoose');
const { mongooseToObject } = require('../../until/mongoose');

const Accout = require('../Models/accouts');

const Ticket = require('../Models/ticket');

class SigninController {
  //[GET] /signin
  signinPage(req, res, next) {
    res.render('signin');
  }

  //[POST] /signin/accout
  accout(req, res, next) {
    Accout.findOne({ userName: req.body.userName })
      .then((accout) => {
        if (!accout) {
          res.cookie('userNameS', req.body.userName);
          res.cookie('passWordS', req.body.passWord);
          res.render('userSignin');
        } else {
          res.render('signin', { showErro: true });
        }
      })
      .catch(next);
  }

  //[POST] /signin/save
  save(req, res, next) {
    const accout = new Accout({
      userName: req.cookies.userNameS,
      passWord: req.cookies.passWordS,
      numberPhone: req.body.numberPhone,
      address: req.body.address,
      role: '2',
    });
    accout
      .save()
      .then(() => {
        res.redirect('/login');
      })
      .catch(next);
  }
}

module.exports = new SigninController();
