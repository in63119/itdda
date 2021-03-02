'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users_institutions',
      [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
          userId: 1,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
          userId: 2,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
          userId: 3,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
          userId: 4,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
          userId: 5,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
          userId: 6,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
          userId: 7,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
          userId: 8,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
          userId: 9,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
          userId: 10,
        },
        // {
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   institutionId: 1,
        //   userId: 11,
        // },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
          userId: 12,
        },
        // {
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        //   institutionId: 1,
        //   userId: 13,
        // },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
          userId: 14,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users_institutions', null, {});
  },
};
