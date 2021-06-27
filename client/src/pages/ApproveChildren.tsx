import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { requestApproveChild } from '../common/axios';
import {
  handleAddChild,
  handleDeleteChild,
  handleGetAllChildByInstitution,
} from '../common/utils/firebaseFunction';
import { changeTimeStamp } from '../common/utils/changeTimeStamp';
interface propType {
  userInfo: any;
}
export default function ApproveChildren({ userInfo }: propType) {
  // 승인된 원아들
  const [approveChildren, setApproveChildren] = useState({
    approved: [],
    changedChildId: null,
    unapproved: [],
  });
  //승인,미승인 원아 리스트 요청
  async function handleApproveChildren(childId?: number) {
    const chilrenList = await requestApproveChild(childId);
    if (chilrenList) {
      setApproveChildren({
        approved: chilrenList.approved,
        changedChildId: chilrenList.changedChildId,
        unapproved: chilrenList.unapproved,
      });
    }
  }
  //미승인 -> 승인
  function handleApproveChild(institutionId: number, childId?: number) {
    handleApproveChildren(childId);
    //firebase 원아 추가
    handleAddChild(String(institutionId), String(childId));
  }
  //승인 > 미승인
  function handleUnapproveChild(institutionId: number, childId?: number) {
    handleApproveChildren(childId);
    // firebase 원아 삭제
    handleDeleteChild(String(institutionId), String(childId));
  }

  // 해당 페이지 랜딩 후 1회 승인, 미승인 원아 리스트 요청
  //! cleanup function으로 랜더링 타이밍 확인 필요
  useEffect(() => {
    handleApproveChildren();
    handleGetAllChildByInstitution(userInfo.institutionId);
  }, []);
  return (
    <>
      <Wrap>
        <Title>{'원아승인'}</Title>
        <Container>
          <SubTitle>승인대기중</SubTitle>
          <ContentWrapper>
            <CategoryWrapper>
              <FristCategory>어린이</FristCategory>
              <SecondCategory>시간</SecondCategory>
              <ThirdCategory>보호자</ThirdCategory>
              <BlankCategory />
            </CategoryWrapper>
            <Contents>
              {approveChildren.unapproved.map((element: any, index: number) => {
                return (
                  <CardWrapper key={element.childId}>
                    <Wrapper>
                      <CardName>{element.childName} 어린이</CardName>
                      <CardTime>{changeTimeStamp(element.createdAt)}</CardTime>
                      <CardParent>{element.user.parentName}</CardParent>

                      <CardAllowButton
                        onClick={() =>
                          handleApproveChild(
                            element.institutionId,
                            element.childId,
                          )
                        }
                      >
                        수락
                      </CardAllowButton>
                    </Wrapper>
                  </CardWrapper>
                );
              })}
            </Contents>
          </ContentWrapper>
          <SubTitle>승인완료</SubTitle>
          <ContentWrapper>
            <CategoryWrapper>
              <FristCategory>어린이</FristCategory>
              <SecondCategory>시간</SecondCategory>
              <ThirdCategory>보호자</ThirdCategory>
              <BlankCategory />
            </CategoryWrapper>
            <Contents>
              {approveChildren.approved.map((element: any, index: number) => {
                return (
                  <CardWrapper key={element.childId}>
                    <Wrapper>
                      <CardName>{element.childName} 어린이</CardName>
                      <CardTime>{changeTimeStamp(element.createdAt)}</CardTime>
                      <CardParent>{element.user.parentName}</CardParent>
                      <CardAllowButton
                        onClick={() =>
                          handleUnapproveChild(
                            element.institutionId,
                            element.childId,
                          )
                        }
                      >
                        승인해제
                      </CardAllowButton>
                    </Wrapper>
                  </CardWrapper>
                );
              })}
            </Contents>
          </ContentWrapper>
        </Container>
        <ButtonWrapper>
          <WireButton to="/main">닫기</WireButton>
        </ButtonWrapper>
      </Wrap>
    </>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const Title = styled.div`
  justify-content: start;
  margin-left: 15px;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  width: 100%;
  height: 10%;
  color: black;
  padding-top: 30px;
`;

const Container = styled.div`
  width: 95%;
  height: 85%;
  margin: 0 auto;
  margin-bottom: 3%;
`;

const ButtonWrapper = styled.div`
  width: 95%;
  text-align: center;
  margin: 0 auto;
`;
const WireButton = styled(Link)<any>`
  text-decoration: none;
  ${({ theme }) => theme.common.defaultButton}
`;

const SubTitle = styled.div`
  width: 100%;
  height: 3%;
  color: #6f6eff;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;
const ContentWrapper = styled.div`
  width: 100%;
  height: 45%;
  margin: 0 auto;
  margin-bottom: 3%;
  border: 1px solid lightgray;
  border-radius: 12px;
`;
const CategoryWrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  text-align: center;

  padding: 0% 3% 0% 3%;
  border-bottom: 1px solid lightgray;
  @media ${({ theme }) => theme.device.tablet} {
    text-align: center;
    span {
      flex: 1 auto;
    }
  } ;
`;

const FristCategory = styled.span`
  width: 81%;
  align-self: center;
  color: ${({ theme }) => theme.colors.gray};
  flex: 1 auto;
`;
const SecondCategory = styled.span`
  width: 100%;
  align-self: center;
  color: ${({ theme }) => theme.colors.gray};
  flex: 1 auto;
`;
const ThirdCategory = styled.span`
  width: 100%;
  padding-left: 37px;
  align-self: center;
  color: ${({ theme }) => theme.colors.gray};
  flex: 1 auto;
  @media ${({ theme }) => theme.device.mobileL} {
    padding-left: 1px;
  }
`;

const BlankCategory = styled.span`
  width: 100%;
  flex: 1 auto;
`;
const Contents = styled.div`
  width: 100%;
  height: 90%;
  padding: 2%;
  overflow: auto;
  margin: 0 auto;
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 40px;
  
  @media ${({ theme }) => theme.device.tablet} {
    display: grid;
    text-align-last: center;
    margin: 3% 0% 3% 0%;
    grid-gap: 10px;
};
  }
  color: ${({ theme }) => theme.colors.gray};
`;
const CardName = styled.span`
  text-align: center;
  width: 75%;
  flex: 1 auto;
`;
const CardTime = styled.span`
  text-align: center;
  width: 100%;
  flex: 1 auto;
`;
const CardParent = styled.span`
  text-align: center;
  width: 100%;
  flex: 1 auto;
`;
const CardButtonWrapper = styled.span`
  flex: 1 auto;
`;
const CardAllowButton = styled.button`
  width: 69%;
  height: 27px;
  ${({ theme }) => theme.common.unclickedButtonStyle}
  flex: 1 auto;
`;
const Wrapper = styled.span`
  width: 100%;
  display: flex;
`;
