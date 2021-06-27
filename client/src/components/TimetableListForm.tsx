import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TimeTableCard } from "./Index";
import { requestUploadTimetable } from "../common/axios";
import { ChangeToArray } from "../common/utils/findCurrentEducation";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import { time } from "console";
interface propType {
  userInfo: any;
  timetable: any;
  handleAddTimetable: any;
  type: string;
  handledAddCard: any;
  handleDeleteCard: any;
  handleUpdateTimetable: any;
  handlePostTimetable: any;
  handleTimetableChange: any;
}
export default function TimtableListForm({
  userInfo,
  type,
  timetable,
  handledAddCard,
  handleDeleteCard,
  handleTimetableChange,
  handlePostTimetable,
  handleAddTimetable,
  handleUpdateTimetable,
}: propType) {
  const urlMatch = useRouteMatch();
  const PREVIOUS_PAGE = -1;
  return (
    <Wrap>
      <Title>시간표</Title>
      <ContentCard>
        {
          timetable.list
            ? timetable.list.map((element: any, index: number) => {
                return (
                  <TimeTableCard
                    key={index}
                    type={type}
                    timetable={element}
                    handleUpdateTimetable={handleUpdateTimetable}
                  ></TimeTableCard>
                );
              })
            : null
          // <div className="emptyTime">등록된 시간표가 없습니다.</div>
        }
        {urlMatch.path === "/main/timetable/write" ? (
          <>
            <AddText>
              <AddButton onClick={handledAddCard}>시간표 추가</AddButton>
              <AddButton onClick={handleDeleteCard}>시간표 삭제</AddButton>
            </AddText>
          </>
        ) : null}
      </ContentCard>
      {(() => {
        if (userInfo.permission === "institution") {
          if (type === "write") {
            return (
              <ButtonWrapper>
                <Button onClick={() => history.go(PREVIOUS_PAGE)}>취소</Button>
                <Button onClick={handlePostTimetable}>등록</Button>
              </ButtonWrapper>
            );
          }
          return (
            <ButtonWrapper>
              <WireButton to={`${urlMatch.path}/write`}>작성</WireButton>
            </ButtonWrapper>
          );
        }
      })()}
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 95%;
`;
const ContentCard = styled.div`
  height: 50%;
  overflow: auto;
  .emptyTime {
    @font-face {
      font-family: "NanumSquareWeb";
      src: url("../fonts/NanumSquareOTFLight.otf");
    }
    font-family: "NanumSquareWeb";
    text-align: center;
    margin-top: 100px;
  }
`;
const Title = styled.div`
  justify-content: start;
  margin-left: 15px;
  font-size: 35px;
  width: 100%;
  height: 10%;
  color: black;
  padding-top: 30px;
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
  margin-left: 4%;
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
const Button = styled.span`
  text-decoration: none;
  margin-left: 2%;
  ${({ theme }) => theme.common.defaultButton}
`;
