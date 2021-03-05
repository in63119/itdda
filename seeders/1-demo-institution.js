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
          timetable:
            '[{step:1,time:09:00~10:00,contents:수학공부},{step:2,time:10:00~11:00,contents:영어공부},{step:3,time:11:00~12:00,contents:인생공부},{step:4,time:12:00~23:00,contents:코딩공부}]',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '유치원2',
          master: '성원장',
          info: 'info2',
          photo: 'photo2',
          timetable:
            '[{step:1,time:09:00~10:00,contents:공부},{step:2,time:10:00~11:00,contents:공부},{step:3,time:11:00~12:00,contents:공부},{step:4,time:12:00~23:00,contents:공부}]',
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
