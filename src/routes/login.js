const express = require('express');
const router = express.Router();
const loginController = require('../app/Controllers/loginController');

router.get('/usePageLogin', loginController.usePageLogin);
router.post('/accout', loginController.login);
router.get('/', loginController.loginPage);

module.exports = router;
