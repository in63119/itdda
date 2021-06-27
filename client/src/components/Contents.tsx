import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  AlbumCarousel,
  Timetable,
  Carousel,
  MiniNotice,
  MIniIndiNotice,
  MainMenu,
} from './Index';
interface propsType {
  list: any;
  userInfo: any;
  handleChangeChild: (index: number) => void;
}
export default function Contents({
  list,
  userInfo,
  handleChangeChild,
}: propsType) {
  //탭 메뉴 상태
  const [clickedMenu, setClickedMenu] = useState(0);
  //탭 메뉴 클릭 이벤트
  const handleChangeMenu = (menu: number) => {
    setClickedMenu(menu);
    handleChangeChild(menu);
  };
  return (
    <Wrap>
      {userInfo.permission === 'parent' ? (
        <BookMarkWrap>
          {userInfo.mainData.map((element: any, index: number) => {
            return (
              <BookMark
                key={index}
                childId={element.childId}
                checked={clickedMenu}
                order={`${userInfo.mainData.length}0`}
                className={clickedMenu === index ? 'active' : ''}
                onClick={() => handleChangeMenu(index)}
              >
                <Name>{element.childName}</Name>
              </BookMark>
            );
          })}
        </BookMarkWrap>
      ) : null}
      <Timetable userInfo={userInfo}></Timetable>
      <MainMenu></MainMenu>
      <MiniNotice userInfo={userInfo} list={list.mainMiniNotice}></MiniNotice>
      {(() => {
        if (
          userInfo.permission === 'teacher' ||
          userInfo.permission === 'parent'
        ) {
          return (
            <>
              <MIniIndiNotice
                userInfo={userInfo}
                list={
                  userInfo.permission === 'teacher'
                    ? list.mainMiniIndiNotice
                    : userInfo.mainData[userInfo.currentChild].indiNotice
                }
              ></MIniIndiNotice>
            </>
          );
        }
        return null;
      })()}
      <Title>앨범</Title>
      <AlbumCarousel userInfo={userInfo}></AlbumCarousel>
    </Wrap>
  );
}
const Title = styled.label`
  width: 100%;
  font-size: 1.5rem;
  margin: 0 auto;
  display: flex;
  margin: 2% 0% 0% 0%;
  justify-content: center;
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const BookMark = styled.button<any>`
  width: 60px;
  background: white;
  border-radius: 7px 7px 0px 0px;
  // transform: perspective(100px) rotateX(45deg);
  cursor: pointer;
  border: 0;
  outline: 0;
  z-index: ${(props) => props.order};
  box-shadow: 0px 0px 5px #c8c8c8;
  &:focus {
    display: none;
  }
`;
const BookMarkWrap = styled.div`
  display: flex;
  padding-left: 20px;
  position: relative;
  top: -24px;
  button div {
    color: #bcbbbb;
  }
  .active {
    background: #6f6eff;
    color: #0b0c21;
    z-index: 100;
    div {
      color: white;
    }
  }
`;
const Name = styled.div`
  color: white;
  font-size: 1rem;
  transform: unset;
  margin-top: 6px;
  // transform: perspective(40px) rotateX(-15deg);
`;
