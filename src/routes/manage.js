const express = require('express');
const router = express.Router();

const manageController = require('../app/Controllers/manageController');

router.get('/user', manageController.show);
router.get('/addPage', manageController.addPage);
router.post('/addTicket', manageController.addTicket);
router.get('/buyticket', manageController.showTicketBuy);
router.get('/ticket', manageController.showTicket);
router.get('/PageUpdateTicket/:id', manageController.PageUpdateTicket);
router.put('/update/:id', manageController.update);
router.delete('/deleteTicket/:id', manageController.deleteTicket);
router.delete('/deleteUser/:id', manageController.deleteUser);
router.get('/search', manageController.search);
router.get('/confirmTicket/:id', manageController.confirmTicket);
router.get('/listTicket', manageController.listTicket);

module.exports = router;
