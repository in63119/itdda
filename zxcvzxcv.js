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
        institutionId: 'interger',
        user: {
          parentId: 'ingteger',
          parentName: 'string',
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
        institutionId: 'interger',
        user: {
          parentId: 'ingteger',
          parentName: 'string',
        },
        createdAt: 'string',
      },
    ],
  },
};
