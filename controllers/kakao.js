require('dotenv').config();
const axios = require('axios');
const { user } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('./tokenFunctions');

// 카카오톡 REST_API_KEY
const kakaoKey = process.env.KAKAO_KEY;

module.exports = {
  login: async (req, res) => {
    const redirect = 'https://datda.net/login';
    const access = await axios({
      methos: 'POST',
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakaoKey}&redirect_uri=${redirect}&code=${req.body.authorizationCode}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }).catch((err) => {
      console.log(err);
      return res.sendStatus(400);
    });

    console.log('access :   ' + access.data.access_token);

    axios
      .get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${access.data.access_token}`,
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then((response) => {
        const email = response.data.kakao_account.email;
        console.log('이메일은!!!!!!!!', email);

        return user
          .findOne({ where: { email: email } })
          .then((data) => {
            if (!data) {
              console.log('201!!!!');
              return res.status(201).json({ message: 'email does not exist' });
            } else {
              console.log('200!!!!');
              const { id, email, permission } = data.dataValues;
              const userInfo = { userId: id, email, permission };

              // const accessToken = generateAccessToken(data.dataValues);
              const accessToken = generateAccessToken(userInfo);
              const refreshToken = generateRefreshToken(data.dataValues);

              sendRefreshToken(res, refreshToken);
              // sendRefreshToken 로직
              // sendRefreshToken: (res, refreshToken) => {
              //   res.cookie('refreshToken', refreshToken, {
              //     httpOnly: true,
              //     secure: true,
              //     sameSite: 'None',
              //   });
              // },
              sendAccessToken(res, accessToken, permission);
              // sendAccessToken 로직
              // sendAccessToken: (res, accessToken, permission) => {
              //   res.status(200).json({
              //     accessToken,
              //     permission,
              //     message: 'datda login succeeded',
              //   });
              // },
              // return res.status(200).json({ message: 'kakao login succeeded' });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log('에러다!!!!', err);
      });
  },

  signup: async (req, res) => {
    const redirect = 'https://datda.net/signup';
    const access = await axios({
      methos: 'POST',
      url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakaoKey}&redirect_uri=${redirect}&code=${req.body.authorizationCode}`,
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }).catch(() => {
      // console.log(err);
      return res.sendStatus(400);
    });

    // console.log('access :   ' + access.data.access_token);

    axios
      .get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${access.data.access_token}`,
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then((response) => {
        const email = response.data.kakao_account.email;
        console.log(email);
        return user
          .findOne({ where: { email: email } })
          .then((data) => {
            if (!data) {
              // 데이터가 없다면 201 상태와 이메일
              return res.status(200).json({ email: email });
            } else {
              // 데이터가 있다면 200 상태 메세지를 보내주고 거부.
              return res.status(201).json({ message: 'email does not exist' });
            }
          })
          .catch(() => res.sendStatus(400));
      });
  },
};
