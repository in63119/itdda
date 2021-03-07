const { user, institution } = require('../models');
const {} = require('./tokenFunctions');

module.exports = {
  index: async (req, res) => {
    // const accessTokenData = checkAccessToken(req, res);
    // if (!accessTokenData || accessTokenData === 'invalid token') {
    //   return;
    // }
    // const { userId, permission } = accessTokenData;
    // if (permission === 'institution') {
    //   const asdf = await user.findOne({
    //     where,
    //   });
    // } else if (permission === 'teacher') {
    // } else if (permission === 'parent') {
    // }
    res.json({ 1: 1 });
  },
};
