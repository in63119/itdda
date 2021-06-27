import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";

export default function GuestApproving() {
  // const permission = JSON.parse(localStorage.getItem('loginInfo')!).permission;

  // const accessToken = JSON.parse(localStorage.getItem('loginInfo')!)
  //   .accessToken;

  return (
    <ApprovingWrap>
      <div id="text">
        <div>기관에 승인 요청중입니다.</div>
      </div>
      <div>
        <Link to="/">
          <Button>홈으로 돌아가기</Button>
        </Link>
      </div>
    </ApprovingWrap>
  );
}
const ApprovingWrap = styled.div`
  background-image: url("../images/signbackground.png");

  background-size: 100% 100%;
  background-repeat: no-repeat;
  @font-face {
    font-family: "NanumSquareWeb";
    src: url("../fonts/NanumSquareOTFLight.otf");
  }
  font-family: "NanumSquareWeb";
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  #text {
    font-size: 40px;
    @media ${({ theme }) => theme.device.mobileL} {
      font-size: 1.5rem;
    }
  }
  @media ${({ theme }) => theme.device.mobileL} {
    background: none;
  }
`;

const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin: 2vh 0vw 2vh 0vw;
`;
