import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { isConstructorDeclaration } from "typescript";
import { findStepEducation } from "../common/utils/findCurrentEducation";

interface propsType {
  step: number;
  previousStep: number;
}
interface props {
  userInfo: any;
}
export default function Timetable({ userInfo }: props) {
  // 현재 시간 상태
  const [time, setTime] = useState("");
  // timetable 상태
  const [currentTimeTable, setCurrentTimeTable] = useState({
    step: 0,
    previousStep: 0,
    currentTime: "",
    currentEducation: "",
    totalTimetable:
      userInfo.permission === "parent"
        ? userInfo.mainData[userInfo.currentChild].timetable!
        : userInfo.mainData.timetable,
  });
  // 현재 진행중인 교육상태 업데이트
  useEffect(() => {
    //시간표를 등록했을경우
    if (currentTimeTable.totalTimetable !== "'[]'") {
      // console.log('시간표가 없을경우');
      const currentEducation = findStepEducation(
        time,
        currentTimeTable.totalTimetable,
      );
      setCurrentTimeTable({
        ...currentTimeTable,
        step: currentEducation?.step || 0,
        currentTime: currentEducation?.timetable,
        currentEducation: currentEducation?.currentEducation,
      });
    }
  }, [time]);

  // 현재 시간 업데이트
  const tick = () => {
    const date = new Date();
    const hour: string = date.getHours().toString();
    let minute: string = date.getMinutes().toString();
    // let minute: string = date.getMinutes().toString();
    if (minute.length === 1) {
      minute = "0" + minute;
    }
    setTime(`${hour}${minute}`);
  };
  useEffect(() => {
    setInterval(tick, 1000);
  }, []);
  //09시부터 ~ 18시까지 정규수업
  if (Number(time) > 900 && Number(time) < 1700) {
    // console.log('정규시간 아님');
    setInterval(tick, 1000);
  }
  useEffect(() => {
    setCurrentTimeTable({
      ...currentTimeTable,
      previousStep: currentTimeTable.step,
    });
  }, [currentTimeTable.step]);
  return (
    <Wrap>
      {time ? (
        <>
          <Container>
            <ProgerssBarBack>
              <ProgressBar
                previousStep={currentTimeTable.previousStep}
                step={currentTimeTable.step}
              >
                <CurrentEducation id="state-box">
                  <EducationWrap>
                    <Icon src="../images/education.png" alt="아이콘"></Icon>
                    <CurrentState>
                      <Time>
                        <TimeText>
                          {(() => {
                            if (currentTimeTable.currentTime) {
                              return currentTimeTable.currentTime;
                            }
                            if (currentTimeTable.totalTimetable === null) {
                              return "시간표를 등록하세요";
                            }
                          })()}
                        </TimeText>
                      </Time>
                      <Education>
                        <label>
                          {currentTimeTable.currentEducation ||
                            "시간표를 확인해주세요"}
                        </label>
                      </Education>
                    </CurrentState>
                  </EducationWrap>
                </CurrentEducation>
              </ProgressBar>
            </ProgerssBarBack>
          </Container>
          <TimeTable to="/main/timetable">전체시간표 보기</TimeTable>
        </>
      ) : (
        <LoadingWrapper>
          <Loader id="loadingImage" src="../images/loading.gif"></Loader>
        </LoadingWrapper>
      )}
    </Wrap>
  );
}
const progerssBar = (previousStep: any, step: any) => keyframes`
0%{
	width:${previousStep}%;
}

100%{
	width:${step}%;
}`;

const Wrap = styled.div`
  height: 14%;
  margin: 0 auto;
  width: 85%;
  @font-face {
    font-family: "NanumSquareWeb";
    src: url("../fonts/NanumSquareOTFLight.otf");
  }
  font-family: "NanumSquareWeb";
`;
const TimeText = styled.label`
  font-size: 10px;
`;
const CurrentEducation = styled.div`
  width: 120px;
  height: 70px;
  position: absolute;
  top: -27px;
  right: -41px;
  z-index: 3;
  font-size: 10px;
  background: white;
  border-radius: 6px 6px 6px 6px;
  box-shadow: 0px 0px 5px #c8c8c8;
`;
const ProgressBar = styled.div<propsType>`
  width: 0;
  height: 12px;
  left: -3px;
  border-radius: 10px;
  background: #6f6eff;
  display: inline-block;
  justify-content: flex-end;
  z-index: 2;
  margin-left: 3px;
  position: relative;
  animation: ${(props) => progerssBar(props.previousStep, props.step)} 2s
    ease-in-out;
  animation-fill-mode: forwards;
`;
const ProgerssBarBack = styled.div`
  height: 14px;
  position: relative;
  border-radius: 10px;
  top: 37px;
  margin: 0 auto;
  border: 1px solid #d0cdcd;
  background: #f0ecec;
`;
const Icon = styled.img`
  width: 3rem;
  height: auto;
`;
const EducationWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 5px;
  height: 100%;
`;
const CurrentState = styled.span`
  height: 100%;
  display: inline-grid;
  place-items: center;
  font-size: 10px;
`;
const Time = styled.div`
  width: 100%;
  font-size: 10px;
  height: 50%;
`;
const Education = styled.div`
  width: 100%;
  height: 50%;
`;
const Container = styled.div`
  width: 77%;
  height: 80%;
  margin: 0 auto;
  padding-top: 3%;
`;
const TimeTable = styled(Link)`
  float: right;
`;

const Loader = styled.img`
  width: 50px;
  text-align: center;
  font-size: 1rem;
  align-self: center;
`;
const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
