const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile');
/**
 * @swagger
 * /profile:
 *   put:
 *     summary: 
 *       - 프로필 사진 수정 
 *     tags: [Institution]
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
 *             profileImage:
 *               type: string
 *     responses:
 *       200:
 *         description: successfully login
 *         schema:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *             permission:
 *               type : string
 *             message:
 *               type : string
 *               description : datda login succeeded 
 *       201:
 *         description: Created
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description : email does not exist
 *       202:
 *         description: Accepted
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description : wrong password
 */
router.post('/', profileController.index);
router.post('/searchinstitution', profileController.searchInstitution);
router.post('/parentregister', profileController.parentRegister);

module.exports = router;
