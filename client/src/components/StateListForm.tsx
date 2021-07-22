import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { ListInnerCard, StateCardForm } from "./Index";
interface propsType {
  title: string;
  childInfo: any;
  fristCategory?: string;
  secondCategory?: string;
  location: RouteComponentProps["location"];
  history: RouteComponentProps["history"];
  match: RouteComponentProps["match"];
}
function StateListForm({
  title,
  childInfo,
  fristCategory,
  secondCategory,
  match,
}: propsType) {
  return (
    <Wrap>
      <Title>{title}</Title>
      <CategoryWrap>
        <FristCategory>{fristCategory}</FristCategory>
        <SecondCategory>{secondCategory}</SecondCategory>
        <ThirdCategory>
          <TitleInput></TitleInput>
        </ThirdCategory>
        <FourthCategory>
          <Sreach>검색</Sreach>
        </FourthCategory>
      </CategoryWrap>
      {childInfo.childrenList.length !== 0 ? (
        <CardWrapper>
          {childInfo.childrenList.map((element: any, index: number) => {
            return (
              <StateCardForm
                key={element.childId}
                childInfo={element}
              ></StateCardForm>
            );
          })}
        </CardWrapper>
      ) : (
        <LoadingWrapper>
          <Loader id="loadingImage" src="../images/loading.gif"></Loader>
        </LoadingWrapper>
      )}
    </Wrap>
  );
}
export default withRouter(StateListForm);
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentCard = styled.div`
  margin-bottom: 3%;
  ${({ theme }) => theme.common.contentCardDiv}
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
const CategoryWrap = styled.div`
  width: 95%;
  height: auto;
  margin: 0 auto;
  display: flex;
  border-bottom: 1px solid lightgray;
  padding-bottom: 1%;
`;
const FristCategory = styled.span`
  flex: 1 auto;
`;
const SecondCategory = styled.span`
  flex: 1 auto;
`;
const ThirdCategory = styled.span`
  flex: 5 auto;
`;
const FourthCategory = styled.span`
  flex: 1 auto;
  text-align: center;s
`;
const CategoryYear = styled.span`
  flex: 11 auto;
  text-align: right;
`;
const CardWrapper = styled.div`
  width: 98%;
  height: 83%;
  margin: 0 auto;
  overflow: auto;
  padding: 2%;
  margin-bottom: 2%;
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
const TitleInput = styled.input`
  width: 100%;

  ${({ theme }) => theme.common.defaultInput}
`;

const Sreach = styled.span`
  ${({ theme }) => theme.common.defaultButton}
`;
const Loader = styled.img`
  width: 200px;
  text-align: center;
  font-size: 2rem;
  align-self: center;
`;
const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
