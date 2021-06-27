import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { CardList, WriteMeal, WriteForm } from '../components/Index';
import { requestMealListAndUpload } from '../common/axios';
interface propsType {
  userInfo: any;
}
export default function Meal({ userInfo }: propsType) {
  const urlMatch = useRouteMatch();
  const [inputVlaue, setInputValue] = useState({
    title: '',
    content: '',
    type: '',
    category: '',
  });
  const [mealList, setMealList] = useState({
    mealList: [],
  });
  // 카테고리에 대한 상태
  const [radioButton, setRadioButton] = useState('');
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
      ...inputVlaue,
      [name]: content,
      category: category,
    });
  };
  //급식표 초기화 핸들러
  const handleInitailzeMealList = async (childId?: number) => {
    const result = await requestMealListAndUpload(childId);
    setMealList({
      mealList: result,
    });
  };
  // 화면 랜더링 시 급식 초기화
  useEffect(() => {
    if (userInfo.permission === 'parent') {
      const childId = userInfo.mainData[userInfo.currentChild].childId;
      handleInitailzeMealList(childId);
    } else {
      handleInitailzeMealList();
    }
  }, []);
  return (
    <Wrap>
      <Switch>
        <Route exact path={`${urlMatch.path}`}>
          <CardList
            userInfo={userInfo}
            title="급식표"
            content={mealList.mealList}
          ></CardList>
        </Route>
        <Route exact pasth={`${urlMatch.path}/write`}>
          <WriteForm
            radioButton={radioButton}
            handleClickRadioButton={handleClickRadioButton}
            handleInputValue={handleInputValue}
            inputVlaue={inputVlaue}
            userInfo={userInfo}
            title="급식표 등록"
            type="meal"
          ></WriteForm>
        </Route>
      </Switch>
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
