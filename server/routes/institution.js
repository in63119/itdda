const express = require('express');
const router = express.Router();

const institutionController = require('../controllers/institution');

router.post('/', institutionController.index);
router.post('/approve', institutionController.approve);
router.get('/classlist', institutionController.classList);
router.post('/changeteacherclass', institutionController.changeTeacherClass);
router.post('/manageclass', institutionController.manageClass);
router.post('/timetable', institutionController.timetable);

module.exports = router;
