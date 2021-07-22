const express = require('express');
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: 회원가입, 로그인, Oauth 관련 
 */

const authController = require('../controllers/auth');

//  *     parameters :
//  *        - in : query
//  *          name : category
//  *          required : false
//  *          schema : 
//  *            type : integer
//  *            description : 카테고리
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 
 *       - 회원 로그인 
 *     tags: [Authentication]
 *     parameters : 
 *       - in: body
 *         name: user
 *         description: 회원 로그인 입니다. 
 *         required : true
 *         schema:
 *           type: object
 *           required:
 *             - email
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
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/signup', authController.signup);
router.post('/isemail', authController.isEmail);
router.post('/institution', authController.institution);
router.post('/hashtest', authController.hashTest);

module.exports = router;
