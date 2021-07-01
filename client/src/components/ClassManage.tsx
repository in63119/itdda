import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { requestManageClass } from "../common/axios";
import { useHistory } from "react-router-dom";

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
  const [classInputs, setClassInputs] = useState({ className: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (classInputs.className !== "") {
      setClassInputs({ ...classInputs, className: value });
    }
  };

  const manageClass = async (className: string, option: string) => {
    const results = await requestManageClass(className, option);
    if (results) {
      if (classCheck !== classInputs.className) {
        setClassCheck(classInputs.className);
      } else {
        setClassCheck("반복된 작업 실시");
      }
    } else {
      alert("요청이 되지 않았습니다");
    }
  };
  return isClass ? (
    <Wrapper>
      <ButtonArea>
        <ClassInput
          placeholder={"추가할 반을 입력해주세요"}
          onChange={(e) => onChange(e)}
        ></ClassInput>
        <AddButton
          onClick={() => {
            manageClass(classInputs.className, "add");
          }}
        >
          반 추가
        </AddButton>
      </ButtonArea>
      <Container>
        <ListSubtitle>
          <span>선택</span>
          <span>반</span>
        </ListSubtitle>
        <ListDiv>
          {classInfo.map((classs: any) => (
            <ClassWrapper className="classArea">
              <input
                type="radio"
                onChange={(e) => {
                  onChange(e);
                }}
                value={classs.className}
                name="classList"
              />
              <span className="classList">{classs.className}</span>
              <span>
                <Button
                  isActive={classs.className === classInputs.className}
                  onClick={() => {
                    manageClass(classInputs.className, "delete");
                  }}
                >
                  삭제
                </Button>
              </span>
            </ClassWrapper>
          ))}
        </ListDiv>
      </Container>
    </Wrapper>
  ) : (
    <div></div>
  );
}

export default ClassManage;

const AddButton = styled.button`
  ${({ theme }) => theme.common.defaultButton}
`;
const ListDiv = styled.div`
  height: 80%;
`;
const ClassInput = styled.input`
  ${({ theme }) => theme.common.defaultInput}
`;
const ClassWrapper = styled.div`
  ${({ theme }) => theme.common.itemInListDiv}
  grid-template-columns : repeat(3, 1fr);
  place-items: center;
  padding: 1%;
`;
const Wrapper = styled.div`
  height: 100%;
`;
const ListSubtitle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  font-size: 1.2rem;
  border-bottom: 1px solid lightgray;
  padding: 1%;
`;
const Container = styled.div`
  ${({ theme }) => theme.common.listDiv}
  height : 500px;
`;
const Button = styled.button<any>`
  ${({ theme }) => theme.common.unclickedButtonStyle}
  ${(props) =>
    props.isActive &&
    css`
      ${({ theme }) => theme.common.defaultButton}
    `}
`;
const ButtonArea = styled.div`
  margin-top: 2%;
  text-align-last: end;
  padding: 2%;
`;
