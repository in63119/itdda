const express = require('express');
const router = express.Router();
const upload = require('../multer/config')


const imageController = require('../controllers/image');

router.post('/', upload.single('image'), imageController.index);
router.post('/s3', upload.single('image'), imageController.S3);
router.post('/album', imageController.album);
router.post('/albumpost', upload.single('image'), imageController.albumPost);
router.post('/food', imageController.food);
router.post('/foodpost', upload.single('image'), imageController.foodPost);
router.post('/profile', imageController.profile);
router.post(
	'/profilepost',
	upload.single('image'),
	imageController.profilePost,
);

// ! asdfasdf 여러 사진을 한번에 업로드 하는 것도 금방 구현하니깐, 필요한 부분이라고 생각되면 합시다.
// app.post('/upload', upload.array('photos', 3), function (req, res, next) {
//   res.send('Successfully uploaded ' + req.files.length + ' files!');
// });

module.exports = router;
