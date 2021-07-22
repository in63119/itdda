const express = require('express');
const router = express.Router();

const kakaoController = require('../controllers/kakao');

router.post('/login', kakaoController.login);
router.post('/signup', kakaoController.signup);

router.get('/login', (req, res) => {
  res.send('welcome to datda kakao login!');
});
router.get('/signup', (req, res) => {
  res.send('welcome to datda kakao signup!');
});

module.exports = router;
