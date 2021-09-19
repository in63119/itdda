import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
interface propsType {
  userInfo: any;
}

export default function Avatar({ userInfo }: propsType) {
  return (
    <WrapFrame>
      <Wrap>
        {(() => {
          if (userInfo.permission === "parent") {
            if (userInfo.mainData[userInfo.currentChild].profileImg) {
              return (
                <AvatarFrame>
                  <AvatarCard
                    src={userInfo.mainData[userInfo.currentChild].profileImg}
                    alt={userInfo.mainData[userInfo.currentChild].profileImg}
                  ></AvatarCard>
                </AvatarFrame>
              );
            }
            return (
              <AvatarFrame>
                <AvatarCard
                  src="../images/defaultAvatar.png"
                  alt="avatar"
                ></AvatarCard>
              </AvatarFrame>
            );
          }
          if (userInfo.mainData.profileImg) {
            return (
              <AvatarFrame>
                <AvatarCard
                  src={userInfo.mainData.profileImg}
                  alt={userInfo.mainData.profileImg}
                ></AvatarCard>
              </AvatarFrame>
            );
          }
          return (
            <AvatarFrame>
              <AvatarCard
                src="../images/defaultAvatar.png"
                alt="avatar"
              ></AvatarCard>
            </AvatarFrame>
          );
        })()}
        <NameTagWrap>
          {(() => {
            if (userInfo.permission === "parent") {
              return (
                <>
                  <ClassWrap>
                    {userInfo.mainData[userInfo.currentChild].institutionName}
                    {userInfo.mainData[userInfo.currentChild].className}
                  </ClassWrap>
                  <NameTag>
                    {userInfo.mainData[userInfo.currentChild].childName} 어린이
                  </NameTag>
                </>
              );
            }
            return (
              <NameTag id="institution">
                {userInfo.mainData.institutionName}
              </NameTag>
            );
          })()}
        </NameTagWrap>
      </Wrap>
    </WrapFrame>
  );
}
const WrapFrame = styled.div`
  width: 100%;
  height: 185px;
  @media ${({ theme }) => theme.device.mobileL} {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  @media ${({ theme }) => theme.device.mobileL} {
    height: 90%;
    width: 80%;
  }
`;
const AvatarFrame = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 8px 8px 35px 8px;
  @media ${({ theme }) => theme.device.mobileL} {
  }
`;
const AvatarCard = styled.img`
  ${({ theme }) => theme.common.avatarImageDiv}
`;

const NameTagWrap = styled.div`
  width: fit-content;
  display: block;
  padding: 6%;
  height: 50px;
  position: relative;
  background: white;
  border-radius: 0px 10px 10px 0px;
  box-shadow: 0px 0px 5px #c8c8c8;
  top: -69px;
  @font-face {
    font-family: "NanumSquareWeb";
    src: url("../fonts/NanumSquareOTFLight.otf");
  }
  font-family: "NanumSquareWeb";
  #institution {
    font-size: 1.3rem;
    align-self: center;
  }
`;
const ClassWrap = styled.div`
  width: 100%;
  height: 50%;
  place-content: center;
  align-items: flex-end;
  display: flex;
  color: lightgray;
  font-size: 0.7rem;
`;
const NameTag = styled.div`
  width: 100%;
  color: black;
  text-align: center;
  font-size: 1rem;
  height: auto;
`;
