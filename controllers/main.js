const {
  user,
  timetable,
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

      const ElTimetable = userInfo.institutions[0].timetable;

      // ! timetable table 하나 더 만들 시
      // const ElTimetable = await timetable.findAll({
      //   order: [['step', 'ASC']],
      //   where: {
      //     institutionId,
      //   },
      //   attributes: ['step', 'time', 'contents'],
      // });

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

      // ! timetable table 하나 더 만들 시
      // const ElTimetable = await timetable.findAll({
      //   order: [['step', 'ASC']],
      //   where: {
      //     institutionId,
      //   },
      //   attributes: ['step', 'time', 'contents'],
      // });

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
      // const userInfo = await user.findOne({
      //   where: {
      //     id: userId,
      //   },
      //   include: institution,
      // });

      // ! asdfasdf 이거 부모는 ... => 아이의 class 로 연결 연결해서 ...
      // const institutionId = userInfo.institutions[0].id;

      const ElChildren = await children.findAll({
        where: {
          userId,
        },
        attributes: [
          ['id', 'childrenId'],
          ['name', 'childrenName'],
          ['profileImg', 'childrenImage'],
          'classsId',
        ],
      });

      // ! ElChildren에 추가하는 형태로 가겠다 (.dataValues 주의)
      for (let i = 0; i < ElChildren.length; i++) {
        // ! className
        const classsInfo = await classs.findOne({
          where: { id: ElChildren[i].classsId },
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
        ElChildren[i].dataValues['institution'] = institutionInfo.name;
        ElChildren[i].dataValues['timetable'] = institutionInfo.timetable;

        // ! timetable table 하나 더 만들 시
        // const timetableInfo = await timetable.findAll({
        //   order: [['step', 'ASC']],
        //   where: { institutionId: ElChildren[i].dataValues.institutionId },
        //   attributes: ['step', 'time', 'contents'],
        // });
        // ElChildren[i].dataValues['timetable'] = timetableInfo;

        // ! notice
        const noticeInfo = await notice.findAll({
          limit: 5,
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          where: { institutionId: ElChildren[i].dataValues.institutionId },
          attributes: [['id', 'noticeId'], 'title', ['createdAt', 'create_at']],
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
          where: { childId: ElChildren[i].dataValues.childrenId },
          attributes: [
            ['id', 'noticeId'],
            ['content', 'contents'],
            ['createdAt', 'create_at'],
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
          attributes: [
            ['id', 'imageId'],
            ['photo', 'image_url'],
          ],
        });
        ElChildren[i].dataValues['album'] = albumInfo;
      }

      res.status(200).json(ElChildren);

      // const ElAlbum = await album.findAll({
      //   limit: 6,
      //   order: [
      //     ['createdAt', 'DESC'],
      //     ['id', 'DESC'],
      //   ],
      //   where: {
      //     institutionId,
      //   },
      //   attributes: [
      //     ['id', 'imageId'],
      //     ['photo', 'image_url'],
      //   ],
      // });

      // res.status(200).json({
      //   timetable: ElTimetable,
      //   institution: ElInstitution,
      //   notice: ElNotice,
      //   album: ElAlbum,
      //   indiNotice: ElIndiNotice,
      //   message: 'main page : teacher',
      // });
    }
  },
};
