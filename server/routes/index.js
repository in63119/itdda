const express = require('express');
const router = express.Router();
//test용, 최초 get요청시
router.get('/', function (req, res) {
	res.send('welcome to datda world!');
});

module.exports = router;
