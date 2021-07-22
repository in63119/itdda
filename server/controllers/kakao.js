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
    // const redirect = 'http://localhost:3000/login';
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
        // console.log('이메일은!!!!!!!!', email);

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
    // const redirect = 'http://localhost:3000/signup';
    let access;
    try {
      access = await axios({
        methos: 'POST',
        url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakaoKey}&redirect_uri=${redirect}&code=${req.body.authorizationCode}`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        // .then((res) => {
        //   // console.log(123, res);
        //   // console.log(234, res.data.access_token);
        //   access = res.data.access_token;
        // })
        .catch((err) => {
          // console.log('토큰에러 떳어!!!', err);
          res.sendStatus(410);
        });
    } catch (err) {
      console.log(err);
    }

    // axios({
    //   methos: 'GET',
    //   url: 'https://kapi.kakao.com/v1/user/access_token_info',
    //   headers: {
    //     Authorization: `Bearer ${access}`,
    //   },
    // })
    //   .then((res) => {
    //     // console.log('코드는!!!!!', res);
    //   })
    //   .catch((err) => {
    //     // console.log('토큰 에러!!!!!', err);
    //   });

    console.log('1 access :   ' + access.data.access_token);
    // console.log('코드는!!!!!', access);
    // xMNvMDSvsVsfBs_EI3W6JmNuh6Sc7ZM0xnYz6go9dNoAAAF4J9uP6w

    // K8cxaFkr8ISzZkml-TnjXwsp32kUdjvH2nATHYHNDwgNvJfEoWfu0UcHcSeuZPoEqBlC5worDSAAAAF4J9uNig
    // K8cxaFkr8ISzZkml-TnjXwsp32kUdjvH2nATHYHNDwgNvJfEoWfu0UcHcSeuZPoEqBlC5worDSAAAAF4J9uNig

    // qhqGlztG154228F3NC7axgraxnDfkNUnMTebPxoM6w9emwsZb_SaMkgzbAXsgUaDoFEBJAo9cpcAAAF4J9_Cqg
    const result = await axios
      .get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${access.data.access_token}`,
          // Authorization: `Bearer ${access}`,
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then((response) => {
        // console.log('상태는!!!!!', response.status);
        console.log('2 데이터는!!!!!', response.data);
        const email = response.data.kakao_account.email;
        console.log(3, email);
        return user
          .findOne({ where: { email: email } })
          .then((data) => {
            if (!data) {
              console.log('200!!!!');
              return res.status(200).json({ email: email });
            } else {
              console.log('201!!!!');
              return res.status(201).json({ message: 'email does exist' });
            }
          })
          .catch((err) => {
            // console.log('4 토큰 에러!!!!!');
            res.sendStatus(420);
          });
      })
      .catch((err) => {
        // console.log('v2에러다!!!!', err);
        res.sendStatus(430);
      });
    return result;
  },
};
