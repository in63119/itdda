import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { changeTimeStamp } from "../common/utils/changeTimeStamp";

interface propsType {
  userId?: string;
  userName?: string;
  createdAt?: string;
  classId?: string;
  className?: string;
  content?: any;
  title?: string;
  category?: string;
  type: string;
}
export default function ListInnerCard(props: propsType) {
  const urlMatch = useRouteMatch();
  const destination = "";
  // console.log(urlMatch, '현재 위치');
  // if (urlMatch.path === '/main') {
  //   destination = '/main/notice';
  //   console.log(destination, '도착지 위치');
  // }
  // 공지사항 리스트 상태
  const { content, title, type, category, createdAt } = props;
  // 투약의뢰서 리스트 상태
  const { userId, userName, classId, className } = props;
  let writer = "";
  if (content.user !== undefined && title === "알림장") {
    writer = content.user.writterName;
  }
  if (content.category === "notice") {
    writer = content.writer;
  }
  if (content.category === "event") {
    writer = content.writer;
  }
  return (
    <>
      <NoticeCard
        id={content.contentId}
        to={`${destination || urlMatch.path}/${type === "" ? "" : type + "/"}${
          content.noticeId || content.indiNoticeId
        }`}
      >
        <Point>
          <img className="pointer" src="../images/point.png" />
        </Point>
        {title === "알림장" ? (
          <Content>{content.contents || content.content}</Content>
        ) : (
          <Content>{title}</Content>
        )}

        <Writer>{writer}</Writer>
        <CreateAt>
          {content ? changeTimeStamp(content.createdAt) : null}
        </CreateAt>
      </NoticeCard>
    </>
  );
}
const Point = styled.div`
  flex: 1 auto;
  margin: 0 2%;
  width: 100%;
  height: auto;
  width: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NoticeCard = styled(Link)<any>`
  display: flex;
  width: 100%;
  padding: 1%;
  cursor: pointer;
`;
const CreateAt = styled.div`
  width: 30%;
  flex: 2 auto;
  font-size: 10px;
  color: #bcbbbb;
  margin: 0 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: end;
`;
const Content = styled.div`
  width: 100%;
  font-size: 15px;
  flex: 4 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Writer = styled.div`
  flex: 2 auto;
  width: 30%;
  color: #bcbbbb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: end;
  font-size: 13px;
`;
