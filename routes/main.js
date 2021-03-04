const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');

router.post('/', mainController.index);

module.exports = router;
