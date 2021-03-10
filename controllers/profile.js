const { user, institution, children, classs } = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');

module.exports = {
  index: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId, permission } = accessTokenData;

    if (permission === 'institution') {
      // ! asdfasdf 프로필 사진 수정에 관하여 (institution VS teacher)
      // ! => institution 만 사진 수정을 하게 해야 함.
      // ! => 이거는 API를 분리하는 게 좋을 것 같음.
      const userInfo = await user.findOne({
        where: { id: userId },
        attributes: ['institutionId', 'email', 'mobile'],
      });
      const institutionId = userInfo.dataValues.institutionId;

      const institutionInfo = await institution.findOne({
        where: { id: institutionId },
        attributes: ['name', 'profileImg'],
      });

      const basicInfo = {
        profileImg: institutionInfo.dataValues.profileImg,
        name: institutionInfo.dataValues.name,
        email: userInfo.dataValues.email,
        mobile: userInfo.dataValues.mobile,
      };

      res.status(200).json({ message: 'institution profile', basicInfo });
    } else if (permission === 'teacher') {
      const userInfo = await user.findOne({
        where: { id: userId },
        attributes: ['institutionId', 'name', 'email', 'mobile'],
      });
      const institutionId = userInfo.dataValues.institutionId;

      const institutionInfo = await institution.findOne({
        where: { id: institutionId },
        attributes: ['profileImg'],
      });

      const basicInfo = {
        profileImg: institutionInfo.dataValues.profileImg,
        name: userInfo.dataValues.name,
        email: userInfo.dataValues.email,
        mobile: userInfo.dataValues.mobile,
      };

      res.status(200).json({ message: 'teacher profile', basicInfo });
    } else if (permission === 'parent') {
      const userInfo = await user.findOne({
        where: { id: userId },
        attributes: ['email', 'mobile'],
      });

      const childId = req.body.childId;

      const childrenInfo = await children.findAll({
        where: { userId },
        attributes: [['id', 'childId'], 'profileImg', 'name', 'isMember'],
        include: [
          { model: institution, attributes: [['name', 'institutionName']] },
          { model: classs, attributes: [['name', 'className']] },
        ],
      });

      const childInfo = childrenInfo.filter((child) => {
        return child.dataValues.childId === childId;
      })[0]; // ! [0] 주의

      const approved = childrenInfo.filter(
        (child) => child.dataValues.isMember,
      );
      const unapproved = childrenInfo.filter(
        (child) => !child.dataValues.isMember,
      );

      const basicInfo = {
        profileImg: childInfo.dataValues.profileImg,
        name: childInfo.dataValues.name,
        email: userInfo.dataValues.email,
        mobile: userInfo.dataValues.mobile,
      };

      res.status(200).json({
        message: 'parent/child profile',
        basicInfo,
        approved,
        unapproved,
      });
    } else {
      // ! asdfasdf 재밌군.
      res.json({
        message: 'this do not happen in real cases. ask server for help!',
      });
    }
  },
};
