const express = require('express');
const router = express.Router();

const noticeController = require('../controllers/notice');
/**
 * @swagger
 * tags:
 *   name: Notice
 *   description: 공지사항 조회, 작성, 수정, 삭제
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
 *       category: 
 *         type: string
 *         description: notice or evnet
 *       writer: 
 *         type: string
 *         description: 작성자
 *       title: 
 *         type: string
 *         description: 공지사항 제목
 *       content: 
 *         type: string
 *         description: 내용
 *       institutionId: 
 *         type: number
 *         description: 기관 id 
 *       createdAt: 
 *         type: string
 *         description: 생성일
 */

/**
 * @swagger
 * /notice:
 *   post:
 *     summary:
 *       - 공지사항 조회
 *     tags: [Notice]
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
 *         name: 
 *         required: true
 *         description: <childId 부모의 경우 필수> <title 글 업로드시 필수> <content  글 업로드시 필수> <category  글 업로드시 필수>
 *         schema:
 *           type: object
 *           properties:
 *             childId:
 *               type: number
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
 *             ElEvent:
 *               type: array
 *               description : 행사
 *               items:
 *                 $ref: '#/definitions/Notice'
 *             ElNotice:
 *               type: array
 *               description : 행사
 *               items:
 *                 $ref: '#/definitions/Notice'
 *             noticeInfo:
 *               type: array
 *               description : 행사
 *               items:
 *                 $ref: '#/definitions/Notice'
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
