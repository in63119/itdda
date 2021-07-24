const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: 회원가입, 로그인, Oauth 관련 
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 
 *       - 회원 로그인 
 *     tags: [Authentication]
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
// /**
//  * @swagger
//  * /auth:
//  *   get:
//  *     summary: 
//  *     - 회원 로그인 
//  *     tags: [User]
//  *     parameters : 
//  *       - in: body
//  *         name: user
//  *         description: The user to create.
//  *         schema:
//  *           type: object
//  *           required:
//  *             - userName
//  *           properties:
//  *             userName:
//  *               type: string
//  *             firstName:
//  *               type: string
//  *             lastName:
// 	*              type: string    
//  *     responses:
//  *       200:
//  *         description: login infomation 
//  *         schema:
//  *           type: object
//  *           properties:
//  *             auth:
//  *               type: object
//  *               items:
//  */

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/signup', authController.signup);
router.post('/isemail', authController.isEmail);
router.post('/institution', authController.institution);
router.post('/hashtest', authController.hashTest);

module.exports = router;
