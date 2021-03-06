const { user, children, classs, indiNotice } = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');

module.exports = {
  index: async (req, res) => {},

  approve: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId } = accessTokenData;
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
        include: [
          {
            model: user,
            attributes: [
              ['id', 'parentId'],
              ['name', 'parentName'],
            ],
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
      });

      if (!childInfo.dataValues.isMember) {
        await children.update(
          {
            isMember: !childInfo.dataValues.isMember,
            classsId: teacherClassId,
          },
          {
            where: {
              id: clickedChildId,
            },
          },
        );
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
            ],
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
