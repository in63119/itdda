const { user, children, institution } = require('../models');
const { checkAccessToken } = require('../modules/checkAccessToken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  index: async (req, res) => {},

  // ! 선생님 FLOW
  // ! (1) 기관명을 검색한다.
  // ! (2) 기관명에 해당하는 기관 LIST를 제공받고, 그 중 자신의 기관을 체크한 후 등록하기 버튼을 클릭한다.
  // ! asdfasdf => 검색 시 wild카드에 대한 부분의 디테일은 이후로 미룬다
  // ! (3) 완료 후 waiting 페이지에 랜딩
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

  teacherRegister: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId } = accessTokenData; // ! 선생님의 userId
    const institutionId = req.body.institutionId;

    await user.update(
      {
        institutionId,
      },
      { where: { id: userId } },
    );
    // ! asdfasdf 이런 곳에서 catch err 하는 것에 대한 부분은 추후에 보완하자.

    res
      .status(200)
      .json({ message: 'teacher registered. must wait for approval' });
  },

  parentRegister: async (req, res) => {
    const accessTokenData = checkAccessToken(req, res);
    if (!accessTokenData || accessTokenData === 'invalid token') {
      return;
    }

    const { userId } = accessTokenData; // ! 부모의 userId
    const institutionId = req.body.institutionId;
    const childName = req.body.childName;

    await children
      .create({
        name: childName,
        userId,
        institutionId,
        isMember: false,
      })
      .then((data) => {
        res.status(200).json({
          message: 'parent/child registered. must wait for approval',
        });
      });
  },
};
