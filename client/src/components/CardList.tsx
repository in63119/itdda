import React from "react";
import { Link, useRouteMatch, withRouter } from "react-router-dom";
import styled from "styled-components";
import { changeTimeStamp } from "../common/utils/changeTimeStamp";
interface propsType {
  title?: string;
  imageTitle?: string;
  content?: any;
  createdAt?: string;
  userInfo?: any;
}
function CardList({
  content,
  title,
  imageTitle,
  createdAt,
  userInfo,
}: propsType) {
  const urlMatch = useRouteMatch();
  return (
    <>
      <Wrap>
        <Title>{title}</Title>
        {title === "급식표" ? (
          <SubMenu>
            <FristMenu>{"월별"}</FristMenu>
            <SecondMenu>{"일별"}</SecondMenu>
          </SubMenu>
        ) : (
          <SubMenu>
            <FristMenu>{"전체앨범"}</FristMenu>
          </SubMenu>
        )}
        <CardWrapper>
          {content ? (
            <CardContainer>
              {content.map((element: any, index: number) => {
                const createAt = changeTimeStamp(element.createdAt);
                return (
                  <Card key={element.albumId}>
                    <Image src={element.photo}></Image>
                    <TextContainer>
                      <ImageTitle>{element.title}</ImageTitle>
                      <ImageCreatedAt>{createAt}</ImageCreatedAt>
                    </TextContainer>
                  </Card>
                );
              })}
            </CardContainer>
          ) : null}
        </CardWrapper>

        {(() => {
          if (userInfo.permission === "parent") {
            return null;
          }
          return (
            <ButtonWrapper>
              <WirteButton to={`${urlMatch.path}/write`}>작성</WirteButton>
            </ButtonWrapper>
          );
        })()}
      </Wrap>
    </>
  );
}
export default CardList;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  height: 300px;
  max-width: 200px;
  margin: 1%;

  // ${({ theme }) => theme.common.defaultCardDiv}
`;
const CardContainer = styled.div`
  padding: 2%;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: grid;
  //암시적 로우 크기 (아이템이 생성될떄마다 생성)
  grid-auto-rows: 200px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5%;
  @media ${({ theme }) => theme.device.mobileL} {
    grid-auto-rows: 200px;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5%;
  }
`;

const ButtonWrapper = styled.div`
  width: 95%;
  text-align: center;
  margin: 0 auto;
`;
const WirteButton = styled(Link)`
  ${({ theme }) => theme.common.defaultButton}
`;

const SubMenu = styled.div`
  width: 95%;
  height: 3%;
  margin: 0 auto;
  display: flex;
  border-bottom: 1px solid lightgray;
  padding-bottom: 1%;
`;
const FristMenu = styled.span`
  flex: 1 auto;
  margin-left: 3%;
`;
const SecondMenu = styled.span`
  flex: 11 auto;
`;
const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  width: 100%;
  height: 10%;
  color: black;
  padding-top: 30px;
  margin-left: 15px;
`;
const Image = styled.img`
  width: 100%;
  height: 65%;
  border-radius: 15px 15px 15px 15px;
  border-bottom: 1px solid lightgray;
`;
const ImageTitle = styled.div`
  width: 95%;
  height: 60%;
  margin: 0 auto;
  font-size: 1.6rem;
`;
const ImageCreatedAt = styled.div`
  width: 100%;
  height: 20%;
  text-align: end;
  color: #d5d5d5;
`;

const TextContainer = styled.div`
  width: 95%;
  height: 35%;
  padding: 2%;
`;

const CardWrapper = styled.div`
  width: 98%;
  height: 82%;
  margin: 0 auto;
  margin-bottom: 2%;
  overflow: auto;
  padding: 1%;
`;
