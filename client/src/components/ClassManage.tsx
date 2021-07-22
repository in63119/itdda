import React, { useState } from 'react';
import styled from 'styled-components';
import { requestManageClass } from '../common/axios';
import { useHistory } from 'react-router-dom';

interface Props {
  isClass: boolean;
  classInfo: Array<Record<string, unknown>>;
  setModalMessage: any;
  setModalVisible: any;
  classCheck: string;
  setClassCheck: any;
}
function ClassManage({
  isClass,
  classInfo,
  setModalMessage,
  setModalVisible,
  classCheck,
  setClassCheck,
}: Props) {
  //클래스 추가 창

  const history = useHistory();
  const [classInputs, setClassInputs] = useState({ className: '' });

  //모달창 열기
  const onModalClass = (value: any) => {
    setModalVisible(true);
    setModalMessage(value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setClassInputs({ ...classInputs, className: value });
  };

  const manageClass = async (className: string, option: string) => {
    const results = await requestManageClass(className, option);
    if (results) {
      if (classCheck !== classInputs.className) {
        setClassCheck(classInputs.className);
      } else {
        setClassCheck('반복된 작업 실시');
      }
    } else {
      alert('요청이 되지 않았습니다');
    }
  };

  return isClass ? (
    <div>
      {classInfo.map((classs: any) => (
        <div className="classArea">
          <input
            type="radio"
            onChange={(e) => {
              onChange(e);
            }}
            value={classs.className}
            name="classList"
          />
          <span className="classList">{classs.className}</span>
        </div>
      ))}
      <ButtonArea>
        <UnclickedButton
          onClick={() => {
            onModalClass(
              <div>
                <div>
                  <span>반이름 : </span>
                  <input
                    type="text"
                    placeholder="반 이름을 입력해주세요"
                    onChange={(e) => {
                      onChange(e);
                    }}
                  />
                </div>
              </div>,
            );
          }}
        >
          추가할 반 이름
        </UnclickedButton>
        <Button
          onClick={() => {
            manageClass(classInputs.className, 'add');
          }}
        >
          반 추가
        </Button>
        <Button
          onClick={() => {
            manageClass(classInputs.className, 'delete');
          }}
        >
          삭제
        </Button>
      </ButtonArea>
    </div>
  ) : (
    <div></div>
  );
}

export default ClassManage;

const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin : 0 2% 0 2%;
`;

const UnclickedButton = styled.button`
  ${({ theme }) => theme.common.unclickedButtonStyle}
  margin : 0 2% 0 2%;
`;

const ButtonArea = styled.div`
  margin-top: 2%;
`;
