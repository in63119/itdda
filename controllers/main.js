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
    // ! permission 에 따른 분기 (1) institution (2) teacher (3) parent
    // ! (1) institution
    if (permission === 'institution') {
      const userInfo = await user.findOne({
        where: {
          id: userId,
        },
        include: institution,
      });
      const institutionId = userInfo.institutions[0].id;

      const ElUserId = userId;

      const ElInstitutionName = userInfo.institutions[0].name;

      const ElInstitutionId = institutionId;

      const ElProfileImg = userInfo.institutions[0].profileImg;

      const ElTimetable = userInfo.institutions[0].timetable;

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
      const institutionId = userInfo.institutions[0].id;

      const ElUserId = userId;

      const ElInstitutionName = userInfo.institutions[0].name;

      const ElInstitutionId = institutionId;

      const ElProfileImg = userInfo.institutions[0].profileImg;

      const ElTimetable = userInfo.institutions[0].timetable;

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
        attributes: [['id', 'noticeId'], ['content', 'contents'], 'createdAt'],
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
      const ElChildren = await children.findAll({
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

      // ! ElChildren에 추가하는 형태로 가겠다 (.dataValues 주의)
      for (let i = 0; i < ElChildren.length; i++) {
        // ! userId
        ElChildren[i].dataValues['userId'] = userId;

        // ! className
        const classsInfo = await classs.findOne({
          where: { id: ElChildren[i].dataValues.classId },
          attributes: ['name', 'institutionId'],
        });
        ElChildren[i].dataValues['className'] = classsInfo.name;
        ElChildren[i].dataValues['institutionId'] = classsInfo.institutionId;

        // ! institution, timetable
        const institutionInfo = await institution.findOne({
          // ! 죽음의 .dataValues
          where: { id: ElChildren[i].dataValues.institutionId },
          attributes: ['name', 'timetable'],
        });
        ElChildren[i].dataValues['institutionName'] = institutionInfo.name;
        ElChildren[i].dataValues['timetable'] = institutionInfo.timetable;

        // ! notice
        const noticeInfo = await notice.findAll({
          limit: 5,
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          where: { institutionId: ElChildren[i].dataValues.institutionId },
          attributes: [['id', 'noticeId'], 'title', 'createdAt'],
        });
        ElChildren[i].dataValues['notice'] = noticeInfo;

        // ! indiNotice
        const indiNoticeInfo = await indiNotice.findAll({
          limit: 5,
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          // ! 죽음의 .dataValues
          where: { childId: ElChildren[i].dataValues.childId },
          attributes: [
            ['id', 'noticeId'],
            ['content', 'contents'],
            'createdAt',
          ],
        });
        ElChildren[i].dataValues['indiNotice'] = indiNoticeInfo;

        // ! album
        const albumInfo = await album.findAll({
          limit: 6,
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          where: { institutionId: ElChildren[i].dataValues.institutionId },
          attributes: [['id', 'albumId'], 'photo'],
        });
        ElChildren[i].dataValues['album'] = albumInfo;
      }

      res.status(200).json(ElChildren);
    }
  },
};
