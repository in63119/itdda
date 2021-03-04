const express = require('express');
const router = express.Router();

const qazwsxController = require('../controllers/qazwsx');

router.post('/', qazwsxController.index);

module.exports = router;
