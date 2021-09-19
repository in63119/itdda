import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ListForm, WriteForm, ReadForm } from "../components/Index";
interface propsType {
  userInfo: any;
  handleUpdateList: any;
  list: any;
  setList: ({}: any) => void;
  handleChangeNotice: any;
}
export default function IndiNotice({
  userInfo,
  list,
  setList,
  handleChangeNotice,
  handleUpdateList,
}: propsType) {
  const urlMatch = useRouteMatch();
  const [inputValue, setInputValue] = useState({
    title: "",
    content: "",
    type: "",
    category: "",
  });
  // 카테고리에 대한 상태
  const [radioButton, setRadioButton] = useState("");
  //카테고리 상태변환
  const handleClickRadioButton = (category: string) => {
    setRadioButton(category);
  };
  // 사용자 입력 값 핸들러
  const handleInputValue = (
    name: string,
    content: string,
    category: string,
  ) => {
    setInputValue({
      ...inputValue,
      [name]: content,
      category: category,
    });
  };
  useEffect(() => {
    handleUpdateList();
  }, []);
  return (
    <Wrap>
      <Switch>
        <Route exact path={`${urlMatch.path}`}>
          <ListForm
            title="알림장"
            list={list}
            setList={setList}
            handleUpdateList={handleUpdateList}
            handleChangeNotice={handleChangeNotice}
            contents={
              userInfo.permission === "parent"
                ? userInfo.mainData[userInfo.currentChild].indiNotice
                : list.currentList
            }
            fristCategory="수신"
            secondCategory="발송"
            permission={userInfo.permission}
          ></ListForm>
        </Route>
        <Route exact path={`${urlMatch.path}/write`}>
          <WriteForm
            contents={list.curretnList}
            radioButton={radioButton}
            handleClickRadioButton={handleClickRadioButton}
            handleInputValue={handleInputValue}
            inputValue={inputValue}
            userInfo={userInfo}
            fristCategory="수신"
            secondCategory="발송"
            title="알림장 작성"
            type="indiNotice"
          ></WriteForm>
        </Route>
        <Route
          exact
          path={`${urlMatch.path}/:no`}
          render={() => (
            <ReadForm
              contents={list}
              title="알림장"
              userInfo={userInfo}
            ></ReadForm>
          )}
        ></Route>
      </Switch>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 97%;
`;
