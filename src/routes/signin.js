const express = require('express');
const router = express.Router();
const signinController = require('../app/Controllers/signinController');

router.post('/save', signinController.save);
router.post('/accout', signinController.accout);
router.get('/', signinController.signinPage);

module.exports = router;
