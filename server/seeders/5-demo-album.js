'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'albums',
      [
        {
          photo: '사진1',
          title: '사진1 title',
          content: '사진1 content',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          photo: '사진2',
          title: '사진2 title',
          content: '사진2 content',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          photo: '사진3',
          title: '사진3 title',
          content: '사진3 content',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          photo: '사진4',
          title: '사진4 title',
          content: '사진4 content',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          photo: '사진5',
          title: '사진5 title',
          content: '사진5 content',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('albums', null, {});
  },
};
