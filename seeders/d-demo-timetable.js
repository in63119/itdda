'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'timetables',
      [
        {
          institutionId: 1,
          step: '1',
          time: '09:00 ~ 10:00',
          contents: '수학 공부',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          institutionId: 1,
          step: '2',
          time: '10:00 ~ 10:30',
          contents: '영어 공부',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          institutionId: 1,
          step: '3',
          time: '10:30 ~ 12:00',
          contents: '인생 공부',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          institutionId: 1,
          step: '4',
          time: '12:00 ~ 23:00',
          contents: '코딩 공부',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('timetables', null, {});
  },
};
