const { user, children, indiNotice, classs } = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');

module.exports = {
	index: async (req, res) => {
		const accessTokenData = checkAccessToken(req, res);
		if (!accessTokenData || accessTokenData === 'invalid token') {
			return;
		}

		const { userId, permission } = accessTokenData;

		// ! (1) indiNotice 테이블에서 userId는 작성자의 역할을 한다.
		// ! => teacher 와 parent 가 알림장을 작성할 수 있다.
		// ! => teacher 와 parent 는 자신과 관련한 알림장만 열람 가능하다.
		// ! => institution 은 알림장을 열람하지도 못한다.
		// ! (2) indiNotice 테이블에서 teacherId는 해당 알림장과 관련이 있는 teacher의 userId 이다.

		// ! (1) permission 이 parent 인 경우
		if (permission === 'parent') {
			const childId = req.body.childId;
			const content = req.body.content;

			// ! 열람 시
			if (!content) {
				const indiNoticeInfo = await indiNotice.findAll({
					where: { childId },
					order: [
						['createdAt', 'DESC'],
						['id', 'DESC'],
					],
					attributes: [
						['id', 'indiNoticeId'],
						'content',
						'createdAt',
						'userId',
						'teacherId',
					],
					include: [
						{
							model: user,
							attributes: [
								['id', 'writterId'],
								['name', 'writterName'],
							],
						},
						{
							model: children,
							attributes: [
								['id', 'childId'],
								['name', 'childName'],
							],
						},
					],
				});

				let teacherName;
				if (indiNoticeInfo.length !== 0) {
					const teacherInfo = await user.findOne({
						where: { id: indiNoticeInfo[0].dataValues.teacherId },
						attributes: [['name', 'teacherName']],
					});
					teacherName = teacherInfo.dataValues.teacherName;
				}

				// ! asdfasdf 아래 2개는 클라이언트와 상의 후 넣을지 말지 결정하겠다.
				const teacherWrite = indiNoticeInfo.filter((indiNotice) => {
					return (
						indiNotice.dataValues.userId === indiNotice.dataValues.teacherId
					);
				});
				const teacherRead = indiNoticeInfo.filter((indiNotice) => {
					return (
						indiNotice.dataValues.userId !== indiNotice.dataValues.teacherId
					);
				});

				res.json({
					message: 'parent indiNotice',
					teacherName,
					indiNoticeInfo,
					teacherWrite,
					teacherRead,
				});
			}
			// ! 작성 시
			else {
				// ! child 와 관계된 teacher 의 userId 가 필요하다. =================
				const childInfo = await children.findOne({
					where: { id: childId },
					include: [{ model: classs, attributes: [['id', 'classId']] }],
				});
				const classId = childInfo.dataValues.classs.dataValues.classId;

				const teacherInfo = await user.findOne({
					where: { classsId: classId },
					attributes: [['id', 'teacherId']],
				});

				const teacherId = teacherInfo.dataValues.teacherId;
				// ! ===========================================================

				await indiNotice.create({
					content,
					childId,
					userId,
					teacherId,
				});

				const indiNoticeInfo = await indiNotice.findAll({
					where: { childId },
					order: [
						['createdAt', 'DESC'],
						['id', 'DESC'],
					],
					attributes: [
						['id', 'indiNoticeId'],
						'content',
						'createdAt',
						'userId',
						'teacherId',
					],
					include: [
						{
							model: user,
							attributes: [
								['id', 'writterId'],
								['name', 'writterName'],
							],
						},
						{
							model: children,
							attributes: [
								['id', 'childId'],
								['name', 'childName'],
							],
						},
					],
				});

				let teacherName;
				if (indiNoticeInfo.length !== 0) {
					const teacherInfo = await user.findOne({
						where: { id: indiNoticeInfo[0].dataValues.teacherId },
						attributes: [['name', 'teacherName']],
					});
					teacherName = teacherInfo.dataValues.teacherName;
				}

				// ! asdfasdf 아래 2개는 클라이언트와 상의 후 넣을지 말지 결정하겠다.
				const teacherWrite = indiNoticeInfo.filter((indiNotice) => {
					return (
						indiNotice.dataValues.userId === indiNotice.dataValues.teacherId
					);
				});
				const teacherRead = indiNoticeInfo.filter((indiNotice) => {
					return (
						indiNotice.dataValues.userId !== indiNotice.dataValues.teacherId
					);
				});

				res.json({
					message: 'parent indiNotice. new indiNotice written',
					teacherName,
					indiNoticeInfo,
					teacherWrite,
					teacherRead,
				});
			}
		}
		// ! (2) permission 이 teacher 인 경우
		else if (permission === 'teacher') {
			const childId = req.body.childId;
			const content = req.body.content;

			// ! 열람 시
			if (!content) {
				const indiNoticeInfo = await indiNotice.findAll({
					where: { teacherId: userId },
					order: [
						['createdAt', 'DESC'],
						['id', 'DESC'],
					],
					attributes: [
						['id', 'indiNoticeId'],
						'content',
						'createdAt',
						'userId',
						'teacherId',
					],
					include: [
						{
							model: user,
							attributes: [
								['id', 'writterId'],
								['name', 'writterName'],
							],
						},
						{
							model: children,
							attributes: [
								['id', 'childId'],
								['name', 'childName'],
							],
						},
					],
				});

				let teacherName;
				if (indiNoticeInfo.length !== 0) {
					const teacherInfo = await user.findOne({
						where: { id: indiNoticeInfo[0].dataValues.teacherId },
						attributes: [['name', 'teacherName']],
					});
					teacherName = teacherInfo.dataValues.teacherName;
				}

				// ! asdfasdf 아래 2개는 클라이언트와 상의 후 넣을지 말지 결정하겠다.
				const teacherWrite = indiNoticeInfo.filter((indiNotice) => {
					return (
						indiNotice.dataValues.userId === indiNotice.dataValues.teacherId
					);
				});
				const teacherRead = indiNoticeInfo.filter((indiNotice) => {
					return (
						indiNotice.dataValues.userId !== indiNotice.dataValues.teacherId
					);
				});

				res.json({
					message: 'teacher indiNotice',
					teacherName,
					indiNoticeInfo,
					teacherWrite,
					teacherRead,
				});
			}
			// ! 작성 시
			else {
				await indiNotice.create({
					content,
					childId,
					userId,
					teacherId: userId,
				});

				const indiNoticeInfo = await indiNotice.findAll({
					where: { teacherId: userId },
					order: [
						['createdAt', 'DESC'],
						['id', 'DESC'],
					],
					attributes: [
						['id', 'indiNoticeId'],
						'content',
						'createdAt',
						'userId',
						'teacherId',
					],
					include: [
						{
							model: user,
							attributes: [
								['id', 'writterId'],
								['name', 'writterName'],
							],
						},
						{
							model: children,
							attributes: [
								['id', 'childId'],
								['name', 'childName'],
							],
						},
					],
				});

				let teacherName;
				if (indiNoticeInfo.length !== 0) {
					const teacherInfo = await user.findOne({
						where: { id: indiNoticeInfo[0].dataValues.teacherId },
						attributes: [['name', 'teacherName']],
					});
					teacherName = teacherInfo.dataValues.teacherName;
				}

				// ! asdfasdf 아래 2개는 클라이언트와 상의 후 넣을지 말지 결정하겠다.
				const teacherWrite = indiNoticeInfo.filter((indiNotice) => {
					return (
						indiNotice.dataValues.userId === indiNotice.dataValues.teacherId
					);
				});
				const teacherRead = indiNoticeInfo.filter((indiNotice) => {
					return (
						indiNotice.dataValues.userId !== indiNotice.dataValues.teacherId
					);
				});

				res.json({
					message: 'teacher indiNotice. new indiNotice written',
					teacherName,
					indiNoticeInfo,
					teacherWrite,
					teacherRead,
				});
			}
		}
		// ! (3) permission 이 institution 인 경우
		else if (permission === 'institution') {
			res.json({
				message:
					'institution is not available for this request. this does not happen in real cases',
			});
		}
	},

	childrenList: async (req, res) => {
		const accessTokenData = checkAccessToken(req, res);
		if (!accessTokenData || accessTokenData === 'invalid token') {
			return;
		}

		const { userId, permission } = accessTokenData;

		if (permission === 'teacher') {
			const teacherInfo = await user.findOne({
				where: { id: userId },
				attributes: [['classsId', 'classId']],
			});

			const childrenInfo = await children.findAll({
				where: { classsId: teacherInfo.dataValues.classId },
				attributes: [
					['id', 'childId'],
					['name', 'childName'],
					['userId', 'parentId'],
					['classsId', 'classId'],
				],
			});
			res.json(childrenInfo);
		} else {
			res.json({
				message:
					'this request is only for teacher. this does not happen in real cases. ask server for help!',
			});
		}
	},
	//선택 된 indiNotice 삭제
	indiNotice: async (req, res, next) => {
		const accessTokenData = checkAccessToken(req, res);
		if (!accessTokenData || accessTokenData === 'invalid token') {
			return
		}
		const indiNoticeId = req.query.id;
		if (!indiNoticeId) return;
		let isExistIndiNotice = false;
		await indiNotice.findOne({
			where: { id: Number(indiNoticeId) }
		})
			.then(result => {
				if (result) {
					isExistIndiNotice = true
				}
			})
			.catch(err => {
				console.log(err)
				return
			})
		if (isExistIndiNotice) {
			await indiNotice.destroy({
				where: { id: Number(indiNoticeId) }
			})
				.then(result => {
					res.status(200).json({
						message: 'successfully deleted'
					})
				})
				.catch(err => {
					console.log(err, ' 삭제 실패')
				})
		}
	},
	//알림장 수정
	updateIndiNotice: async (req, res) => {
		const accessTokenData = checkAccessToken(req, res);
		if (!accessTokenData || accessTokenData === 'invalid token') {
			return
		}
		const indiNoticeId = req.query.id;
		if (!indiNoticeId) return;
		if (!req.body) return;
		await indiNotice.update({
			...req.body
		}, {
			where: { id: indiNoticeId }
		})
			.then(result => {
				console.log(result)
				res.status(200).json({
					message: 'successfully updated'
				})
			})
			.catch(err => {
				console.log(err)
			})
	}
};
