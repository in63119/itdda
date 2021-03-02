'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'notices',
      [
        {
          category: 'notice',
          writer: 'notice1 작성자',
          title: 'notice1 제목',
          content: 'notice1 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          category: 'notice',
          writer: 'notice2 작성자',
          title: 'notice2 제목',
          content: 'notice2 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          category: 'notice',
          writer: 'notice3 작성자',
          title: 'notice3 제목',
          content: 'notice3 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          category: 'notice',
          writer: 'notice4 작성자',
          title: 'notice4 제목',
          content: 'notice4 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          category: 'notice',
          writer: 'notice5 작성자',
          title: 'notice5 제목',
          content: 'notice5 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          category: 'event',
          writer: 'event1 작성자',
          title: 'event1 제목',
          content: 'event1 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          category: 'event',
          writer: 'event2 작성자',
          title: 'event2 제목',
          content: 'event2 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 1,
        },
        {
          category: 'event',
          writer: 'event3 작성자',
          title: 'event3 제목',
          content: 'event3 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          category: 'event',
          writer: 'event4 작성자',
          title: 'event4 제목',
          content: 'event4 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
        {
          category: 'event',
          writer: 'event5 작성자',
          title: 'event5 제목',
          content: 'event5 내용입니다.',
          createdAt: new Date(),
          updatedAt: new Date(),
          institutionId: 2,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('notices', null, {});
  },
};
