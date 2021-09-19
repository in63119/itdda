const express = require('express');
const router = express.Router();

const institutionController = require('../controllers/institution');

/**
 * @swagger
 * tags:
 *   name: Institution 
 *   description: 기관설정 ,선생님 승인, 시간표 등록
 */

/**
 * @swagger
 * /institution:
 *   put:
 *     summary: 
 *       - 회원 로그인 
 *     tags: [Institution]
 *     parameters : 
 *       - in: body
 *         name: login
 *         required : true
 *         description: 회원 로그인시 body에 email, password 작성 필
 *         schema:
 *           type: object
 *           required:
 *             - emai인
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
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
router.post('/', institutionController.index);
router.post('/approve', institutionController.approve);
router.get('/classlist', institutionController.classList);
router.post('/changeteacherclass', institutionController.changeTeacherClass);
router.post('/manageclass', institutionController.manageClass);
router.post('/timetable', institutionController.timetable);

module.exports = router;
