'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'classses',
      [
        {
          name: '1반',
          // timetable: '1반 시간표',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          name: '2반',
          // timetable: '2반 시간표',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          name: '3반',
          // timetable: '3반 시간표',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          name: '4반',
          // timetable: '4반 시간표',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          name: '5반',
          // timetable: '5반 시간표',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('classses', null, {});
  },
};
