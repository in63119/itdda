const express = require('express');
const router = express.Router();

const guestController = require('../controllers/guest');

router.post('/', guestController.index);
router.post('/searchinstitution', guestController.searchInstitution);
router.post('/teacherregister', guestController.teacherRegister);
router.post('/parentregister', guestController.parentRegister);

module.exports = router;
