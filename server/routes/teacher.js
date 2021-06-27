const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/teacher');

router.post('/', teacherController.index);
router.post('/approve', teacherController.approve);

module.exports = router;
