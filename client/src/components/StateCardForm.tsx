import react from "react";
import styled from "styled-components";
import { State } from "./Index";
interface propsType {
  childInfo: any;
}
export default function StateCardForm({ childInfo }: propsType) {
  // console.log(childInfo, '카드 속 아이정보');
  return (
    <>
      <StateCard>
        <Wrapper>
          <Avatar>
            {/* <AvatarImage src="../images/profile.png"></AvatarImage> */}
            <AvatarImage src={childInfo.profileImg}></AvatarImage>
          </Avatar>
          <StateWrapper>
            <NameWrapper>
              <Institution>{childInfo.institution.institutionName}</Institution>
              <Class>{childInfo.classs.className}</Class>
              <Name>{childInfo.childName}</Name>
            </NameWrapper>
            <State
              type={"원아 상태관리"}
              childInfo={childInfo}
              isCheck={childInfo.state.isCheck}
              isOk={childInfo.state.isOk}
              isSleep={childInfo.state.isSleep}
              isEat={childInfo.state.isEat}
              please={childInfo.state.please}
            ></State>
          </StateWrapper>
        </Wrapper>
      </StateCard>
    </>
  );
}
const StateCard = styled.div`
  width: 100%;
  margin-top: 3%;
  margin-bottom: 3%;
  height: fit-content;
  display: flex;
  ${({ theme }) => theme.common.stateCardDiv}
`;
const Avatar = styled.div`
  width: 75px;
  height: 75px;
  margin: 1%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 5px #c8c8c8;
`;
const AvatarImage = styled.img`
	width: 100%;
	height: auto;
	object-fit : cover;
}`;
const Wrapper = styled.div`
  width: 100%;
  padding: 1%;
  display: flex;
`;

const StateWrapper = styled.span`
  width: 100%;
  height: 100%;
  padding: 2%;
`;
const Institution = styled.span`
  width: 100%;
  height: 100%;
  color: lightgray;
`;
const Class = styled.span`
  width: 100%;
  height: 100%;
  margin-left: 10px;
  color: lightgray;
`;
const Name = styled.span`
  width: 100%;
  height: 100%;
  margin-left: 10px;
  font-size: 1.2rem;
`;

const NameWrapper = styled.div`
  width: 100%;
  heitht: 100%;
`;
