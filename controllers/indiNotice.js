const { user, children, indiNotice } = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');

module.exports = {
  index: async (req, res) => {
    /*
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId, permission } = accessTokenData;

    // ! indiNotice 테이블에서 userId는 작성자의 역할을 한다.
    // ! => teacher 와 parent 가 작성할 수 한다.
    // ! => institution 은 알림장을 열람하지도 못한다.

    if (permission === 'parent') {
      res.json({ message: 'parent' });
    } else if (permission === 'teacher') {
      const indiNoticeWrittenByTeacher = await indiNotice.findAll({
        where: { userId },
      });
      // ! ===
      const asdf = await children.findOne({
        where: { id },
        include: [{ model: classs }, attributes],
      });
      await teat
      // ! ===
      res.json({ message: 'teacher' });
    } else if (permission === 'institution') {
      res.json({
        message:
          'institution is not available for this request. this does not happen in real cases',
      });
    }
  */
  },
};
