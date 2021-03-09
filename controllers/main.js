const {
  user,
  institution,
  notice,
  album,
  indiNotice,
  children,
  classs,
} = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');

module.exports = {
  index: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId, permission } = accessTokenData;

    // ! userGuestCheckInfo, isGuest
    // ! => guest에 따른 분기를 위한 것들
    const userGuestCheckInfo = await user.findOne({
      where: { id: userId },
      attributes: ['guest', 'institutionId'],
    });

    const isGuest = userGuestCheckInfo.dataValues.guest;
    let isRegistered;
    if (permission === 'teacher') {
      isRegistered = userGuestCheckInfo.dataValues.institutionId;
    } else if (permission === 'parent') {
      isRegistered = await children.findOne({
        where: { userId },
      });
    }

    // ! guest 일 경우,
    // ! 클라이언트 쪽에서 res.data.message에 따라 분기를 한다.
    // ! < 주의 > res.status 로 분기를 할 304로 인해 문제가 생길 수 있다.
    if (isGuest && !isRegistered) {
      res.status(201).json({ message: 'guest', permission });
    } else if (isGuest && isRegistered) {
      if (permission === 'teacher') {
        res.status(202).json({
          message: 'waiting',
          institutionId: isRegistered,
          permission,
        });
      } else if (permission === 'parent') {
        res.status(202).json({
          message: 'waiting',
          childName: isRegistered.dataValues.name,
          permission,
        });
      }
    } else {
      // ! permission 에 따른 분기 (1) institution (2) teacher (3) parent
      // ! (1) institution
      if (permission === 'institution') {
        const userInfo = await user.findOne({
          where: {
            id: userId,
          },
          include: institution,
        });
        const institutionId = userInfo.institution.id;

        const ElUserId = userId;

        const ElInstitutionName = userInfo.institution.name;

        const ElInstitutionId = institutionId;

        const ElProfileImg = userInfo.institution.profileImg;

        const ElTimetable = userInfo.institution.timetable;

        const ElNotice = await notice.findAll({
          limit: 10,
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          where: {
            institutionId,
          },
          attributes: [['id', 'noticeId'], 'title', 'createdAt'],
        });

        const ElAlbum = await album.findAll({
          limit: 6,
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          where: {
            institutionId,
          },
          attributes: [['id', 'albumId'], 'photo'],
        });

        res.status(200).json({
          userId: ElUserId,
          institutionName: ElInstitutionName,
          institutionId: ElInstitutionId,
          profileImg: ElProfileImg,
          timetable: ElTimetable,
          notice: ElNotice,
          album: ElAlbum,
          message: 'main page : director',
        });
      }
      // ! (2) teacher
      else if (permission === 'teacher') {
        const userInfo = await user.findOne({
          where: {
            id: userId,
          },
          include: institution,
        });
        const institutionId = userInfo.institution.id;

        const ElUserId = userId;

        const ElInstitutionName = userInfo.institution.name;

        const ElInstitutionId = institutionId;

        const ElProfileImg = userInfo.institution.profileImg;

        const ElTimetable = userInfo.institution.timetable;

        const ElNotice = await notice.findAll({
          limit: 5,
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          where: {
            institutionId,
          },
          attributes: [['id', 'noticeId'], 'title', 'createdAt'],
        });

        const ElIndiNotice = await indiNotice.findAll({
          limit: 5,
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          // ! asdfasdf indiNotice의 userId는 teacher만 값을 갖고, 작성자로 간주한다.
          where: {
            userId,
          },
          attributes: [
            ['id', 'noticeId'],
            ['content', 'contents'],
            'createdAt',
          ],
        });

        const ElAlbum = await album.findAll({
          limit: 6,
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          where: {
            institutionId,
          },
          attributes: [['id', 'albumId'], 'photo'],
        });

        res.status(200).json({
          userId: ElUserId,
          institutionName: ElInstitutionName,
          institutionId: ElInstitutionId,
          profileImg: ElProfileImg,
          timetable: ElTimetable,
          notice: ElNotice,
          album: ElAlbum,
          indiNotice: ElIndiNotice,
          message: 'main page : teacher',
        });
      }
      // ! (3) parent
      else if (permission === 'parent') {
        const childrenInfo = await children.findAll({
          where: {
            userId,
          },
          attributes: [
            ['id', 'childId'],
            ['name', 'childName'],
            'profileImg',
            ['classsId', 'classId'],
          ],
        });

        // ! child가 없으면 에러가 날까?
        // => (child가 없이 main data를 받을 일이 없음.)
        // (1) child 등록 전 parent는 guest
        // (2) child 등록을 하더라도 승인 전에는 guest
        // => 결국 child가 없다면 애초에 guest 조건으로 빠진다.

        // ! child가 승인 전이라면,
        // ! 즉, classId 가 null이라면 아예 해당 child의 data를 보내주지 않겠다.

        const approvedChildrenInfo = childrenInfo.filter(
          (child) => child.dataValues.classId,
        );

        for (let i = 0; i < approvedChildrenInfo.length; i++) {
          // ! userId
          approvedChildrenInfo[i].dataValues['userId'] = userId;

          // ! className
          const classsInfo = await classs.findOne({
            where: { id: approvedChildrenInfo[i].dataValues.classId },
            attributes: ['name', 'institutionId'],
          });

          approvedChildrenInfo[i].dataValues['className'] = classsInfo.name;
          approvedChildrenInfo[i].dataValues['institutionId'] =
            classsInfo.institutionId;

          // ! institution, timetable
          const institutionInfo = await institution.findOne({
            // ! 죽음의 .dataValues
            where: { id: approvedChildrenInfo[i].dataValues.institutionId },
            attributes: ['name', 'timetable'],
          });
          approvedChildrenInfo[i].dataValues['institutionName'] =
            institutionInfo.name;
          approvedChildrenInfo[i].dataValues['timetable'] =
            institutionInfo.timetable;

          // ! notice
          const noticeInfo = await notice.findAll({
            limit: 5,
            order: [
              ['createdAt', 'DESC'],
              ['id', 'DESC'],
            ],
            where: {
              institutionId: approvedChildrenInfo[i].dataValues.institutionId,
            },
            attributes: [['id', 'noticeId'], 'title', 'createdAt'],
          });
          approvedChildrenInfo[i].dataValues['notice'] = noticeInfo;

          // ! indiNotice
          const indiNoticeInfo = await indiNotice.findAll({
            limit: 5,
            order: [
              ['createdAt', 'DESC'],
              ['id', 'DESC'],
            ],
            // ! 죽음의 .dataValues
            where: { childId: approvedChildrenInfo[i].dataValues.childId },
            attributes: [
              ['id', 'noticeId'],
              ['content', 'contents'],
              'createdAt',
            ],
          });
          approvedChildrenInfo[i].dataValues['indiNotice'] = indiNoticeInfo;

          // ! album
          const albumInfo = await album.findAll({
            limit: 6,
            order: [
              ['createdAt', 'DESC'],
              ['id', 'DESC'],
            ],
            where: {
              institutionId: approvedChildrenInfo[i].dataValues.institutionId,
            },
            attributes: [['id', 'albumId'], 'photo'],
          });
          approvedChildrenInfo[i].dataValues['album'] = albumInfo;
        }

        res.status(200).json(approvedChildrenInfo);
      }
    }
  },
};
