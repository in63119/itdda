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
  children: [
    {
      childrenId: 'number',
      childrenName: 'string',
      childrenImage: 'string',
      className: 'string',
      institution: 'string',
      timetable: 배열,
      notice: 배열, // 5개
      indiNotice: 배열, // 5개
      album: 배열, // 6개
    },
    {
      childrenId: 'number',
      childrenName: 'string',
      childrenImage: 'string',
      className: 'string',
      institution: 'string',
      timetable: 배열,
      notice: 배열,
      indiNotice: 배열,
      album: 배열,
    },
  ],
};

const asdf = timetable: 
'[{step:1,time:09:00~10:00,contents:수학공부},{step:2,time:10:00~11:00,contents:영어공부},{step:3,time:11:00~12:00,contents:인생공부},{step:4,time:12:00~23:00,contents:코딩공부}]'
