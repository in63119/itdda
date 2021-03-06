const { user } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
  isAuthorized,
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
      return res.status(201).json({ message: 'email does not exist' });
    } else {
      user
        .findOne({
          where: { email, password },
        })
        .then((data) => {
          if (!data) {
            return res.status(202).json({ message: 'wrong password' });
          }
          // delete data.dataValues.password;
          // delete data.dataValues.passwordChange;
          // delete data.dataValues.salt;
          const { id, email, permission, guest } = data.dataValues;
          const userInfo = { userId: id, email, permission, guest };

          // const accessToken = generateAccessToken(data.dataValues);
          const accessToken = generateAccessToken(userInfo);
          const refreshToken = generateRefreshToken(userInfo);

          sendRefreshToken(res, refreshToken);
          sendAccessToken(res, accessToken, permission, guest);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },

  logout: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.status(201).json({
        message: 'datda logout failed(no token in req.headers.authorization)',
      });
    } else if (accessTokenData === 'invalid token') {
      return res.status(201).json({
        message: 'datda logout failed(invalid token)',
      });
    }
    res.status(200).json({ message: 'datda logout succeded' });

    // ! aws 쿠키 관련 이슈 코드 ===========
    // res.send({ asdf: req.cookies });
    // =================================
  },

  signup: async (req, res) => {
    const { password, permission, userName, email, mobile, role } = req.body;
    const findEmail = await user
      .findOne({
        where: { email },
      })
      .catch((err) => {
        console.log(err);
      });
    if (!findEmail) {
      user
        .create({
          password,
          permission,
          name: userName,
          email,
          mobile,
          role,
        })
        .then((data) => {
          res.status(200).json({
            message: 'signup succeeded',
            data,
          });
        });
    } else {
      res.status(201).json({
        message: 'existing email',
      });
    }
  },

  isEmail: async (req, res) => {
    const { email } = req.body;
    const findEmail = await user
      .findOne({
        where: { email },
      })
      .catch((err) => {
        console.log(err);
      });
    if (!findEmail) {
      res.status(200).json({
        message: 'email available',
      });
    } else {
      res.status(201).json({
        message: 'existing email',
      });
    }
  },
};
