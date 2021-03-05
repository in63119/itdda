'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'institutions',
      [
        {
          name: '유치원1',
          master: '김원장',
          info: 'info1',
          photo: 'photo1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '유치원2',
          master: '성원장',
          info: 'info2',
          photo: 'photo2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('institutions', null, {});
  },
};
