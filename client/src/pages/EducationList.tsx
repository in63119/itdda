import React from "react";
import styled from "styled-components";
export default function EducationList() {
  return (
    <Wrap>
      <ContentCard>
        <Title>교육 프로그램</Title>
        <div className="loadingFrame">
          <Loading id="loading" src="../images/outOfService.png" />
        </div>
      </ContentCard>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  .loadingFrame {
    text-align: center;
    margin-top: 60px;
  }
`;
const ContentCard = styled.div`
  ${({ theme }) => theme.common.contentCardDiv}
`;
const Title = styled.div`
  justify-content: start;
  margin-left: 15px;
  width: 100%;
  font-size: 35px;
  width: 100%;
  height: 10%;
  color: black;
  padding-top: 30px;
`;
const Loading = styled.img`
  width: 200px;
  height: auto;
`;
