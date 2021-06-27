import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
interface propsType {
  isSelectedImage: string;
}
export default function WriteMedicine() {
  return (
    <Wrap>
      <ContentCard>
        <Title>투약의뢰서 작성</Title>
        <Container>
          <TitleWrapper>
            <Writer>{"작성자"}</Writer>
          </TitleWrapper>
        </Container>
      </ContentCard>
      <ButtonWrapper>
        <PostButton to="/main/medicine">작성완료</PostButton>
        <CancleButton to="/main/medicine">취소</CancleButton>
      </ButtonWrapper>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const ContentCard = styled.div`
  ${({ theme }) => theme.common.contentCardDiv}
`;
const Title = styled.div`
  ${({ theme }) => theme.common.contentTitle}
`;
const Container = styled.div`
  width: 95%;
  height: 86%;
  margin: 0 auto;
`;
const TitleWrapper = styled.div`
  display: flex;
`;

const Writer = styled.span`
  flex: 1 auto;
  text-align: right;
`;

const TextBox = styled.textarea`
  width: 100%;
  padding: 2%;
  height: 50%;
  outline: none;
  border: 0px;
  resize: none;
  ::placeholder {
    color: #dbdbdb;
  }
  margin-top: 2%;
  border-radius: 15px 15px 15px 15px;
  box-shadow: 0px 0px 5px #c8c8c8;
`;
const ButtonWrapper = styled.div`
  text-align: center;
  width: 95%;
  height: auto;
  margin: 2%;
  a {
    margin: 2%;
  }
`;
const PostButton = styled(Link)`
  ${({ theme }) => theme.common.defaultButton}
`;
const CancleButton = styled(Link)`
  ${({ theme }) => theme.common.defaultButton}
`;
