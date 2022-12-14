const express = require('express');
const router = express.Router();
const newController = require('../app/Controllers/newController');

router.use('/', newController.index);

module.exports = router;
