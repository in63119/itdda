import React, { useState } from "react";
import styled from "styled-components";
import { ImagePostForm } from "../components/Index";
import { requestLogin } from "../common/axios";
import { Link, useHistory, Redirect } from "react-router-dom";
import "dotenv/config";
interface props {
  hadleSetMainData: (mainData: any) => void;
}
//첫 페이지
function Intro({ hadleSetMainData }: props) {
  const history = useHistory();
  const [guest, setGuest] = useState({
    institution: "institution1@datda.net",
    teacher: "teacher1@datda.net",
    parent: "parent1@datda.net",
  });
  const handleLogin = async (email: string) => {
    const password = "asdf123!";
    const mainData = await requestLogin(email, String(password));
    if (typeof mainData !== "boolean") {
      if (mainData !== undefined) {
        hadleSetMainData(mainData);
        history.push("/main");
      }
    }
  };
  return (
    <IntroGlobal id="intro_global">
      <div className="logoWhiteFrame">
        <img className="logoWhite" src="../images/logo_white.png" />
      </div>
      <SectionIntro className="section intro">
        <div id="introText" data-aos="fade-down" data-aos-duration="2000">
          <div className="insuText">우리 아이 유치원 생활</div>
          <div className="insuText">더욱 스마트하게 관리하기</div>
        </div>
        <LinkArea>
          <Link to="/signup">
            <LinkDetail>회원가입</LinkDetail>
          </Link>
          <Link to="/login">
            <LinkDetail>로그인</LinkDetail>
          </Link>
          <GuestSpace>
            <Guest>Guest 로그인</Guest>
            <Describe>
              아래 버튼은 자동로그인 버튼입니다. 미리 구축된 Data를 기반으로
              사이트를 둘러볼 수 있습니다.
            </Describe>
            <GuestButtonWrapper>
              <GuestLoginButton onClick={() => handleLogin(guest.institution)}>
                기관장 로그인
              </GuestLoginButton>
              <GuestLoginButton onClick={() => handleLogin(guest.teacher)}>
                선생님 로그인
              </GuestLoginButton>
              <GuestLoginButton onClick={() => handleLogin(guest.parent)}>
                학부모 로그인
              </GuestLoginButton>
            </GuestButtonWrapper>
          </GuestSpace>
        </LinkArea>
      </SectionIntro>

      <Section1 className="section 1">
        <Section1Box>
          <div className="bigText big1">
            <div className="insuText">
              <span className="bold">정확한 공지사항</span>
              <span>과 </span>
            </div>
            <div className="insuText">
              <span className="bold">알림장</span>
              <span> 전달받기</span>
            </div>
          </div>
          <div className="smallText">
            <div className="text">잘못된 공지를 받고 혼란스러웠던</div>
            <div className="text">경험이 있나요? 닿다는 정확한</div>
            <div className="text">공지 내용을 가장 빠르게 전달합니다.</div>
          </div>
        </Section1Box>
        <div id="section1Image" data-aos="fade-up" data-aos-duration="1500">
          <img id="section1Image1" src="../images/web/intro2_graphic.svg"></img>
        </div>
      </Section1>

      <Section2 className="section 2">
        <div id="section2Flex">
          <div id="section2Left">
            <Section2Box>
              <div className="bigText section2">
                <div className="text">
                  <span className="bold insuText">아이들의 모든 일상을</span>
                </div>
                <div className="text">
                  <span className="bold insuText">실시간</span>
                  <span className="insuText">으로 공유하기</span>
                </div>
              </div>
              <div className="smallText">
                <div className="text">아이들이 보고싶은 순간순간에 닿다는</div>
                <div className="text">
                  아이들의 생생한 일상사진을 실시간으로
                </div>
                <div className="text">공유합니다</div>
              </div>
            </Section2Box>
          </div>
          <div
            id="section2Image"
            data-aos="fade-left"
            data-aos-duration="500"
            data-aos-mirror="true"
          >
            <img
              id="section2Image1"
              src="../images/web/intro3_graphic.svg"
            ></img>
          </div>
        </div>
      </Section2>

      <Section3 className="section 3">
        <div className="section3Box">
          <div className="bigText bold">
            <div className="insuText">아이들이 먹는 음식은</div>
            <div className="insuText">너무나도 중요하니까</div>
          </div>
          <div className="smallText">
            <div className="text">아이들이 건강한 몸을 위해</div>
            <div className="text section3">
              닿다는 오늘의 식단들을 공유합니다.
            </div>
            <div className="text">쑥쑥 성장할 우리 아이들!</div>
          </div>
        </div>
        <div id="section3Image" data-aos="fade-right" data-aos-duration="2000">
          <img id="section3Image1" src="../images/web/intro4_graphic.svg"></img>
        </div>
      </Section3>
      <Section4 className="section 4">
        <div id="section4Flex">
          <div id="section4Box">
            <div className="bigText section4 bold">
              <div className="insuText">간단하게 선생님과 </div>
              <div className="insuText">원아 관리하기</div>
            </div>
            <div className="smallText">
              <div className="text">간편하게 선생님과 원아를 반배정 하기</div>
              <div className="text">
                자유롭게 반배정하기 너무 편하지 않나요?
              </div>
            </div>
          </div>
          <div id="section4Right">
            <div id="section4Image" data-aos="fade-up" data-aos-duration="1500">
              <img
                id="section4Image1"
                src="../images/web/intro5_graphic_front.svg"
              ></img>
            </div>
          </div>
        </div>
      </Section4>
      <Section5 className="section 5">
        <div id="section5Box">
          <div className="bigText bold">
            <div className="insuText">투약 의뢰서로</div>
            <div className="insuText">아이건강 챙기기</div>
          </div>
          <div className="smallText">
            <div className="text">닿다는 투약의로서를 온라인으로 접수하여</div>
            <div className="text">
              아이들의 건강한 생활을 위한 정확한 투약을
            </div>
            <div className="text">진행하도록 돕습니다</div>
          </div>
        </div>
        <div id="section5Image" data-aos="fade-up" data-aos-duration="1000">
          <img id="section5Image1" src="../images/web/intro6_graphic.svg"></img>
        </div>
      </Section5>
      <Section6 className="section 6">
        <div id="section6Left">
          <div id="section6Box">
            <div className="bigText bold">
              <div className="insuText">빠르게</div>
              <div className="insuText">차량정보</div>
              <div className="insuText">확인하기</div>
            </div>
            <div className="smallText">
              <div className="text">우리 아이 무슨 버스 타야 좋을까</div>
              <div className="text">우리 아이는 언제쯤 집에 도착하는지</div>
              <div className="text">
                궁금할 때 닿다를 통해 빠르게 확인하세요
              </div>
            </div>
          </div>
        </div>
        <div id="section6Image" data-aos="fade-left" data-aos-duration="2000">
          <img id="section6Image1" src="../images/web/intro7_graphic.svg"></img>
        </div>
      </Section6>
      <LinkAgain className="linkAgain">
        <LinkArea>
          <Link to="/signup">
            <LinkButton>회원가입</LinkButton>
          </Link>
          <Link to="/login">
            <LinkButton>로그인</LinkButton>
          </Link>
        </LinkArea>
      </LinkAgain>
      <img
        src="../images/TO_THE_TOP2.png"
        id="goToTop"
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
      ></img>
    </IntroGlobal>
  );
}

export default Intro;
const GuestSpace = styled.div`
  background: #ffffff59;
  width: fit-content;
  border-radius: 20px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 2%;
`;
const GuestButtonWrapper = styled.div``;
const GuestLoginButton = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin : 1%;
`;
// 어느 id or classname인지만
const IntroGlobal = styled.div`
  .section {
    width : 100vw;
    height : 100vh;
    @media ${({ theme }) => theme.device.mobileL} {
      width : 100%;
    }
  }
  .logoWhiteFrame {
    position: relative;
    width: 100%;
  }
  .logoWhite {
    display: none;
    @media only screen and (max-width: 700px) {
      display: block;
      position: absolute;
      height: 40px;
      width: auto;
      left: 50%;
      top: 50%;
      transform:translate(-50%, 200%);
    }
  }
  .bold {
    font-weight: bold;
  }
  .insuText {
    font-size: 25px;
    @media only screen and (min-width: 700px) {
      font-size: 55px;
    }
    @media only screen and (min-width: 1680px) {
      font-size : 80px;
    }
  }
  .bigText{
    font-size: 80px;
    @font-face {
      font-family: 'NanumSquareWebBig';
      src: url('../fonts/NanumSquareOTFExtraBold.otf');
    }
    font-family: 'NanumSquareWebBig';
    @media only screen and (max-width: 700px) {
      font-size: 25px;
    }
    @media only screen and (max-width: 1680px) {
      font-size : 80px;
    }
  }
  .smallText{
    font-size : 30px;
    @media ${({ theme }) => theme.device.mobileL} {
      font-size : 15px;
    }
    @media only screen and (max-width: 1680px) {
      font-size : 20px;
    }
  }
  .text{
    margin : 2vh 0 2vh 0;
    @media ${({ theme }) => theme.device.mobileL} {
      font-size : 15px;
    }
  }
  #goToTop{
    position: fixed;
    left: 94vw;
    top: 79vh;
    width : 5%;
    cursor: pointer;
    @media ${({ theme }) => theme.device.mobileL} {
      width : 15%;
      left: 80vw;
    }
  }
  
  width : 70%
  margin: 0 auto;
  overflow : hidden;
  @font-face {
    font-family: 'NanumSquareWeb';
    src: url('../fonts/NanumSquareOTFRegular.otf');
  }
  font-family: 'NanumSquareWeb';
`;

const SectionIntro = styled.div`
  background-image: url("../images/web/intro1_crop_dark.png");
  background-repeat: no-repeat;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-size: cover;

  #introText {
    font-size: 2.5rem;
    color: white;
    @media ${({ theme }) => theme.device.mobileL} {
      font-size: 2rem;
    }
  }
  @media ${({ theme }) => theme.device.mobileL} {
    background-image: url("../images/mobile/intro1_crop_dark.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const Section1 = styled.div`
  #section1Image {
    padding-right: 10vw;
    text-align: right;

    #section1Image1 {
      position: relative;
      height: 600px;
      top: -30rem;
      @media ${({ theme }) => theme.device.mobileL} {
        top: -18rem;
        resize: both;
        width: 70%;
        height: 400px;
      }
    }
  }
  @media ${({ theme }) => theme.device.mobileL} {
    #section1Image1App {
      display: none;
    }
  }
`;

const Section1Box = styled.div`
  position: relative;
  background-color: rgb(80, 192, 165);
  text-align: left;
  color: white;
  height: 79%;
  padding: 5%;
  @media ${({ theme }) => theme.device.mobileL} {
    padding: 10% 10% 10% 10%;
    .big1 {
      font-size: 2.2rem;
    }
  }
`;

const Section2 = styled.div`
  background-color: rgb(220, 255, 187);
  #section2Flex {
    height: 100vh;
    padding-left: 5%;
  }
  #section2Left {
    position: relative;
    padding-top: 5%;
  }
  #section2Image {
    position: relative;
    text-align: right;
    @media ${({ theme }) => theme.device.mobileL} {
      padding-right: 20%;
    }
  }
  #section2Image1 {
    margin-top: -15%;
    width: 800px;
    @media only screen and (max-width: 700px) {
      resize: both;
      width: 400px;
      height: auto;
      margin-top: 1px;
    }
    @media only screen and (max-width: 1680px) {
      height: auto;
      width: 700px;
    }
    @media only screen and (max-width: 1550px) {
      height: auto;
      width: 600px;
    }
  }
`;

const Section2Box = styled.div`
  color: rgb(63, 100, 29);
  .section2 {
    margin-top: 10%;
    font-size: 2.2rem;
  }
`;

const Section3 = styled.div`
  background-color: rgb(255, 255, 255);
  padding-right: 5%;
  .section3Box {
    margin-top: 17%;
    color: rgb(123, 118, 109);
    padding-left: 5%;
    @media ${({ theme }) => theme.device.mobileL} {
      margin-top: 10%;
      padding-top; 50px;
      .section3 {
        width: 104%;
      }
    }
  }
  #section3Image {
    text-align: right;
  }
  #section3Image1 {
    height: 500px;
    margin-top: -5%;
    @media ${({ theme }) => theme.device.mobileL} {
      margin-top: 30%;
      resize: both;
      width: auto;
      height: 300px;
    }
  }
`;

const Section4 = styled.div`
  background-color: rgb(255, 227, 128);
  padding: 5%;
  #section4Box {
    color: rgb(123, 118, 109);
    @media ${({ theme }) => theme.device.mobileL} {
      margin-top: 10%;
    }
  }
  #section4Image {
    text-align: right;
    height: 500px;
    @media ${({ theme }) => theme.device.mobileL} {
      padding-top: 30%;
    }
  }
  #section4Image1 {
    height: 400px;
    @media ${({ theme }) => theme.device.mobileL} {
      margin-top: -40%;
      resize: both;
      width: 400px;
    }
  }
`;

const Section5 = styled.div`
  background-color: rgb(229, 242, 250);
  padding: 5%;
  #section5Box {
    position: relative;
    background: rgb(229, 229, 229);
    border: solid white 3px;
    border-radius: 10px;
    width: 80%;
    height: 80%;
    padding-top: 2%;
    padding-left: 5%;
    @media ${({ theme }) => theme.device.mobileL} {
      margin-top: 10%;
      width: 100%;
      height: 50%;
    }
  }
  #section5Image {
    text-align: right;
    margin-top: -55vh;
    padding-right: 10%;
    @media ${({ theme }) => theme.device.mobileL} {
      margin-top: -13vh;
    }
  }

  #section5Image1 {
    position: relative;
    @media ${({ theme }) => theme.device.mobileL} {
      resize: both;
      width: 80%;
      height: 80%;
    }
  }
`;

const Section6 = styled.div`
  background-color: rgb(237, 237, 237);
  display: flex;
  padding: 5%;
  @media ${({ theme }) => theme.device.mobileL} {
    flex-flow: column;
  }

  #section6Left {
    width: 70%;
    @media ${({ theme }) => theme.device.mobileL} {
      width: 100%;
      margin-top: 10%;
    }
  }

  #section6Image {
    text-align: right;
    width: 70%;
    margin-top: 10%;
    @media ${({ theme }) => theme.device.mobileL} {
      padding-left: -10%;
    }
  }
  #section6Image1 {
    height: 300px;
    width: auto;
    text-align: left;
    margin-top: 10px;
    @media only screen and (min-width: 1680px) {
      height: 500px;
      width: auto;
      margin-top: 30px;
    }
  }
`;

const LinkArea = styled.div`
  margin-top: 10vh;
  margin-bottom: 10vh;
`;
const LinkAgain = styled.div`
  text-align: center;
`;

const LinkDetail = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  color : black;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0.9;
  margin: 0vh 2vw 0vh 2vw;
`;

const LinkButton = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin: 0vh 2vw 0vh 2vw;
`;

const Guest = styled.h2`
  color: white;
`;
const Describe = styled.h3`
  color: white;
`;
