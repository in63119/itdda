const express = require('express');
const router = express.Router();

const noticeController = require('../controllers/notice');

router.post('/', noticeController.index);

module.exports = router;
