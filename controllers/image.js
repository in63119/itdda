const { user, album } = require('../models');
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
    console.log(req.file);
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

  album: async (req, res) => {
    // ! 클라이언트와 협의 후 작성해야 함. (클라이언트에서 어떤식으로 서버에 데잍터를 보낼 것인가?)
    console.log(123, req.headers);
    console.log(234, req.body);
    res.json({ message: 'ok' });
    /*
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId, permission } = accessTokenData; // ! 유저의 id

    const { childId, photo, title, content } = req.body;

    if (permission === 'parent') {
      if (1) {
      }
    } else {
      const userInfo = await user.findOne({
        where: { id: userId },
        attributes: ['institutionId'],
      });
      const institutionId = userInfo.dataValues.institutionId;
      if (!photo) {
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

        res.json({ albumInfo });
      } else {
        // ! asdfasdf ========================
        const image = req.file;
        // ! asdfasdf
        console.log(req.file);
        if (!image) {
          res.status(201).json({ message: 'image not sent' });
        } else {
          const imageURL = req.file.location;
          if (imageURL === undefined) {
            return res.status(400).json({ message: '서버에 문의해주세요' });
          }
          res.status(200).json({ message: 'image uploaded', imageURL });
        }
        // ! ==================================

        await album.create({
          photo,
          title,
          content,
        });

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

        res.json({ albumInfo });
      }
    }
*/
  },
};
