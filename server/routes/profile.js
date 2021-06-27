const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile');

router.post('/', profileController.index);
router.post('/searchinstitution', profileController.searchInstitution);
router.post('/parentregister', profileController.parentRegister);

module.exports = router;
