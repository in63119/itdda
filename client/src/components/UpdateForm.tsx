import { useState } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { updateNotice } from "../common/axios";
type PropsType = {
  inputValue: any;
  handleInputValue: any;
  currentCategory: string;
  list: any;
};
const UpdateForm = ({
  inputValue,
  handleInputValue,
  list,
  currentCategory,
}: PropsType) => {
  const { no }: any = useParams();
  const history = useHistory();
  const [textAreaValue, setTextAreaValue] = useState("");
  const PREVIOUS_PAGE = -1;
  console.log("updateform inputvalue", inputValue);
  let clickedArticle = [];
  const onClickUpdateButton = async () => {
    const { title, content } = inputValue;
    const result = await updateNotice(title, content, currentCategory);
    console.log("update notice", result);
  };
  switch (currentCategory) {
    case "notice":
      clickedArticle = list.filter((element: any, index: number) => {
        return element.noticeId === Number(no) && element;
      });
      break;
    case "event":
      clickedArticle = list.filter((element: any, index: number) => {
        return element.indiNoticeId === Number(no) && element;
      });
      break;
  }
  setTextAreaValue(clickedArticle[0].content);

  return (
    <Wrap>
      <ContentCard>
        <Title>{currentCategory}</Title>
        <Container>
          <TitleWrapper>
            <SubTitle>제목 : {clickedArticle[0].title}</SubTitle>
            <Writer>작성자 : {clickedArticle[0].writer}</Writer>
          </TitleWrapper>
          <TextBox
            name="content"
            value={textAreaValue}
            onChange={() => setTextAreaValue}
          ></TextBox>
        </Container>
      </ContentCard>
      <ButtonWrapper>
        <PostButton onClick={() => onClickUpdateButton()}>수정</PostButton>
        <CancleButton onClick={() => history.go(PREVIOUS_PAGE)}>
          취소
        </CancleButton>
      </ButtonWrapper>
    </Wrap>
  );
};
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
  display: flex;
  justify-content: center;
  a {
    margin: 2%;
  }
`;
const PostButton = styled.div`
  ${({ theme }) => theme.common.defaultButton}
`;
const CancleButton = styled.span`
  ${({ theme }) => theme.common.defaultButton}
  margin-left:3%;
`;
export default UpdateForm;
