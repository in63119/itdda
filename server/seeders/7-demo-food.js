'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'food',
      [
        {
          title: '식단1 제목',
          monthfood: '식단1 monthfood',
          dailyfood: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          title: '식단2 제목',
          monthfood: '식단2 monthfood',
          dailyfood: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          title: '식단3 제목',
          monthfood: '식단3 monthfood',
          dailyfood: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          title: '식단4 제목',
          monthfood: '식단4 monthfood',
          dailyfood: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          title: '식단5 제목',
          monthfood: '식단5 monthfood',
          dailyfood: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          title: '식단6 제목',
          monthfood: null,
          dailyfood: '식단6 dailyfood',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          title: '식단7 제목',
          monthfood: null,
          dailyfood: '식단7 dailyfood',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          title: '식단8 제목',
          monthfood: null,
          dailyfood: '식단8 dailyfood',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          title: '식단9 제목',
          monthfood: null,
          dailyfood: '식단9 dailyfood',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          title: '식단10 제목',
          monthfood: null,
          dailyfood: '식단10 dailyfood',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('food', null, {});
  },
};
