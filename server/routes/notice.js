const express = require('express');
const router = express.Router();

const noticeController = require('../controllers/notice');
/**
 * @swagger
 * tags:
 *   name: Notice
 *   description: 공지사항 list, 수정, 삭제
 * definitions:
 *   Notice:
 *     type: object
 *     required:
 *       - noticeId 
 *       - title
 *       - createdAt
 *     properties:
 *       noticeId: 
 *         type: number
 *         description: 공지사항 id
 *       title: 
 *         type: string
 *         description: 공지사항 제목
 *       createdAt: 
 *         type: string
 *         description: 생성일
 */
//  *     parameters :
//  *        - in : query
//  *          name : category
//  *          required : false
//  *          schema : 
//  *            type : integer
//  *            description : 카테고리

router.post('/', noticeController.index);
/**
 * @swagger
 * /notice/:id:
 *   delete:
 *     summary:
 *       - 공지사항 삭제 
 *     tags: [Notice]
 *     parameters : 
 *       - in: query
 *         name: noticeId 
 *         required : true
 *         description: 공지사항 삭제 시 id 필수입니다.
 *         schema:
 *           type: number
 *       - in: header
 *         name: authorization
 *         required : true
 *         description: access Token 필수입니다.
 *         schema:
 *           type: string
 *           properties:
 *             authorization:
 *               type: string
 *     responses:
 *       200:
 *         description: successfully deleted
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description : successfully deleted
 */
router.delete('/:noticeId', noticeController.notice);

module.exports = router;
