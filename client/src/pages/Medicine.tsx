import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { ListForm, TextAreaForm, WriteForm } from '../components/Index';

interface propsType {
  userInfo: any;
  handleUpdateList: any;
}
export default function Medicine({ userInfo, handleUpdateList }: propsType) {
  const urlMatch = useRouteMatch();
  //투약 의뢰서, 보고서 상태
  const [medicineList, setMedicinList] = useState({
    request: [
      {
        createdAt: '2021년2월2일',
        writer: '김엄마',
        title: '투약의뢰서',
        contents: {
          symtom: '',
          typeOf: '',
          quantity: '',
          takeTime: '',
          management: '',
        },
      },
    ],
    report: [
      {
        createdAt: '2021년2월2일',
        writer: '김선생',
        title: '',
      },
    ],
  });
  // 투약의뢰서 작성에 대한 입력값 상태
  const [inputVlaue, setInputValue] = useState({
    requestor: {
      symtom: '',
      typeOf: '',
      quantity: '',
      takeTime: '',
      management: '',
    },
  });
  // 사용자 입력 값 핸들러
  // const handleInputValue = (
  //   name: string,
  //   content: string,
  //   category: string,
  // ) => {
  //   console.log(name, ' 제목은?', content, '내용은?', category, '카테고리는?');
  // };
  const PREVIOUS_PAGE = -1;
  return (
    <Wrap>
      <div>
        <Loading id="loading" src="../images/outOfService.png" />
        <ButtonWrapper>
          <CancleButton onClick={() => history.go(PREVIOUS_PAGE)}>
            홈으로
          </CancleButton>
        </ButtonWrapper>
      </div>
      {/* <Switch>
        <Route exact path={`${urlMatch.path}`}>
          <ListForm
            handleUpdateList={handleUpdateList}
            contents={medicineList.request}
            permission={userInfo.permission}
            title="투약의뢰서"
            fristCategory="투약의뢰서"
            secondCategory="투약보고서"
          ></ListForm>
        </Route>
        <Route exact path={`${urlMatch.path}/write`}>
          <WriteForm
            handleInputValue={handleInputValue}
            inputVlaue={inputVlaue}
            userInfo={userInfo}
            title="투약의뢰서 작성"
            type="medicine"
          ></WriteForm>
        </Route>
      </Switch> */}
    </Wrap>
  );
}

// const Wrap = styled.div`
//   width: 100%;
//   height: 97%;
// `;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  place-content: center;
`;
const CancleButton = styled.span`
  ${({ theme }) => theme.common.defaultButton}
  width: 100%;
`;
const ButtonWrapper = styled.div`
  text-align: center;
`;
const Loading = styled.img`
  width: 40vw;
`;
