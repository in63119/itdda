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
