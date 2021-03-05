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

    const { childId, array } = req.body;
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

      const ElTimetable = userInfo.institutions[0].timetable;
      const ElInstitution = {
        name: userInfo.institutions[0].name,
        image: userInfo.institutions[0].photo,
      };

      const ElNotice = await notice.findAll({
        limit: 10,
        order: [
          ['createdAt', 'DESC'],
          ['id', 'DESC'],
        ],
        where: {
          institutionId,
        },
        attributes: [['id', 'noticeId'], 'title', ['createdAt', 'create_at']],
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
        attributes: [
          ['id', 'imageId'],
          ['photo', 'image_url'],
        ],
      });

      res.status(200).json({
        timetable: ElTimetable,
        institution: ElInstitution,
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

      const ElTimetable = userInfo.institutions[0].timetable;
      const ElInstitution = {
        name: userInfo.institutions[0].name,
        image: userInfo.institutions[0].photo,
      };

      const ElNotice = await notice.findAll({
        limit: 5,
        order: [
          ['createdAt', 'DESC'],
          ['id', 'DESC'],
        ],
        where: {
          institutionId,
        },
        attributes: [['id', 'noticeId'], 'title', ['createdAt', 'create_at']],
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
          ['createdAt', 'create_at'],
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
        attributes: [
          ['id', 'imageId'],
          ['photo', 'image_url'],
        ],
      });

      res.status(200).json({
        timetable: ElTimetable,
        institution: ElInstitution,
        notice: ElNotice,
        album: ElAlbum,
        indiNotice: ElIndiNotice,
        message: 'main page : teacher',
      });
    }
    // ! (3) parent
    else if (permission === 'parent') {
      const userInfo = await user.findOne({
        where: {
          id: userId,
        },
        include: institution,
      });

      // ! asdfasdf
      const ElChildren = await children.findAll({
        // order: [
        //   ['createdAt', 'DESC'],
        //   ['id', 'DESC'],
        // ],
        where: {
          userId,
        },
        attributes: [
          ['id', 'childrenId'],
          ['name', 'childrenName'],
          ['profileImg', 'childrenImage'],
          'classsId',
          // 'className'
          // 'institution'
        ],
      });
      ElChildren.childrenId;
      // const qweqwe = await classs.findOne({
      //   where: { id: ElChildren.classsId },
      // });

      res.status(200).json({
        // qweqwe,
        children: ElChildren,
        1: array[2],
        // childId,
      });
      return;
    }
  },
};
