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
          timetable: '시간표1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '유치원2',
          master: '성원장',
          info: 'info2',
          photo: 'photo2',
          timetable: '시간표2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   name: '유치원3',
        //   master: '박원장',
        //   info: 'info3',
        //   photo: 'photo3',
        //   timetable: '시간표3',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   name: '유치원4',
        //   master: '신원장',
        //   info: 'info4',
        //   photo: 'photo4',
        //   timetable: '시간표4',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   name: '유치원5',
        //   master: '조원장',
        //   info: 'info5',
        //   photo: 'photo5',
        //   timetable: '시간표5',
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('institutions', null, {});
  },
};
