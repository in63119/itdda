const express = require('express');
const router = express.Router();

const noticeController = require('../controllers/notice');
/**
 * @swagger
 * tags:
 *   name: Notice
 *   description: 공지사항 작성, 수정, 삭제
 * definitions:
 *   Notice:
 *     type: object
 *     required:
 *       - no성ticeId 
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

router.post('/', noticeController.index);
/**
 * @swagger
 * /notice?id={id}:
 *   delete:
 *     summary:
 *       - 공지사항 삭제 
 *     tags: [Notice]
 *     parameters : 
 *       - in: query
 *         name: id 
 *         required : true
 *         description: 공지사항 삭제 시 noticeId 필수입니다.
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
router.delete('/', noticeController.deleteNotice);
/**
 * @swagger
 * /notice?id={id}:
 *   put:
 *     summary:
 *       - 공지사항 수정 
 *     tags: [Notice]
 *     parameters : 
 *       - in: query
 *         name: id 
 *         required : true
 *         description: 공지사항 수정 시 noticeId 필수입니다.
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
 *       - in: body
 *         name: updateNotice
 *         required : true
 *         description: body 객체에서 category는 필수적으로 존재 해야합니다. 수정이 필요한 요소가 있다면 해당 요소만 {key:avlue}로 보내주시면 됩니다.
 *         schema:
 *           type: object
 *           properties:
 *             category:
 *               type: string
 *             title:
 *               type: string
 *             content:
 *               type: string
 *     responses:
 *       200:
 *         description: successfully updated
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description : successfully updated
 */
router.put('/', noticeController.updateNotice);
module.exports = router;
