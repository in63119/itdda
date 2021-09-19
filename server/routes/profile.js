const express = require('express');
const router = express.Router();
const upload = require('../multer/config')

/**
 * @swagger
 * tags:
 *   name: Profile 
 *   description: Profile 이미지 관련
 */

const profileController = require('../controllers/profile');
/**
 * @swagger
 * /profile:
 *   post:
 *     summary: 
 *       - 프로필 
 *     tags: [Profile]
 *     parameters : 
 *       - in: header
 *         name: authorization
 *         required : true
 *         description: access Token 필수입니다.
 *         schema:
 *           type: string
 *           properties:
 *             authorization:
 *               type: string
 *       - in: body
 *         name: childId
 *         required : false
 *         description: 기관 또는 선생님일 경우 body 필요 없으나, 부모일 경우 childId 필수
 *         schema:
 *           type: object
 *           required:
 *             - image 
 *           properties:
 *             childId:
 *               type: number
 *     responses:
 *       200:
 *         description: successfully response
 *         schema:
 *           type: object
 *           properties:
 *             profileImg:
 *               type: string
 *             name:
 *               type : string
 *             email:
 *               type : string
 *             mobile:
 *               type : string
 */
router.post('/', profileController.index);
/**
 * @swagger
 * /profile:
 *   put:
 *     summary: 
 *       - 프로필 사진 수정 
 *     tags: [Profile]
 *     parameters : 
 *       - in: header
 *         name: authorization
 *         required : true
 *         description: access Token 필수입니다.
 *         schema:
 *           type: string
 *           properties:
 *             authorization:
 *               type: string
 *       - in: body
 *         name: profileImage
 *         required : true
 *         description: 프로필 사진 변경시 body에 이미지를 제공해주세요
 *         schema:
 *           type: object
 *           required:
 *             - image 
 *           properties:
 *             profileImg:
 *               type: string
 *     responses:
 *       200:
 *         description: successfully response
 *         schema:
 *           type: object
 *           properties:
 *             profileImg:
 *               type: string
 *             name:
 *               type : string
 *             email:
 *               type : string
 *             mobile:
 *               type : string
 */
router.put('/', upload.single('image'), profileController.modifyProfile);
router.post('/searchinstitution', profileController.searchInstitution);
router.post('/parentregister', profileController.parentRegister);

module.exports = router;
