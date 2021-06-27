'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'indiNotices',
      [
        {
          content: '알림장1 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
          childId: 1,
        },
        {
          content: '알림장2 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
          childId: 1,
        },
        {
          content: '알림장3 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
          childId: 2,
        },
        {
          content: '알림장4 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
          childId: 2,
        },
        {
          content: '알림장5 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 3,
          childId: 3,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('indiNotices', null, {});
  },
};
