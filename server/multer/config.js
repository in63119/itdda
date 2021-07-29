const multer = require('multer');
const aws = require('aws-sdk');
var multerS3 = require('multer-s3');

const s3 = new aws.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.REGION,
});
const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'datda-img',
		contentType: multerS3.AUTO_CONTENT_TYPE, // ! 콘텐츠 타입을 자동으로 세팅(이 설정을 하지 않을 경우, 해당 사진이 저장된 URL로 입장 시 사진다운로드가 진행됨)
		acl: 'public-read', // ! 클라이언트에서 자유롭게 가용하기 위함
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString());
		},
	}),
	// limits: { fileSize: 5 * 1024 * 1024 }, // ! 용량과 관련
});
// ! cf> 서버에 폴더 하나 만들어서 사진을 업로드 하고 싶다면 아래와 같이 하면 됨.
// const upload = multer({
//   dest: 'image/',
// });
module.exports = upload