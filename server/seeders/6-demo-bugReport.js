'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'bugReports',
      [
        {
          title: '버그리포트1 title',
          content: '버그리포트1 content',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: '버그리포트2 title',
          content: '버그리포트2 content',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: '버그리포트3 title',
          content: '버그리포트3 content',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          title: '버그리포트4 title',
          content: '버그리포트4 content',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
        {
          title: '버그리포트5 title',
          content: '버그리포트5 content',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bugReports', null, {});
  },
};
