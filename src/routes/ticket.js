const express = require('express');
const router = express.Router();
const ticketController = require('../app/Controllers/ticketController');

router.delete('/deleteTicketUser/:id', ticketController.deleteticketUser);
router.get('/buyUserList', ticketController.buyUserList);
router.get('/buy/:id', ticketController.buy);
router.get('/user', ticketController.user);
router.post('/user/save', ticketController.save);
router.get('/buyUser', ticketController.buyUser);
router.delete('/deleteTicket/:id', ticketController.deleteTicket);
router.get('/search', ticketController.search);
router.get('/', ticketController.ticketPage);

module.exports = router;
