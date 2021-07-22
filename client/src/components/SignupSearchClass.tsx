import React, { useState } from 'react';
interface Props {
  searchClass: boolean;
  handleSearchClass: any;
}
function SignupSearchClass({ searchClass, handleSearchClass }: Props) {
  const [classInfo, setClassInfo] = useState([
    { classId: '', className: '새싹반' },
    { classId: '', className: '햇님반' },
  ]);

  return searchClass ? (
    <div>
      <h1>반을 선택해주세요</h1>
      <div>
        <input type="text"></input>
        <button>검색</button>
      </div>
      {classInfo.map((info) => (
        <div>
          <input type="radio"></input>
          <span>{info.className}</span>
        </div>
      ))}
      <button onClick={() => handleSearchClass()}>가입 완료</button>
    </div>
  ) : (
    <div></div>
  );
}

export default SignupSearchClass;
