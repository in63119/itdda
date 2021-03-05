const instituton = {
  timetable: [
    {
      step: 'number',
      time: '09:00 ~ 10:00',
      contents: 'string',
    },
    {
      step: 'number',
      time: '10:00 ~ 10:30',
      contents: 'string',
    },
  ],
  institution: {
    name: 'string',
    image: 'string',
  },
  notice: [
    //10개
    {
      noticeId: 'number',
      title: 'string',
      create_at: 'string',
    },
    {
      noticeId: 'number',
      title: 'string',
      create_at: 'string',
    },
  ],
  album: [
    //6개
    {
      imageId: 'number',
      image_url: 'string',
    },
    {
      imageId: 'number',
      image_url: 'string',
    },
  ],
};

const teacher = {
  timetable: [
    {
      step: 'number',
      time: '09:00 ~ 10:00',
      contents: 'string',
    },
    {
      step: 'number',
      time: '10:00 ~ 10:30',
      contents: 'string',
    },
  ],
  institution: {
    name: 'string',
    image: 'string',
  },
  notice: [
    //5개
    {
      noticeId: 'number',
      title: 'string',
      create_at: 'string',
    },
    {
      noticeId: 'number',
      title: 'string',
      create_at: 'string',
    },
  ],
  indiNotice: [
    // 5개
    {
      noticeId: 'number',
      contents: 'string',
      create_at: 'string',
    },
    {
      noticeId: 'number',
      contents: 'string',
      create_at: 'string',
    },
  ],
  album: [
    //6개
    {
      imageId: 'number',
      image_url: 'string',
    },
    {
      imageId: 'number',
      image_url: 'string',
    },
  ],
};
// res.data.children.notice
const parent = {
  timetable: [
    {
      step: 'number',
      time: '09:00 ~ 10:00',
      contents: 'string',
    },
    {
      step: 'number',
      time: '10:00 ~ 10:30',
      contents: 'string',
    },
  ],
  children: [
    {
      childrenId: 'number',
      childrenName: 'string',
      childrenImage: 'string',
      className: 'string',
      institution: 'string',
      indiNotice: 배열,
      notice: 배열,
    },
    {
      childrenId: 'number',
      childrenName: 'string',
      childrenImage: 'string',
      className: 'string',
      institution: 'string',
    },
  ],
  notice: [
    //5개
    {
      noticeId: 'number',
      title: 'string',
      create_at: 'string',
    },
    {
      noticeId: 'number',
      title: 'string',
      create_at: 'string',
    },
  ],
  indiNotice: [
    // 5개
    {
      noticeId: 'number',
      contents: 'string',
      create_at: 'string',
    },
    {
      noticeId: 'number',
      contents: 'string',
      create_at: 'string',
    },
  ],
  album: [
    //6개
    {
      imageId: 'number',
      image_url: 'string',
    },
    {
      imageId: 'number',
      image_url: 'string',
    },
  ],
};

const timetable = [
  {
    step: '1',
    time: '09:00 ~ 10:00',
    contents: '수학 공부',
  },
  {
    step: '2',
    time: '10:00 ~ 10:30',
    contents: '영어 공부',
  },
  {
    step: '3',
    time: '10:30 ~ 12:00',
    contents: '인생 공부',
  },
  {
    step: '4',
    time: '12:00 ~ 23:00',
    contents: '코딩 공부',
  },
];
