import React, { useState } from "react";
import styled from "styled-components";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { ReadForm, ListForm, WriteForm, UpdateForm } from "../components/Index";
interface propsType {
  list: any;
  setList: ({}: any) => void;
  handleUpdateList: any;
  handleChangeNotice: any;
  userInfo: {
    permission: string;
    isLogin: boolean;
    mainData: any;
    currentChild: number;
  };
}
function Notice({
  userInfo,
  list,
  setList,
  handleUpdateList,
  handleChangeNotice,
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
    setInputValue({
      ...inputValue,
      category: category,
    });
  };
  // 사용자 입력 값 핸들러
  const handleInputValue = (
    name: string,
    content: string,
    type: string,
    category: string,
  ) => {
    setInputValue({
      ...inputValue,
      [name]: content,
      type: type,
    });
  };
  return (
    <Wrap>
      <Switch>
        <Route exact path={`${urlMatch.path}`}>
          <ListForm
            permission={userInfo.permission}
            title="공지사항"
            list={list}
            setList={setList}
            contents={list.currentList}
            handleUpdateList={handleUpdateList}
            handleChangeNotice={handleChangeNotice}
            fristCategory="공지사항"
            secondCategory="행사"
          ></ListForm>
        </Route>

        <Route exact path={`${urlMatch.path}/write`}>
          <WriteForm
            radioButton={radioButton}
            inputValue={inputValue}
            handleInputValue={handleInputValue}
            userInfo={userInfo}
            fristCategory="공지사항"
            handleClickRadioButton={handleClickRadioButton}
            secondCategory="행사"
            currentCategory={list.currentCategory}
            title="공지사항 작성"
            type="notice"
          ></WriteForm>
        </Route>
        <Route
          exact
          path={`${urlMatch.path}/:no`}
          render={() => (
            <ReadForm
              contents={list}
              title="공지사항"
              userInfo={userInfo}
            ></ReadForm>
          )}
        ></Route>
        <Route
          exact
          path={`${urlMatch.path}/update/:no`}
          render={() => (
            <UpdateForm
              inputValue={inputValue}
              handleInputValue={handleInputValue}
              currentCategory={list.currentCategory}
              list={list.currentList}
            />
          )}
        />

        <Route
          exact
          path={`${urlMatch.path}/delete/:no`}
          render={() => (
            <ReadForm contents={list.currentList} title="공지사항"></ReadForm>
          )}
        />
      </Switch>
    </Wrap>
  );
}
export default Notice;
const Wrap = styled.div`
  width: 100%;
  height: 97%;
`;
