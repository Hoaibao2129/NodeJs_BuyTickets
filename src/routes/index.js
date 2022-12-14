const newRouter = require('./new');
const newLogin = require('./login');
const newTicket = require('./ticket');
const newSignin = require('./signin');
const newManage = require('./manage');

function route(app) {
  app.use('/signin', newSignin);
  app.use('/manage', newManage);
  app.use('/login', newLogin);
  app.use('/ticket', newTicket);
  app.use('/', newRouter);
}

module.exports = route;
