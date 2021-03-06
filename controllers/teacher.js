const { user, children, classs, indiNotice } = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');

module.exports = {
  index: async (req, res) => {},

  approve: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId, permission } = accessTokenData;

    const qwqwqw = await classs.findOne({
      where: {
        userId,
      },
      include: [{ model: children }],
    });

    res.status(200).json(qwqwqw);
  },
};
