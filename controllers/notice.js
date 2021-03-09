const { user, institution, notice } = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');

module.exports = {
  index: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId, permission } = accessTokenData;

    if (permission === 'parent') {
    } else {
      const title = req.body.title;
      const content = req.body.content;
      const userInfo = await user.findOne({
        where: { id: userId },
        attributes: ['institutionId', ['name', 'userName']],
      });
      const institutionId = userInfo.dataValues.institutionId;
      const writer = userInfo.dataValues.userName;
      if (!title) {
        noticeInfo = await notice.findAll({
          where: { institutionId },
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          attributes: [
            ['id', 'noticeId'],
            'category',
            'writer',
            'title',
            'content',
            'institutionId',
            'createdAt',
          ],
        });
        const ElNotice = noticeInfo.filter((el) => el.category === 'notice');
        const ElEvent = noticeInfo.filter((el) => el.category === 'event');
        res.json({ noticeInfo, ElNotice, ElEvent });
      } else {
        await notice.create({
          title,
          content,
          category,
          writer,
        });
      }
    }
  },
};
