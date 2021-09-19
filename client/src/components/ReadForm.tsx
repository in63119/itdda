import React from "react";
import styled from "styled-components";
import { Link, useParams, useHistory } from "react-router-dom";
import { defaultCipherList } from "constants";

interface propsType {
  title: string;
  contents: any;
}
export default function ReadForm({ title, contents }: propsType) {
  const { no }: any = useParams();
  const history = useHistory();
  let clickedArticle = [];

  if (title === "알림장") {
    clickedArticle = contents.filter((element: any, index: number) => {
      if (element.indiNoticeId === Number(no)) {
        return element;
      }
    });
  }

  if (title === "공지사항") {
    clickedArticle = contents.filter((element: any, index: number) => {
      if (element.noticeId === Number(no)) {
        return element;
      }
    });
  }

  return (
    <Wrap>
      <ContentCard>
        <Title>{title}</Title>
        {title === "알림장" ? (
          <Container>
            <TitleWrapper>
              <SubTitle>제목 : {clickedArticle[0].content}</SubTitle>
              <Writer>작성자 : {clickedArticle[0].user.writterName}</Writer>
            </TitleWrapper>
            <TextBox
              readOnly
              defaultValue={clickedArticle[0].content}
            ></TextBox>
          </Container>
        ) : (
          <Container>
            <TitleWrapper>
              <SubTitle>제목 : {clickedArticle[0].title}</SubTitle>
              <Writer>작성자 : {clickedArticle[0].writer}</Writer>
            </TitleWrapper>
            <TextBox
              readOnly
              defaultValue={clickedArticle[0].content}
            ></TextBox>
          </Container>
        )}
      </ContentCard>
      <ButtonWrapper>
        <PostButton to={`/main/notice/update/${no}`}>수정</PostButton>
        <PostButton to={`/main/notice/delete/${no}`}>삭제</PostButton>
        <GoListButton onClick={() => history.goBack()}>목록</GoListButton>
      </ButtonWrapper>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const ContentCard = styled.div`
  height: 95%;
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
const TitleInput = styled.input`
  width: 100%;
  ${({ theme }) => theme.common.defaultInput}
`;
const SubTitle = styled.span`
  flex: 1 auto;
`;
const Writer = styled.span`
  flex: 1 auto;
  text-align: right;
`;
const TextBox = styled.textarea`
  width: 100%;
  padding: 2%;
  height: 100%;
  outline: none;
  border: 0px;
  resize: none;
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
const GoListButton = styled.span`
  ${({ theme }) => theme.common.defaultButton}
`;
