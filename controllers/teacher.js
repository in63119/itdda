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

    // ! permission(guest)을 바꿔주는 거 잊지 말자.

    const result = [];

    const userInfo = await user.findOne({
      where: {
        id: userId,
      },
      attributes: [['name', 'teacherName']],
      include: [
        {
          model: classs,
          attributes: [
            ['id', 'classId'],
            ['name', 'className'],
            'institutionId',
          ],
        },
      ],
    });

    // ! dataValues 무간지옥
    const institutionId = userInfo.dataValues.classs.dataValues.institutionId;

    // ! 생각보다 존나 복잡하다 후달달
    // ! parent 의 입장에서 institution 과 연결되어 있을 필요가 없음...
    // ! 결론1. institution 과 user의 다대다 관계는 일대다 관계로 바뀐다.
    // ! 결론2. institution 과 children의 관계가 새롭게 생긴다.(일대다)
    // ! parent의 입장에서 institutionId는 null 값을 갖는다.

    const childrenInfo = await children.findAll({
      where: { institutionId },
    });

    res.status(200).json(childrenInfo);
  },
};
