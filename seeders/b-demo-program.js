'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'programs',
      [
        {
          title: '프로그램1 제목',
          programImg: '프로그램1 이미지',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          title: '프로그램2 제목',
          programImg: '프로그램2 이미지',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          title: '프로그램3 제목',
          programImg: '프로그램3 이미지',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          title: '프로그램4 제목',
          programImg: '프로그램4 이미지',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          title: '프로그램5 제목',
          programImg: '프로그램5 이미지',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          title: '프로그램6 제목',
          programImg: '프로그램6 이미지',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          title: '프로그램7 제목',
          programImg: '프로그램7 이미지',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          title: '프로그램8 제목',
          programImg: '프로그램8 이미지',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          title: '프로그램9 제목',
          programImg: '프로그램9 이미지',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          title: '프로그램10 제목',
          programImg: '프로그램10 이미지',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('programs', null, {});
  },
};
