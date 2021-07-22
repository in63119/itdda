import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { ListInnerCard } from "./Index";
interface propsType {
  NoticeInnerCard: JSX.Element;
}
export default function MedicineList(props: propsType) {
  return (
    <Wrap>
      <ContentCard>
        <Title>투약의뢰서 List</Title>
        <CategoryWrap>
          <CategoryNotice>투약의뢰서</CategoryNotice>
          <CategoryEvent>투약 보고서</CategoryEvent>
        </CategoryWrap>
        <CardWrapper>
          {/* {medicine.data.map((element, index) => {
            return (
              <ListInnerCard
                key={index}
                userId={element.userId}
                userName={element.userName}
                createdAt={element.created_at}
                classId={element.classId}
                className={element.className}
              ></ListInnerCard>
            );
          })} */}
        </CardWrapper>
      </ContentCard>
      <ButtonWrapper>
        <WireButton to="/main/medicine/write">작성</WireButton>
      </ButtonWrapper>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentCard = styled.div`
  margin-bottom: 3%;
  ${({ theme }) => theme.common.contentCardDiv}
`;
const Title = styled.div`
  ${({ theme }) => theme.common.contentTitle}
`;
const CategoryWrap = styled.div`
  width: 95%;
  height: auto;
  margin: 0 auto;
  display: flex;
`;
const CategoryNotice = styled.span`
  flex: 1 auto;
`;
const CategoryEvent = styled.span`
  flex: 1 auto;
`;
const CardWrapper = styled.div`
  width: 98%;
  height: 89%;
  margin: 0 auto;
  overflow: auto;
`;

const ButtonWrapper = styled.div`
  width: 95%;
  text-align: center;
  margin: 0 auto;
`;
const WireButton = styled(Link)`
  text-decoration: none;
  ${({ theme }) => theme.common.defaultButton}
`;
