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
          timetable: '시간표1 시간표 seed data 변경해 드릴께요ㅠㅠ',
          // timetable: [
          //   {
          //     step: '1',
          //     time: '09:00 ~ 10:00',
          //     contents: '수학 공부',
          //   },
          //   {
          //     step: '2',
          //     time: '10:00 ~ 10:30',
          //     contents: '영어 공부',
          //   },
          //   {
          //     step: '3',
          //     time: '10:30 ~ 12:00',
          //     contents: '인생 공부',
          //   },
          //   {
          //     step: '4',
          //     time: '12:00 ~ 23:00',
          //     contents: '코딩 공부',
          //   },
          // ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: '유치원2',
          master: '성원장',
          info: 'info2',
          photo: 'photo2',
          timetable: '시간표1 시간표 seed data 변경해 드릴께요ㅠㅠ',
          // timetable: [
          //   {
          //     step: '1',
          //     time: '09:00 ~ 10:00',
          //     contents: '수학 공부',
          //   },
          //   {
          //     step: '2',
          //     time: '10:00 ~ 10:30',
          //     contents: '영어 공부',
          //   },
          //   {
          //     step: '3',
          //     time: '10:30 ~ 12:00',
          //     contents: '인생 공부',
          //   },
          //   {
          //     step: '4',
          //     time: '12:00 ~ 23:00',
          //     contents: '코딩 공부',
          //   },
          // ],
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
