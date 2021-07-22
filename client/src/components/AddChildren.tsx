import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { requestProfileParentRegister } from "../common/axios";
import { isNameCHeck } from "../common/utils/validation";

interface Props {
  children: string;
  setChildren: any;
  instiSelect: string;
  errorMessage: string;
  setErrorMessage: any;
}
function AddChildren({
  children,
  setChildren,
  instiSelect,
  errorMessage,
  setErrorMessage,
}: Props) {
  const history = useHistory();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setChildren(value);
  };

  //axios 요청
  const profileRegister = async (institutionId: string, childName: string) => {
    if (childName.length === 0) {
      setErrorMessage("이름을 입력해주세요");
    } else if (!isNameCHeck) {
      setErrorMessage("이름을 올바르게 입력하였는지 확인해주세요");
    } else {
      const results = await requestProfileParentRegister(
        institutionId,
        childName,
      );
      if (results) {
        history.push("/main/profile");
        setErrorMessage("");
      } else {
        setErrorMessage("올바른 요청을 보내지 못했습니다.");
      }
    }
  };

  return (
    <Wrap>
      <ContentCard>
        <h1>아이를 추가하세요</h1>
        <div>
          <span>이름</span>
          <input type="text" onChange={(e) => onChange(e)}></input>
        </div>
        <div>
          <Button
            onClick={() => {
              profileRegister(instiSelect, children);
            }}
          >
            완료
          </Button>
        </div>
        <div>{errorMessage}</div>
      </ContentCard>
    </Wrap>
  );
}

export default AddChildren;

const Wrap = styled.div`
  width: 100%;
  height: 97%;
`;

const ContentCard = styled.div`
  ${({ theme }) => theme.common.contentCardDiv}
`;
const Title = styled.div`
  ${({ theme }) => theme.common.contentTitle}
`;
const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin : 0 5% 0 5%;
`;
