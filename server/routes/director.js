const express = require('express');
const router = express.Router();

const directorController = require('../controllers/director');

router.post('/', directorController.index);

module.exports = router;
