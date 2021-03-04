require('dotenv').config();
const axios = require('axios');
const { user } = require('../models');

// 카카오톡 REST_API_KEY
const kakaoKey = process.env.KAKAO_KEY;
const redirect = 'http://localhost:3000';

module.exports = {
  login: async (req, res) => {
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

    console.log('access :   ' + access.data.access_token);

    axios
      .get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${access.data.access_token}`,
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then((response) => {
        // const email = response.data.kakao_account.email;
        const email = 'parent5@datda.net';
        console.log('이메일은!!!!!!!!', email);

        return user
          .findOne({ where: { email: email } })
          .then((data) => {
            if (!data) {
              console.log('201!!!!');
              return res.status(201).json({ message: 'email does not exist' });
            } else {
              console.log('200!!!!');
              return res.status(200).json({ message: 'kakao login succeeded' });
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
    // const access = await axios({
    //   methos: 'POST',
    //   url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakaoKey}&redirect_uri=${redirect}&code=${req.body.authorizationCode}`,
    //   headers: {
    //     'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // }).catch(() => {
    //   // console.log(err);
    //   return res.sendStatus(400);
    // });
    // axios
    //   .get('https://kapi.kakao.com/v2/user/me', {
    //     headers: {
    //       Authorization: `Bearer ${access.data.access_token}`,
    //       'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //     },
    //   })
    //   .then((response) => {
    //     const email = response.data.kakao_account.email;
    //     console.log(email);
    //     return user
    //       .findOrCreate({ where: { email: email } })
    //       .then(([created]) => {
    //         if (created) {
    //           // 생성되었다면 200 상태 메세지를 보내주고 허용
    //           res.status(200).send({ email: email });
    //         } else {
    //           // 생성되지 않았다면 이미 있다는 얘기
    //           res.status(200).send({ email: email });
    //         }
    //       })
    //       .catch((err) => res.status(400).send(`처리할 수 없습니다. : ${err}`));
    //   });
  },
};
