const express = require('express');
const router = express.Router();

const indiNoticeController = require('../controllers/indiNotice');
/**
 * @swagger
 * tags:
 *   name: IndiNotice
 *   description: 알림장 작성, 수정, 삭제
 * definitions:
 *   IndiNotice:
 *     type: object
 *     required:
 *       - noticeId 
 *       - contents
 *       - createdAt
 *     properties:
 *       noticeId: 
 *         type: number
 *         description: 알림장 id
 *       contents: 
 *         type: string
 *         description: 알림장 제목
 *       createdAt: 
 *         type: string
 *         description: 생성일
 */
router.post('/', indiNoticeController.index);
router.get('/childrenlist', indiNoticeController.childrenList);
/**
 * @swagger
 * /indiNotice?id={id}:
 *   delete:
 *     summary:
 *       - 알림장 삭제 
 *     tags: [IndiNotice]
 *     parameters : 
 *       - in: query
 *         name: id 
 *         required : true
 *         description: 알림장 삭제 시 indiNoticeId는 필수입니다.
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
router.delete('/', indiNoticeController.indiNotice);
/**
 * @swagger
 * /indiNotice?id={id}:
 *   put:
 *     summary:
 *       - 알림장 수정
 *     tags: [IndiNotice]
 *     parameters : 
 *       - in: query
 *         name: id 
 *         required : true
 *         description: 알림장 수정 시 indiNoticeId 필수입니다.
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
 *         name: updateIndiNotice
 *         required : true
 *         description:  수정이 필요한 요소가 있다면 해당 요소만 {key:avlue}로 보내주시면 됩니다.
 *         schema:
 *           type: object
 *           properties:
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
router.put('/', indiNoticeController.updateIndiNotice);
module.exports = router;
