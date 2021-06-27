import React from 'react';
import styled from 'styled-components';
import { ImagePostForm, TextAreaForm, WriteMedicineForm } from './Index';
import { requestNotice } from '../common/axios';
interface propsType {
  title: string;
  type: string;
  inputVlaue: any;
  currentCategory?: string;
  handleInputValue: any;
  fristCategory?: string;
  secondCategory?: string;
  handleInsertImageFileInfo?: any;
  handleClickRadioButton: any;
  handleRequestUpload?: any;
  radioButton: string;
  contents?: any;
  userInfo: {
    permission: string;
    isLogin: boolean;
    mainData: any;
  };
}
//object 사용시 key와 value의 type을 지정해야한다.
interface objectType {
  [key: string]: JSX.Element;
}
function WriteForm({
  title,
  type,
  userInfo,
  currentCategory,
  fristCategory,
  secondCategory,
  handleRequestUpload,
  handleClickRadioButton,
  handleInsertImageFileInfo,
  handleInputValue,
  inputVlaue,
}: propsType) {
  const PREVIOUS_PAGE = -1;
  //메뉴별 선택적으로 화면 구성
  const printContent: objectType = {
    medicine: (
      <WriteMedicineForm type={type} handleInputValue={handleInputValue} />
    ),
    notice: <TextAreaForm type={type} handleInputValue={handleInputValue} />,
    meal: (
      <ImagePostForm
        userInfo={userInfo}
        handleInsertImageFileInfo={handleInsertImageFileInfo}
      />
    ),
    indiNotice: (
      <TextAreaForm type={type} handleInputValue={handleInputValue} />
    ),
    album: (
      <ImagePostForm
        userInfo={userInfo}
        handleInsertImageFileInfo={handleInsertImageFileInfo}
      />
    ),
  };
  //제목 입력에 대한 핸들러
  const handleTitleValue = (e: any) => {
    const { name, value } = e.target;
    handleInputValue(name, value, type);
  };
  //작성 글 등록 요청
  const handleRequestPost = async (category: string) => {
    const { title, content } = inputVlaue;

    if (title.length === 0) {
      alert('제목을 입력해주세요');
      return;
    }
    if (type === 'notice') {
      await requestNotice(title, content, category);
      history.go(PREVIOUS_PAGE);
    }
    if (type === 'album') {
      handleRequestUpload();
    }
  };
  return (
    <Wrap>
      {type === 'medicine' ? (
        <TitleWrapper>
          <SubTitle>
            <TitleInput
              required
              placeholder="제목"
              name="title"
              onChange={(e: any) => handleTitleValue(e)}
            ></TitleInput>
          </SubTitle>
          <Writer>작성자 : {userInfo.mainData.userName}</Writer>
        </TitleWrapper>
      ) : (
        <>
          <Title>{title}</Title>
          <TitleWrapper>
            <SubTitle>
              <TitleInput
                required
                placeholder="제목"
                name="title"
                onChange={(e: any) => handleTitleValue(e)}
              ></TitleInput>
              {/* {title === '앨범 등록' ? null : (
                <select>
                  {contents.teacherRead.map((element: any, index: number) => {
                    return <option>{element}</option>;
                  })}
                </select>
              )} */}
              {(() => {
                if (title === '알림장 작성' || title === '앨범 등록') {
                  return null;
                }
                <>
                  <RadioBtn
                    type="radio"
                    id="fristCategory"
                    checked={inputVlaue.category === fristCategory}
                    onChange={() => handleClickRadioButton(fristCategory)}
                  />
                  <label htmlFor="fristCategory">{fristCategory}</label>
                  <RadioBtn
                    type="radio"
                    id="secondCategory"
                    checked={inputVlaue.category === secondCategory}
                    onChange={() => handleClickRadioButton(secondCategory)}
                  />
                  <label htmlFor="secondCategory">{secondCategory}</label>
                </>;
              })()}
            </SubTitle>
            <Writer>작성자 : {userInfo.mainData.userName}</Writer>
          </TitleWrapper>
        </>
      )}
      <Container>{printContent[type]}</Container>
      <ButtonWrapper>
        <PostButton onClick={() => handleRequestPost(currentCategory!)}>
          작성완료
        </PostButton>
        <CancleButton onClick={() => history.go(PREVIOUS_PAGE)}>
          취소
        </CancleButton>
      </ButtonWrapper>
    </Wrap>
  );
}
export default WriteForm;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const Title = styled.div`
  ${({ theme }) => theme.common.contentTitle}
`;
const Container = styled.div`
  width: 95%;
  height: 85%;
  display: grid;
  grid-gap: 1%;
  padding: 1%;
  margin: 0 auto;
`;
const TitleWrapper = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
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
const RadioBtn = styled.input``;
