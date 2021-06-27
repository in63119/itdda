import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TimeTableCard, TimtableListForm } from "../components/Index";
import { requestUploadTimetable } from "../common/axios";
import { ChangeToArray } from "../common/utils/findCurrentEducation";
import {
  Route,
  Switch,
  useRouteMatch,
  Link,
  useHistory,
} from "react-router-dom";
interface propType {
  userInfo: any;
  handleTimetableChange: any;
}
export default function Timetable({
  userInfo,
  handleTimetableChange,
}: propType) {
  const history = useHistory();
  const PREVIOUS_PAGE = -1;
  const urlMatch = useRouteMatch();
  // 시간표 상태
  const [timetable, setTimtable] = useState({
    list: [] as any,
  });
  //로그인 한 유저의 timetable 최초 등록
  const handleAddTimetable = (timetableArray: any) => {
    setTimtable({
      list: timetableArray,
    });
  };
  //timetable 빈 요소 추가
  const handledAddCard = () => {
    setTimtable({
      list: [
        ...timetable.list,
        {
          step: timetable.list.length + 1,
          time: "",
          contents: "",
        },
      ],
    });
  };
  //timetable 마지막 요소 삭제
  const handleDeleteCard = () => {
    setTimtable({
      list: timetable.list.slice(0, -1),
    });
  };
  //timetable update
  const handleUpdateTimetable = (step: number, name: string, value: string) => {
    const modifiedTimetable = {
      [name]: value,
    };
    const updateData = timetable.list.map((element: any) => {
      if (element.step === step) {
        const changeData = { ...element, ...modifiedTimetable };
        return changeData;
      }
      return element;
    });
    setTimtable({
      list: updateData,
    });
  };
  //시간표 서버로 등록 요청 후 새로운 시간표를 업데이트
  const handlePostTimetable = async () => {
    const requestReult = await requestUploadTimetable(timetable.list);
    if (requestReult) {
      handleAddTimetable(ChangeToArray(requestReult));
      handleTimetableChange(requestReult);
      history.go(PREVIOUS_PAGE);
    }
  };
  //페이지 로딩 후 시간표 셋팅
  useEffect(() => {
    handleAddTimetable(
      ChangeToArray(
        userInfo.permission === "parent"
          ? userInfo.mainData[userInfo.currentChild].timetable!
          : userInfo.mainData.timetable
      )
    );
  }, []);
  // useEffect(() => {
  //   console.log(`'${JSON.stringify(timetable.list)}'`, ' 현재 ');
  // }, [timetable.list]);
  return (
    <Wrap>
      <Switch>
        <Route
          exact
          path={`${urlMatch.path}`}
          render={() => (
            <TimtableListForm
              type="read"
              userInfo={userInfo}
              timetable={timetable}
              handleTimetableChange={handleTimetableChange}
              handlePostTimetable={handlePostTimetable}
              handleUpdateTimetable={handleUpdateTimetable}
              handleDeleteCard={handleDeleteCard}
              handledAddCard={handledAddCard}
              handleAddTimetable={handleAddTimetable}
            />
          )}
        ></Route>
        <Route
          exact
          path={`${urlMatch.path}/write`}
          render={() => (
            <TimtableListForm
              type="write"
              handleTimetableChange={handleTimetableChange}
              handledAddCard={handledAddCard}
              userInfo={userInfo}
              timetable={timetable}
              handlePostTimetable={handlePostTimetable}
              handleUpdateTimetable={handleUpdateTimetable}
              handleDeleteCard={handleDeleteCard}
              handleAddTimetable={handleAddTimetable}
            />
          )}
        ></Route>
      </Switch>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const ContentCard = styled.div`
  overflow: auto;
  ${({ theme }) => theme.common.contentCardDiv}
`;
const Title = styled.div`
  ${({ theme }) => theme.common.contentTitle}
  width:100%;
  border-bottom: 1px solid lightgray;
`;
const AddText = styled.div`
  width: 100%;
  height: 3%;
  text-align: center;
  margin-top: 3%;
  color: #6f6eff;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;
const AddButton = styled.span`
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  width: 95%;
  text-align: center;
  margin: 0 auto;
  margin-top: 5%;
`;
const WireButton = styled(Link)`
  text-decoration: none;
  ${({ theme }) => theme.common.defaultButton}
`;
