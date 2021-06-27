import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export default function WriteNotice() {
  const [image, setImage] = useState({
    file: '',
    previewURL: '',
  });
  //공지사항 이미지 등록 함수
  //!reader.result의 리턴값 타입이 세가지 형태 (string, array, null )
  //!string으로만 받기 위해 타입단언 설정
  const handleFileOnChange = (event: any) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      setImage({
        file,
        previewURL: reader.result as string,
      });
    };
    //!previewURL에 할당할 데이터 타입이 string 이외일때 예외처리
    if (file !== undefined) {
      reader.readAsDataURL(file);
    }
  };
  //이미지 제거
  const handleRemoveImage = () => {
    setImage({
      file: '',
      previewURL: '',
    });
  };
  return (
    <Wrap>
      <ContentCard>
        <Title>공지사항 작성</Title>
        <Container>
          <TitleWrapper>
            <SubTitle>
              <TitleInput required placeholder="제목"></TitleInput>
            </SubTitle>
            <Writer>{'작성자'}</Writer>
          </TitleWrapper>
          {/* <ImageWrapper isSelectedImage={image.previewURL}>
            <ImageContainer htmlFor="input_file">
              <SelectImageInput
                type="file"
                id="input_file"
                accept="image/*"
                name="profile_img"
                onChange={handleFileOnChange}
              />
              <Image
                src={
                  image.previewURL
                    ? image.previewURL
                    : '../../images/addImage.png'
                }
                alt="프로필사진"
              ></Image>
            </ImageContainer>
            <RemoveImage
              onClick={() => handleRemoveImage()}
              isSelectedImage={image.previewURL}
            >
              이미지 제거
            </RemoveImage>
          </ImageWrapper> */}
          <TextBox placeholder="내용작성"></TextBox>
        </Container>
      </ContentCard>
      <ButtonWrapper>
        <PostButton to="/main/notice">작성완료</PostButton>
        <CancleButton to="/main/notice">취소</CancleButton>
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
const ImageWrapper = styled.div<any>`
  width: 100%;
  overflow: hidden;
  height: 48%;
  margin-top: 2%;
  border-radius: 15px 15px 15px 15px;
  background: #e0e0e0;
  // 선택한 이미지가 없을경우 기본 이미지 제공
  ${(props) =>
    !props.isSelectedImage &&
    css`
      text-align: center;
      label {
        display: flex;
      }
      img {
        display: flex;
        width: 25%;
        height: 40%;
        margin: 0 auto;
        align-self: center;
      }
    `}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
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

const SelectImageInput = styled.input`
  display: none;
`;
const ImageContainer = styled.label`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const RemoveImage = styled.div<any>`
  background: #6f6eff9e;
  text-align: center;
  width: 90%;
  top: -42px;
  position: relative;
  margin: 0 auto;
  ${({ theme }) => theme.common.defaultButton}
  ${(props) =>
    !props.isSelectedImage &&
    css`
      display: none;
    `}
`;
