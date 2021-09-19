import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Route,
  Switch,
  useRouteMatch,
  withRouter,
  useHistory,
} from "react-router-dom";
import { CardList, WriteForm } from "../components/Index";
import { requestImageAlbum } from "../common/axios";

interface propsType {
  userInfo: any;
}
export default function Album({ userInfo }: propsType) {
  const history = useHistory();
  const urlMatch = useRouteMatch();
  const PREVIOUS_PAGE = -1;
  const [inputValue, setInputValue] = useState({
    title: "",
    childId: null,
    formData: "",
    category: "",
  });
  // 앨범에대한 상태
  const [album, setAlbum] = useState({
    albumInfo: [],
  });
  // 카테고리에 대한 상태
  const [radioButton, setRadioButton] = useState("");
  //카테고리 상태변환
  const handleClickRadioButton = (category: string) => {
    setRadioButton(category);
  };
  // 사용자 입력 값 핸들러
  const handleInputValue = (name: string, content: string) => {
    console.log(name, " 제목은?", content, "내용은?");
    setInputValue({
      ...inputValue,
      [name]: content,
    });
  };
  // 이미지 등록 요청
  const handleRequestUpload = async () => {
    const { title, childId, formData } = inputValue;
    const result = await requestImageAlbum(childId, formData, title, null);
    if (result) {
      history.go(PREVIOUS_PAGE);
    }
  };
  // 앨범 초기화 핸들러
  const handleInitailzeAlbum = async (childId?: number) => {
    const result = await requestImageAlbum(childId);
    setAlbum({
      albumInfo: result,
    });
  };
  //이미지 파일 정보 업데이트
  const handleInsertImageFileInfo = (imageFile: any) => {
    setInputValue({
      ...inputValue,
      formData: imageFile,
    });
  };
  // useEffect(() => {
  //   console.log(album, ' =  앨범 상태확인');
  // }, [album.albumInfo]);
  // 화면 랜더링 시 앨범 초기화
  useEffect(() => {
    if (userInfo.permission === "parent") {
      const childId = userInfo.mainData[userInfo.currentChild].childId;
      handleInitailzeAlbum(childId);
    } else {
      handleInitailzeAlbum();
    }
  }, []);
  return (
    <Wrap>
      {album.albumInfo ? (
        <Switch>
          <Route exact path={`${urlMatch.path}`}>
            <CardList
              userInfo={userInfo}
              title="앨범"
              content={album.albumInfo}
            ></CardList>
          </Route>
          <Route exact pasth={`${urlMatch.path}/write`}>
            <WriteForm
              handleInsertImageFileInfo={handleInsertImageFileInfo}
              handleRequestUpload={handleRequestUpload}
              radioButton={radioButton}
              handleClickRadioButton={handleClickRadioButton}
              handleInputValue={handleInputValue}
              inputValue={inputValue}
              userInfo={userInfo}
              title="앨범 등록"
              type="album"
            ></WriteForm>
          </Route>
        </Switch>
      ) : (
        <LoadingWrapper>
          <Loader id="loadingImage" src="../images/loading.gif"></Loader>
        </LoadingWrapper>
      )}
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const Loader = styled.img`
  width: 200px;
  text-align: center;
  font-size: 2rem;
  align-self: center;
`;
const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
`;
