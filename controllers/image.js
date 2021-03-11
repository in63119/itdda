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
    // ! asdfasdf
    console.log(123, req);
    console.log(234, req.file);
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

  // ! /image/album 으로 record를 먼저 만들어준 후, /image/~ 로 album 테이블의 photo field 를 업데이트 해준다.
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
        res.json({ message: 'read only', albumInfo });
      }
      // ! 작성 시
      else {
        const childInfo = await children.findOne({
          where: { id: childId },
          attributes: ['institutionId'],
        });

        const institutionId = childInfo.dataValues.institutionId;

        const newAlbum = await album.create({
          title,
          content,
          institutionId,
          userId,
        });

        const newAlbumId = newAlbum.dataValues.id;

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

        res.json({ message: 'write and read', albumInfo, albumId: newAlbumId });
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
        res.json({ message: 'read only', albumInfo });
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

        res.json({ message: 'write and read', albumInfo, albumId: newAlbumId });
      }
    }
  },

  albumPost: async (req, res) => {
    const photo = req.body.photo;
    res.json(photo);
  },
};
