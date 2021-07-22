import React from "react";
import styled from "styled-components";
import { Link, RouteComponentProps, useParams } from "react-router-dom";

interface propsType {
  title: string;
  contents: any;
  userInfo?: any;
  match?: RouteComponentProps["match"];
}
export default function ReadForm({ title, contents, userInfo }: propsType) {
  const { no }: any = useParams();
  let clickedArticle = [];
  if (title === "알림장") {
    if (userInfo.permission === "parent") {
      clickedArticle = userInfo.mainData[
        userInfo.currentChild
      ].indiNotice.filter((element: any) => {
        if (element.noticeId === Number(no)) {
          return element;
        }
      });
    } else {
      clickedArticle = contents.indiNotice.indiNoticeInfo.filter(
        (element: any) => {
          if (element.indiNoticeId === Number(no)) {
            return element;
          }
        },
      );
    }
  }
  if (title === "공지사항") {
    clickedArticle = contents.currentList.filter((element: any) => {
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
          <>
            {userInfo.permission === "parent" ? (
              <Container>
                <TitleWrapper>
                  <SubTitle>제목 : {clickedArticle[0].contents}</SubTitle>
                  <Writer>
                    작성자 : {userInfo.mainData[userInfo.currentChild].userName}
                  </Writer>
                </TitleWrapper>
                <TextBox
                  readOnly
                  defaultValue={clickedArticle[0].contents}
                ></TextBox>
              </Container>
            ) : (
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
            )}
          </>
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
        {userInfo.permission === "parent" ? (
          <GoListButton onClick={() => history.back()}>목록</GoListButton>
        ) : (
          <>
            <PostButton to="/main/notice">수정</PostButton>
            <PostButton to="/main/notice">삭제</PostButton>
            <GoListButton onClick={() => history.back()}>목록</GoListButton>
          </>
        )}
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
