const express = require('express');
const router = express.Router();
const ticketController = require('../app/Controllers/ticketController');

router.get('/buy/:id', ticketController.buy);
router.get('/user', ticketController.user);
router.get('/user/save', ticketController.save);
router.get('/buyUser', ticketController.buyUser);
router.delete('/deleteTicket/:id', ticketController.deleteTicket);
router.get('/search', ticketController.search);
router.get('/', ticketController.ticketPage);

module.exports = router;
