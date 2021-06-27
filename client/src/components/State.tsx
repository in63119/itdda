import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { JsxEmit } from 'typescript';
import { updateChildState } from '../common/utils/firebaseFunction';
interface propsType {
  type: string;
  isCheck: boolean;
  isOk: boolean;
  isSleep: boolean;
  isEat: boolean;
  please: boolean;
  childInfo: any;
}
export default function State({
  type,
  childInfo,
  isCheck,
  isOk,
  isSleep,
  isEat,
  please,
}: propsType) {
  const handelUpdataChildState = (
    e: any,
    stateName: string,
    state: boolean,
  ) => {
    const selectedChildId = e.target.id;
    updateChildState(
      childInfo.institutionId,
      selectedChildId,
      stateName,
      state,
    );
  };
  // console.log(isCheck, ' =출석', isOk, '=완료', isSleep, '=낮잠');
  return (
    <Wrap>
      <Container type={type}>
        <StateWrap nowState={isCheck}>
          {childInfo ? (
            <StateText
              id={childInfo.childId}
              isTeacher={true}
              onClick={(e: any) =>
                handelUpdataChildState(e, 'isCheck', isCheck)
              }
            >
              출석
            </StateText>
          ) : (
            <StateText>출석</StateText>
          )}
          <StateIcons
            src={
              isCheck ? '../images/check-white.png' : '../images/check-gray.png'
            }
            alt="출석"
          ></StateIcons>
        </StateWrap>
        <StateWrap nowState={!isOk}>
          {childInfo ? (
            <StateText
              id={childInfo.childId}
              isTeacher={true}
              onClick={(e: any) => handelUpdataChildState(e, 'isOk', isOk)}
            >
              투약
            </StateText>
          ) : (
            <StateText>투약</StateText>
          )}
          <StateIcons
            src={
              isOk
                ? '../images/medicine-gray.png'
                : '../images/medicine-white.png'
            }
            alt="투약"
          ></StateIcons>
          {/* {childInfo.permission === 'parent' ? (
            <>
              <StateWrap nowState={isOk}>
                <StateText>투약약</StateText>
              </StateWrap>
            </>
          ) : null} */}
        </StateWrap>
        <StateWrap nowState={isSleep}>
          {childInfo ? (
            <StateText
              id={childInfo.childId}
              isTeacher={true}
              onClick={(e: any) =>
                handelUpdataChildState(e, 'isSleep', isSleep)
              }
            >
              낮잠
            </StateText>
          ) : (
            <StateText>낮잠</StateText>
          )}
          <StateIcons
            src={
              isSleep ? '../images/nap-white.png' : '../images/sleep-gray.png'
            }
            alt="낮잠"
          ></StateIcons>
        </StateWrap>
        <StateWrap nowState={isEat}>
          {childInfo ? (
            <StateText
              id={childInfo.childId}
              isTeacher={true}
              onClick={(e: any) => handelUpdataChildState(e, 'isEat', isEat)}
            >
              식사
            </StateText>
          ) : (
            <StateText>식사</StateText>
          )}
          <StateIcons
            src={isEat ? '../images/meal-white.png' : '../images/meal-gray.png'}
            alt="식사"
          ></StateIcons>
        </StateWrap>
      </Container>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
`;
const Container = styled.div<any>`
  display: grid;
  width: 100%;
  padding: 4% 0% 4% 0%;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  grid-gap: 10px;
  align-self: center;
  ${(props) =>
    props.type === '원아 상태관리' &&
    css`
      display: flex;
      padding: 0;
      width: 98%;
    `}
`;
const StateWrap = styled.div<any>`
  height: 100%;
  width: 100%;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #c8c8c8;
  display: flex;
  ${(props) =>
    props.nowState &&
    css`
      background: #6f6eff;
      span {
        color: white;
      }
    `}
`;
const StateIcons = styled.img`
  width: auto;
  height: 25px;
  margin: 4%;
`;

const StateText = styled.span<any>`
  flex: 1 auto;
  color: #7f7b7b;
  font-size: 15px;
  ${(props) =>
    props.isTeacher === true &&
    css`
      cursor: pointer;
    `}
`;
