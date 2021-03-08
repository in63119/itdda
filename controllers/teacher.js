const { user, children, institution, classs } = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');

module.exports = {
  index: async (req, res) => {},

  approve: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId } = accessTokenData; // ! 선생님의 userId
    const clickedChildId = req.body.childId;

    const userInfo = await user.findOne({
      where: {
        id: userId,
      },
      attributes: ['institutionId', ['classsId', 'teacherClassId']],
    });

    const institutionId = userInfo.dataValues.institutionId;
    const teacherClassId = userInfo.dataValues.teacherClassId;

    if (!clickedChildId) {
      const childrenInfo = await children.findAll({
        where: {
          institutionId,
        },
        attributes: [
          'isMember',
          ['id', 'childId'],
          ['name', 'childName'],
          ['classsId', 'childClassId'],
          'institutionId',
          'createdAt',
        ],
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        include: [
          {
            model: user,
            attributes: [
              ['id', 'parentId'],
              ['name', 'parentName'],
              ['guest', 'parentGuest'],
            ],
          },
          // !!!!! zxcvzxcv
          {
            model: institution,
            attributes: [['name', 'institutionName']],
          },
          {
            model: classs,
            attributes: [['name', 'className']],
          },
        ],
      });

      const approved = childrenInfo.filter((child) => child.isMember);
      const ElApproved = approved.filter((child) => {
        // ! dataValues 무간지옥
        return child.dataValues.childClassId === teacherClassId;
      });
      const ElUnapproved = childrenInfo.filter((child) => !child.isMember);

      res.status(200).json({
        approved: ElApproved,
        unapproved: ElUnapproved,
        changedChildId: clickedChildId,
      });
    } else {
      const childInfo = await children.findOne({
        where: { id: clickedChildId },
        attributes: ['isMember'],
        include: [
          {
            model: user,
            attributes: [
              ['id', 'parentId'],
              ['guest', 'parentGuest'],
            ],
          },
        ],
      });

      // ! 클라이언트 측에서 선택된 child의 parentId
      const parentId = childInfo.dataValues.user.dataValues.parentId;

      if (!childInfo.dataValues.isMember) {
        await children.update(
          {
            isMember: !childInfo.dataValues.isMember,
            classsId: teacherClassId,
          },
          { where: { id: clickedChildId } },
        );
        await user.update({ guest: false }, { where: { id: parentId } });
      } else {
        await children.update(
          {
            isMember: !childInfo.dataValues.isMember,
            classsId: null,
          },
          {
            where: {
              id: clickedChildId,
            },
          },
        );

        // ! siblingInfo는 parent 에 종속된 모든 children
        // ! => parent의 guest 여부를 바꿔주기 위해 사용한다.
        const siblingInfo = await children.findAll({
          where: { userId: parentId },
          attributes: [['id', 'childId'], 'isMember'],
        });

        let someSiblingIsMember = false;
        for (let i = 0; i < siblingInfo.length; i++) {
          if (siblingInfo[i].dataValues.isMember) {
            someSiblingIsMember = true;
            break;
          }
        }
        if (!someSiblingIsMember) {
          await user.update({ guest: true }, { where: { id: parentId } });
        }
      }

      const childrenInfo = await children.findAll({
        where: {
          institutionId,
        },
        attributes: [
          'isMember',
          ['id', 'childId'],
          ['name', 'childName'],
          ['classsId', 'childClassId'],
          'institutionId',
          'createdAt',
        ],
        include: [
          {
            model: user,
            attributes: [
              ['id', 'parentId'],
              ['name', 'parentName'],
              ['guest', 'parentGuest'],
            ],
          },
          {
            model: institution,
            attributes: [['name', 'institutionName']],
          },
          {
            model: classs,
            attributes: [['name', 'className']],
          },
        ],
      });

      const approved = childrenInfo.filter((child) => child.isMember);
      const ElApproved = approved.filter((child) => {
        // ! dataValues 무간지옥
        return child.dataValues.childClassId === teacherClassId;
      });
      const ElUnapproved = childrenInfo.filter((child) => !child.isMember);

      res.status(200).json({
        approved: ElApproved,
        unapproved: ElUnapproved,
        changedChildId: clickedChildId,
      });
    }
  },
};
