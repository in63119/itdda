const { user, institution, children, classs } = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
	index: async (req, res) => {
		const accessTokenData = checkAccessToken(req, res);
		if (!accessTokenData || accessTokenData === 'invalid token') {
			return;
		}
		const { userId, permission } = accessTokenData;
		if (permission === 'institution') {
			const userInfo = await user.findOne({
				where: { id: userId },
				attributes: ['institutionId', 'email', 'mobile'],
			});
			const institutionId = userInfo.dataValues.institutionId;
			const institutionInfo = await institution.findOne({
				where: { id: institutionId },
				attributes: ['name', 'profileImg'],
			});
			const basicInfo = {
				profileImg: institutionInfo.dataValues.profileImg,
				name: institutionInfo.dataValues.name,
				email: userInfo.dataValues.email,
				mobile: userInfo.dataValues.mobile,
			};
			res.status(200).json({ message: 'institution profile', basicInfo });
		}
		if (permission === 'teacher') {
			const userInfo = await user.findOne({
				where: { id: userId },
				attributes: ['institutionId', 'name', 'email', 'mobile'],
			});
			const institutionId = userInfo.dataValues.institutionId;
			const institutionInfo = await institution.findOne({
				where: { id: institutionId },
				attributes: ['profileImg'],
			});
			const basicInfo = {
				profileImg: institutionInfo.dataValues.profileImg,
				name: userInfo.dataValues.name,
				email: userInfo.dataValues.email,
				mobile: userInfo.dataValues.mobile,
			};
			res.status(200).json({ message: 'teacher profile', basicInfo });
		}
		if (permission === 'parent') {
			const userInfo = await user.findOne({
				where: { id: userId },
				attributes: ['email', 'mobile'],
			});
			const childId = req.body.childId;
			//프로필 요청시 childId 가 없을경우
			if (childId === undefined) {
				res.status(400).json({ message: 'no childId' });
			}
			const childrenInfo = await children.findAll({
				where: { userId },
				attributes: [['id', 'childId'], 'profileImg', 'name', 'isMember'],
				include: [
					//기관에 대한 정보
					//name이란 특성을 찾지만 결과를 institution으로 변경해서 출력
					{ model: institution, attributes: [['name', 'institutionName']] },
					//반에 대한 정보
					//name이란 특성을 찾지만 결과를 className으로 변경해서 출력
					{ model: classs, attributes: [['name', 'className']] },
				],
			});
			// 하부모는 기관장, 선생님과 달리 승인된 아이와 승인되지 않은 아이의 리스트가 필요함.
			const childInfo = childrenInfo.filter((child) => {
				return child.dataValues.childId === childId;
			})[0]; // ! [0] 주의

			const approved = childrenInfo.filter(
				(child) => child.dataValues.isMember,
			);
			const unapproved = childrenInfo.filter(
				(child) => !child.dataValues.isMember,
			);

			const basicInfo = {
				profileImg: childInfo.dataValues.profileImg,
				name: childInfo.dataValues.name,
				email: userInfo.dataValues.email,
				mobile: userInfo.dataValues.mobile,
			};
			res.status(200).json({
				message: 'child profile',
				basicInfo,
				approved,
				unapproved,
			});
		} else {
			res.json({
				message: 'this do not happen in real cases. ask server for help!',
			});
		}
	},
	modifyProfile: async (req, res) => {
		const accessTokenData = checkAccessToken(req, res);
		if (!accessTokenData || accessTokenData === 'invalid token') {
			return;
		}
		const { userId, permission } = accessTokenData;
		if (permission === 'institution') {
			const userInfo = await user.findOne({
				where: { id: userId },
				attributes: ['institutionId', 'email', 'mobile'],
			});
			const institutionId = userInfo.dataValues.institutionId;
			await institution.update({
				...req.body
			}, {
				where: { id: institutionId }
			});
			//select name, profileImg from institution 
			const institutionInfo = await institution.findOne({
				where: { id: institutionId },
				attributes: ['name', 'profileImg'],
			});
			const basicInfo = {
				profileImg: institutionInfo.dataValues.profileImg,
				name: institutionInfo.dataValues.name,
				email: userInfo.dataValues.email,
				mobile: userInfo.dataValues.mobile,
			};
			res.status(200).json({ message: 'institution profile', basicInfo });
		}
		if (permission === 'teacher') {
			const userInfo = await user.findOne({
				where: { id: userId },
				attributes: ['institutionId', 'name', 'email', 'mobile'],
			});
			const institutionId = userInfo.dataValues.institutionId;

			const institutionInfo = await institution.findOne({
				where: { id: institutionId },
				attributes: ['profileImg'],
			});
			const basicInfo = {
				profileImg: institutionInfo.dataValues.profileImg,
				name: userInfo.dataValues.name,
				email: userInfo.dataValues.email,
				mobile: userInfo.dataValues.mobile,
			};
			res.status(200).json(basicInfo);
		}
		if (permission === 'parent') {
			const userInfo = await user.findOne({
				where: { id: userId },
				attributes: ['email', 'mobile'],
			});
			const childId = req.body.childId;
			const childrenInfo = await children.findAll({
				where: { userId },
				attributes: [['id', 'childId'], 'profileImg', 'name', 'isMember'],
				include: [
					{ model: institution, attributes: [['name', 'institutionName']] },
					{ model: classs, attributes: [['name', 'className']] },
				],
			});
			const childInfo = childrenInfo.filter((child) => {
				return child.dataValues.childId === childId;
			})[0]; // ! [0] 주의

			const approved = childrenInfo.filter(
				(child) => child.dataValues.isMember,
			);
			const unapproved = childrenInfo.filter(
				(child) => !child.dataValues.isMember,
			);

			const basicInfo = {
				profileImg: childInfo.dataValues.profileImg,
				name: childInfo.dataValues.name,
				email: userInfo.dataValues.email,
				mobile: userInfo.dataValues.mobile,
			};

			res.status(200).json({
				message: 'parent/child profile',
				basicInfo,
				approved,
				unapproved,
			});
		} else {
			res.json({
				message: 'this do not happen in real cases. ask server for help!',
			});
		}
	},
	searchInstitution: async (req, res) => {
		const inputValue = req.body.inputValue;

		const institutionInfo = await institution.findAll({
			where: {
				name: {
					[Op.like]: `%${inputValue}%`,
				},
			},
			attributes: [
				['id', 'institutionId'],
				['name', 'institutionName'],
				'profileImg',
			],
		});

		if (institutionInfo.length === 0) {
			res.status(201).json({ message: 'no such institution name' });
		} else {
			res.status(200).json(institutionInfo);
		}
	},

	parentRegister: async (req, res) => {
		const accessTokenData = checkAccessToken(req, res);
		if (!accessTokenData || accessTokenData === 'invalid token') {
			return;
		}

		const { userId } = accessTokenData; // ! 부모의 userId
		const institutionId = req.body.institutionId;
		const childName = req.body.childName;

		// ! 승인 대기 중에 부모가 같은 아이를 2번 이상 등록하는 일을 방지하자.
		// ! => 같은 기관에 같은 아이를 2번 이상 등록할 수는 없으나,
		// ! => 다른 기관에 같은 아이를 1번씩 등록할 수는 있다.
		// ! 그의 한말씀 : 포부는 크다. 많은 유치원에서 datda를 사용하게 된다면, 한 아이가 다른 유치원으로 옮기게 될 경우, 다른 유치원에 승인요청을 보낼 수 있어야하지 않겠나? 이 어찌 좋지 아니한가?
		const childInfo = await children.findOne({
			where: { name: childName, userId, institutionId },
		});

		if (childInfo) {
			res
				.status(201)
				.json({ message: 'child already registered. must wait for approval' });
		} else if (!childInfo) {
			await children
				.create({
					name: childName,
					userId,
					institutionId,
					isMember: false,
				})
				.then((data) => {
					res.status(200).json({
						message: 'child registered. must wait for approval',
					});
				});
		}
	},
};
