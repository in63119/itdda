import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  isStudent: boolean;
  students: Array<Record<string, unknown>>;
  classInfo: Array<Record<string, unknown>>;
  setModalMessage: any;
  setModalVisible: any;
}
function StudentManage({
  isStudent,
  students,
  setModalVisible,
  setModalMessage,
  classInfo,
}: Props) {
  const [inputs, setInputs] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputs(value);
  };

  return isStudent ? (
    <div id="student">
      <div id="studentInputArea">
        <div>원아검색</div>
        <input
          type="text"
          placeholder="원아를 입력해주세요"
          onChange={(e) => {
            onChange(e);
          }}
        ></input>
        <Button>검색</Button>
      </div>
      <div className="studentArea">
        <div>원아관리</div>
        <div id="studentSelect">
          {classInfo.map((classs: any) => (
            <button>{classs.className}</button>
          ))}
        </div>
        <div id="studentListArea">
          <div id="studentTitleList">
            <span>선택</span>
            <span>원아이름</span>
            <span>반</span>
          </div>
          <div id="studentList">
            {students.map((student: any) => (
              <div>
                <input type="checkbox" value={student.className}></input>
                <span>{student.className}</span>
                <span>{student.userName}</span>
              </div>
            ))}
          </div>
          <div id="studentButtonArea">
            <button>반 변경</button>
            <button>퇴원</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default StudentManage;

const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin : 0 2% 0 2%;
`;
