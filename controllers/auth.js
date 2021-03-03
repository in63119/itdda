const { user } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('./tokenFunctions');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const findEmail = await user
      .findOne({
        where: { email },
      })
      .catch((err) => {
        console.log(err);
      });
    if (!findEmail) {
      return res.status(404).json({ message: 'email does not exist' });
    } else {
      user
        .findOne({
          where: { email, password },
        })
        .then((data) => {
          if (!data) {
            return res.status(400).json({ message: 'wrong password' });
          }
          delete data.dataValues.password;
          delete data.dataValues.salt;
          const permission = data.dataValues.permission;
          const accessToken = generateAccessToken(data.dataValues);
          const refreshToken = generateRefreshToken(data.dataValues);

          sendRefreshToken(res, refreshToken);
          sendAccessToken(res, accessToken, permission);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },

  logout: async (req, res) => {
    // ! aws 쿠키 관련 이슈 코드
    // res.send({ asdf: req.cookies });
    res.send('logout ok');
  },

  signup: async (req, res) => {
    res.send('signup ok');
  },
};
