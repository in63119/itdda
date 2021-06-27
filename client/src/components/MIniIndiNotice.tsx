import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ListInnerCard } from './Index';
import { changeTimeStamp } from '../common/utils/changeTimeStamp';
interface propsType {
  userInfo: any;
  list: any;
}
export default function MiniIndiNotice({ userInfo, list }: propsType) {
  return (
    <Wrap>
      <Title>알림장</Title>
      {list ? (
        <NoticeContainar>
          {userInfo.permission === 'parent'
            ? list.map((element: any, index: number) => {
                return (
                  <ListInnerCard
                    content={element}
                    key={element.indiNoticeId}
                    title={'알림장'}
                    type={'mainIndiNotice'}
                  ></ListInnerCard>
                );
              })
            : list.map((element: any, index: number) => {
                return (
                  <ListInnerCard
                    content={element}
                    key={element.indiNoticeId}
                    title={'알림장'}
                    type={'mainIndiNotice'}
                  ></ListInnerCard>
                );
              })}
        </NoticeContainar>
      ) : (
        <div>데이터가 없습니다</div>
      )}
      <More to="/main/indi_notice">더보기</More>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 95%;
  height: 20%;
  margin: 0 auto;
  border: solid 1px #eeeeee;
  border-radius: 15px 15px 15px 15px;
  display: flex;
  flex-direction: column;
  @font-face {
    font-family: 'NanumSquareWeb';
    src: url('../fonts/NanumSquareOTFLight.otf');
  }
  font-family: 'NanumSquareWeb';
`;
const Title = styled.label`
  width: 100%;
  font-size: 1.5rem;
  text-align: center;
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: solid 1px #eeeeee;
`;
const NoticeContainar = styled.div`
  width: 100%;
  height: 80%;
  overflow: auto;
`;
const More = styled(Link)<any>`
  display: block;
  padding: 1%;
  text-align: end;
  margin-right: 2%;
`;
