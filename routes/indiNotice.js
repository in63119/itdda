const express = require('express');
const router = express.Router();

const indiNoticeController = require('../controllers/indiNotice');

router.post('/', indiNoticeController.index);
router.get('/childrenlist', indiNoticeController.childrenList);

module.exports = router;
