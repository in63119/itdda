const GuestSearchInstitution = {
  data: [
    {
      institutionId: 'integer',
      institutionName: 'string',
      profileImg: 'string',
    },
  ],
};

const InstitutionClassList = {
  data: [
    {
      classId: 'string',
      className: 'string',
      institutionId: 'integer',
    },
  ],
};

const InstitutionChangeTeacherClass = {};

const InstitutionApprove = {
  data: {
    changedTeacherId: 'integer',
    approved: [
      {
        teacherGuest: 'boolean',
        teacherId: 'integer',
        teacherName: 'string',
        teacherClassId: 'integer',
        classs: {
          // ! classs에서 s 3개 주의
          teacherClassName: 'string',
        },
        institutionId: 'integer',
        createdAt: 'string',
      },
    ],
    unapproved: [
      {
        teacherGuest: 'boolean',
        teacherId: 'integer',
        teacherName: 'string',
        teacherClassId: 'integer',
        classs: {
          // ! classs에서 s 3개 주의
          teacherClassName: 'string',
        },
        institutionId: 'integer',
        createdAt: 'string',
      },
    ],
  },
};

const Profile = {
  data: {
    institutionId: 'integer',
    institutionName: 'integer',
  },
};
const TeacherApprove = {
  data: {
    changedChildId: 'integer',
    approved: [
      {
        isMember: 'boolean',
        childId: 'integer',
        childName: 'string',
        childClassId: 'integer',
        institutionId: 'integer',
        user: {
          parentId: 'ingteger',
          parentName: 'string',
          parentGuest: 'boolean',
        },
        createdAt: 'string',
      },
    ],
    unapproved: [
      {
        isMember: 'boolean',
        childId: 'integer',
        childName: 'string',
        childClassId: 'integer',
        institutionId: 'integer',
        user: {
          parentId: 'ingteger',
          parentName: 'string',
          parentGuest: 'boolean',
        },
        createdAt: 'string',
      },
    ],
  },
};

// [{step:1,time:09:00~10:00,contents:수학공부},{step:2,time:10:00~11:00,contents:영어공부},{step:3,time:11:00~12:00,contents:인생공부},{step:4,time:12:00~13:00,contents:코딩공부1},{step:5,time:13:00~14:00,contents:코딩공부2},{step:6,time:14:00~15:00,contents:코딩공부},{step:7,time:15:00~16:00,contents:코딩공부},{step:8,time:16:00~17:00,contents:코딩공부},{step:9,time:17:00~18:00,contents:코딩공부},{step:10,time:18:00~19:00,contents:코딩공부},{step:11,time:19:00~20:00,contents:코딩공부},{step:12,time:20:00~21:00,contents:코딩공부},{step:13,time:21:00~22:00,contents:코딩공부},{step:14,time:22:00~22:25,contents:코딩공부},{step:15,time:22:25~22:40,contents:코딩공부},{step:16,time:22:40~22:50,contents:코딩공부},{step:17,time:22:50~23:00,contents:코딩공부},{step:18,time:23:00~23:10,contents:코딩공부},{step:19,time:23:10~23:20,contents:코딩공부},{step:20,time:23:20~23:30,contents:코딩공부},{step:21,time:23:30~23:40,contents:코딩공부},{step:22,time:23:40~23:50,contents:코딩공부},{step:23,time:23:50~24:00,contents:코딩공부}]

// [{step:1,time:09:00~10:00,contents:수학공부},{step:2,time:10:00~11:00,contents:영어공부},{step:3,time:11:00~12:00,contents:인생공부},{step:4,time:12:00~13:00,contents:코딩공부1},{step:5,time:13:00~14:00,contents:코딩공부2},{step:6,time:14:00~15:00,contents:코딩공부},{step:7,time:15:00~16:00,contents:코딩공부},{step:8,time:16:00~17:00,contents:코딩공부},{step:9,time:17:00~18:00,contents:코딩공부},{step:10,time:18:00~19:00,contents:코딩공부},{step:11,time:19:00~20:00,contents:코딩공부},{step:12,time:20:00~21:00,contents:코딩공부},{step:13,time:21:00~22:00,contents:코딩공부},{step:14,time:22:00~22:25,contents:코딩공부},{step:15,time:22:25~22:40,contents:코딩공부},{step:16,time:22:40~22:50,contents:코딩공부},{step:17,time:22:50~23:00,contents:코딩공부},{step:18,time:23:00~23:10,contents:코딩공부},{step:19,time:23:10~23:20,contents:코딩공부},{step:20,time:23:20~23:30,contents:코딩공부},{step:21,time:23:30~23:40,contents:코딩공부},{step:22,time:23:40~23:50,contents:코딩공부},{step:23,time:23:50~24:00,contents:코딩공부}]
