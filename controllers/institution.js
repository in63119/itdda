const { user, classs, children } = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');

module.exports = {
  index: async (req, res) => {},

  approve: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId } = accessTokenData; // ! 원장님의 userId
    const clickedTeacherId = req.body.teacherId;

    const userInfo = await user.findOne({
      where: { id: userId },
      attributes: ['institutionId'],
    });

    const institutionId = userInfo.dataValues.institutionId;

    // ! req.body.teacherId 가 null 인 경우
    if (!clickedTeacherId) {
      const teachers = await user.findAll({
        where: { institutionId, permission: 'teacher' },
        attributes: [
          ['guest', 'teacherGuest'],
          ['id', 'teacherId'],
          ['name', 'teacherName'],
          ['classsId', 'teacherClassId'],
          'institutionId',
          'createdAt',
        ],
        include: [
          { model: classs, attributes: [['name', 'teacherClassName']] },
        ],
      });

      // ! dataValues 무간지옥
      const ElApproved = teachers.filter(
        (teacher) => !teacher.dataValues.teacherGuest,
      );
      const ElUnapproved = teachers.filter(
        (teacher) => teacher.dataValues.teacherGuest,
      );

      res.status(200).json({
        changedTeacherId: clickedTeacherId,
        approved: ElApproved,
        unapproved: ElUnapproved,
      });
    }
    // ! req.body.teacherId 가 null 이 아닌 경우
    else {
      const teacherInfo = await user.findOne({
        where: { id: clickedTeacherId },
        attributes: ['guest'],
      });

      await user.update(
        {
          guest: !teacherInfo.guest,
          classsId: null,
        },
        { where: { id: clickedTeacherId } },
      );

      const teachers = await user.findAll({
        where: { institutionId, permission: 'teacher' },
        attributes: [
          ['guest', 'teacherGuest'],
          ['id', 'teacherId'],
          ['name', 'teacherName'],
          ['classsId', 'teacherClassId'],
          'institutionId',
          'createdAt',
        ],
        include: [
          { model: classs, attributes: [['name', 'teacherClassName']] },
        ],
      });

      // ! dataValues 무간지옥
      const ElApproved = teachers.filter(
        (teacher) => !teacher.dataValues.teacherGuest,
      );
      const ElUnapproved = teachers.filter(
        (teacher) => teacher.dataValues.teacherGuest,
      );

      res.status(200).json({
        changedTeacherId: clickedTeacherId,
        approved: ElApproved,
        unapproved: ElUnapproved,
      });
    }
  },

  classList: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId } = accessTokenData; // ! 원장님의 userId

    const userInfo = await user.findOne({
      where: { id: userId },
      attributes: ['institutionId'],
    });

    const classInfo = await classs.findAll({
      where: { institutionId: userInfo.institutionId },
      attributes: [['id', 'classId'], ['name', 'className'], 'institutionId'],
    });

    res.status(200).json(classInfo);
  },

  changeTeacherClass: async (req, res) => {
    const teacherId = req.body.teacherId;
    const classId = req.body.classId;

    if (!teacherId || !classId) {
      res.status(201).json({ message: 'teacherId or classId NOT sent' });
    } else {
      await user.update({ classsId: classId }, { where: { id: teacherId } });
      res.status(200).json({ message: 'teacher class changed' });
    }
  },

  manageClass: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId } = accessTokenData; // ! 원장님의 userId

    const userInfo = await user.findOne({
      where: { id: userId },
      attributes: ['institutionId'],
    });

    const institutionId = userInfo.dataValues.institutionId;
    const className = req.body.className;
    const clickedButton = req.body.clickedButton;

    if (!className) {
      const classInfo = await classs.findAll({
        where: { institutionId },
        attributes: [['id', 'classId'], ['name', 'className'], 'institutionId'],
      });
      res.status(200).json({ message: 'data only', classInfo });
    } else {
      if (clickedButton === 'add') {
        const classNameExistenceCheck = await classs.findOne({
          where: { institutionId, name: className },
        });

        if (!classNameExistenceCheck) {
          await classs.create({
            name: className,
            institutionId,
          });

          const classInfo = await classs.findAll({
            where: { institutionId },
            attributes: [
              ['id', 'classId'],
              ['name', 'className'],
              'institutionId',
            ],
          });
          res.status(200).json({ message: `${className} added`, classInfo });
        } else {
          res.status(201).json({ message: 'existing className' });
        }
      } else if (clickedButton === 'delete') {
        // ! classs와 연동되어 있는 아이들에 대한 작업이 필요함.
        // ! destroy 전에 isMember 를 바꿔주면 될텐데,
        // ! 그걸로 충분한가?
        // ! 아님. sibling 에 대한 isMember 체크 후 parent 를 guest로 바꿔줘야.
        // ! ===============
        const classIdInfo = await classs.findOne({
          where: { institutionId, name: className },
          attributes: [['id', 'classId']],
        });

        const childrenInfo = await children.findAll({
          where: { classsId: classIdInfo.dataValues.classId },
          attributes: [
            'isMember',
            ['name', 'childName'],
            ['id', 'childId'],
            ['classsId', 'classId'],
          ],
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

        for (let i = 0; i < childrenInfo.length; i++) {
          await children.update(
            {
              isMember: false,
              classsId: null,
            },
            {
              where: {
                id: childrenInfo[i].dataValues.childId,
              },
            },
          );

          // console.log(111, childrenInfo[i].dataValues.user.dataValues.parentId);
          const parentId = childrenInfo[i].dataValues.user.dataValues.parentId;

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
          } // ! 여기서부터 check!
        }

        res.json(childrenInfo);

        /* // !
        await classs.destroy({
          where: {
            institutionId,
            name: className,
          },
        });

        const classInfo = await classs.findAll({
          where: { institutionId },
          attributes: [
            ['id', 'classId'],
            ['name', 'className'],
            'institutionId',
          ],
        });

        res.status(200).json({ message: `${className} deleted`, classInfo });
// ! */
      } else {
        res
          .status(200)
          .json({ message: 'check className or clickedButton which you sent' });
      }
    }
  },
};
