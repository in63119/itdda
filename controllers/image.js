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
};
