const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Main
 *   description: Main 화면의 전반적인 데이터 모음
 * definitions:
 *   Album:
 *     type: object
 *     required:
 *       -  albumId
 *       -  photo
 *     properties:
 *       albumId:
 *         type: number
 *         description: 해당기관의 앨범 id
 *       photo:
 *         type: string
 *         description: 해당기관의 사진 url
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
 *   Children:
 *     type: object
 *     required:
 *       - userId
 *       - childId
 *       - childName
 *       - profileImg
 *       - institu름ionName
 *       - institutionId
 *       - timetable
 *       - notice
 *       - indiNotice
 *       - album
 *     properties:
 *       userId: 
 *         type: number
 *         description: 부모의 id 
 *       childId: 
 *         type: number
 *         description: 아이의 id 
 *       childName: 
 *         type: string 
 *         description: 아이의 이 
 *       profileImg: 
 *         type: string 
 *         description: 프로필 사진 주소 
 *       institutionName: 
 *         type: string 
 *         description: 아이가 소속된 기관의 이름 
 *       institutionId: 
 *         type: number 
 *         description: 아이가 소속된 기관의 id 
 *       timetable: 
 *         type: string 
 *         description: 아이가 소속된 기관의 시간표 
 *       notice: 
 *         type: array
 *         items:
 *           $ref: '#/definitions/Notice' 
 *         description: 아이가 소속된 기관의 공지사항 5개
 *       indiNotice:
 *         type: array
 *         items:
 *           $ref: '#/definitions/IndiNotice' 
 *         description: 아이가 소속된 기관의 알림장 5개
 *       album: 
 *         type: array
 *         items:
 *           $ref: '#/definitions/Album' 
 *         description: 아이가 소속된 기관의 앨범 6개 
 */

const mainController = require('../controllers/main');
/**
 * @swagger
 * /main:
 *   get:
 *     summary: 
 *     -  로그인된 사용자의 token을 기준으로 permission에 맞는 데이터 응답
 *     tags: [Main]
 *     consumes : 
 *     - application/json
 *     parameters : 
 *       - in: header 
 *         name : authorization
 *         required : true
 *         description : 로그인 후 획득한 access token 필수
 *         schema : 
 *           type : string
 *     responses:
 *       200:
 *         description: 기관장 로그인시 정상응답. 200으로 응답 됩니다.!! 
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: number
 *               description : 원장(user)의 id 
 *             institutionName:
 *               type : string
 *               description : 기관의 이름 
 *             institutionId:
 *               type : number
 *               description : 기관의 id
 *             profileImg:
 *               type : string
 *               description : 프로필 사진 
 *             timetable:
 *               type : string
 *               description : 시간표는 string으로 응답하지만 클라이언트에서 배열로 치환하여 사용해야 합니다. 
 *             notice: 
 *               type : array
 *               items :
 *                 $ref: '#/definitions/Notice'
 *             album:
 *                type: array
 *                items :
 *                  $ref: '#/definitions/Album' 
 *       201:
 *         description: 선생님 로그인시 정상응답. 200으로 응답 됩니다.!! 
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: number
 *               description : 원장(user)의 id 
 *             institutionName:
 *               type : string
 *               description : 기관의 이름 
 *             institutionId:
 *               type : number
 *               description : 기관의 id
 *             profileImg:
 *               type : string
 *               description : 프로필 사진 
 *             timetable:
 *               type : string
 *               description : 시간표는 string으로 응답하지만 클라이언트에서 배열로 치환하여 사용해야 합니다. 
 *             notice: 
 *               type : array
 *               description : 공지사항 배열 5개 
 *               items :
 *                 $ref: '#/definitions/Notice'
 *             indiNotice:
 *               type : array
 *               description : 알림장 배열 5개
 *               items : 
 *                 $ref: '#/definitions/IndiNotice'
 *             album:
 *               type : array
 *               description : 앨범 배열 6개 
 *               items : 
 *                 $ref: '#/definitions/Album' 
 *       202:
 *         description: 학부모 로그인시 정상응답. 200으로 응답 됩니다.!! 
 *         schema:
 *           type: object
 *           properties:
 *             children:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Children'
 * 
 */
router.get('/', mainController.index);

module.exports = router;
