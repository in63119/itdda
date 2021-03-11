const { user, album, children } = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');

module.exports = {
  index: async (req, res) => {
    const image = req.file;
    if (!image) {
      res.status(201).json({ message: 'image not sent' });
    } else {
      const imagePath = req.file.path;
      if (imagePath === undefined) {
        return res.status(400).json({ message: '서버에 문의해주세요' });
      }
      res.status(200).json({ imagePath });
    }
  },

  S3: async (req, res) => {
    const image = req.file;
    if (!image) {
      res.status(201).json({ message: 'image not sent' });
    } else {
      const imageURL = req.file.location;
      if (imageURL === undefined) {
        return res.status(400).json({ message: '서버에 문의해주세요' });
      }
      res.status(200).json({ message: 'image uploaded', imageURL });
    }
  },

  profileImg: async (req, res) => {
    res.json({ message: 'near' });
  },

  // ! /image/album 으로 record를 먼저 만들어준 후, /image/albumpost 로 album 테이블의 photo field 를 업데이트 해준다.
  // ! 위와 관련한 비효율에 관해서는 추후에 좀 더 공부를 한 후 리팩토링합시다.
  album: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId, permission } = accessTokenData;

    const { childId, title, content } = req.body;
    // ! permission 이 parent
    if (permission === 'parent') {
      // ! 열람 시
      if (!title) {
        const childInfo = await children.findOne({
          where: { id: childId },
          attributes: ['institutionId'],
        });

        const institutionId = childInfo.dataValues.institutionId;

        const albumInfo = await album.findAll({
          where: { institutionId },
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          attributes: [
            ['id', 'albumId'],
            'photo',
            'title',
            'content',
            'institutionId',
            'createdAt',
          ],
        });
        res.json({ message: 'album read only', albumInfo });
      }
      // ! 작성 시 => 부모는 album에 작성을 하지 못한다.
      else {
        res.json({
          message:
            'parents are not supposed to write new album! this does not happen in real cases',
        });
      }
    }
    // ! permission 이 institution/teacher
    else {
      // ! 열람 시
      if (!title) {
        const userInfo = await user.findOne({
          where: { id: userId },
          attributes: ['institutionId'],
        });

        const institutionId = userInfo.dataValues.institutionId;

        const albumInfo = await album.findAll({
          where: { institutionId },
          order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
          ],
          attributes: [
            ['id', 'albumId'],
            'photo',
            'title',
            'content',
            'institutionId',
            'createdAt',
          ],
        });
        res.json({ message: 'album read only', albumInfo });
      }
      // ! 작성 시
      else {
        const userInfo = await user.findOne({
          where: { id: userId },
          attributes: ['institutionId'],
        });

        const institutionId = userInfo.dataValues.institutionId;

        const newAlbum = await album.create({
          title,
          content,
          institutionId,
          userId,
        });

        const newAlbumId = newAlbum.dataValues.id;

        res.json({ message: 'write new album', albumId: newAlbumId });
      }
    }
  },

  albumPost: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId } = accessTokenData;
    // ! for postman
    // const userId = asdf

    const userInfo = await user.findOne({
      where: { id: userId },
      attributes: ['institutionId'],
    });
    const institutionId = userInfo.dataValues.institutionId;

    const image = req.file;
    if (!image) {
      res.status(201).json({ message: 'image not sent' });
    } else {
      const imageURL = req.file.location;
      if (imageURL === undefined) {
        return res.status(400).json({ message: '서버에 문의해주세요' });
      }

      // ! asdfasdf
      // ! udate 관련하여, 에러 상황에서도 가장 최신에 작성된 record만 update 될 수 있게 하는 쿼리문이 분명 있을터이니, 후에 찾아보도록.
      await album.update(
        { photo: imageURL },
        { where: { userId, photo: null } },
      );

      const albumInfo = await album.findAll({
        where: { institutionId },
        order: [
          ['createdAt', 'DESC'],
          ['id', 'DESC'],
        ],
        attributes: [
          ['id', 'albumId'],
          'photo',
          'title',
          'content',
          'institutionId',
          'createdAt',
        ],
      });

      res.status(200).json({ message: 'image uploaded', albumInfo });
    }
  },
};
