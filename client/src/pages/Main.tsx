import React, { useState, useEffect } from "react";
import { Route, Switch, Link } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  ApproveChildren,
  TimetableList,
  Profile,
  Notice,
  Medicine,
  Album,
  Meal,
  IndiNotice,
  EducationList,
  Report,
  CreateClass,
  Management,
  Bus,
} from "./Index";
import {
  ReadForm,
  Nav,
  Avatar,
  Contents,
  State,
  SubMenu,
  FooterContents,
  SecondSubMenu,
  Timetable,
} from "../components/Index";
import { firestore } from "../common/utils/firebase";
import {
  requestMainData,
  requestNotice,
  requestIndiNotice,
} from "../common/axios";

interface Props {
  setModalMessage: any;
  setModalVisible: any;
  handleLogout: any;
  handleChangeChild: (index: number) => void;
  hadleSetMainData: (data: any) => void;
  handleTimetableChange: any;
  userInfo: {
    permission: string;
    isLogin: boolean;
    mainData: any;
    currentChild: number;
  };
}
export default function Main({
  setModalMessage,
  setModalVisible,
  hadleSetMainData,
  handleChangeChild,
  handleTimetableChange,
  userInfo,
  handleLogout,
}: Props) {
  // 출석
  const [isCheck, setIsCheck] = useState(false);
  // 투약의뢰서
  const [please, setPlease] = useState(false);
  // 투약보고서
  const [isOk, setIsOk] = useState(false);
  // 낮잠
  const [isSleep, setIsSleep] = useState(false);
  // 식사
  const [isEat, setIsEat] = useState(false);

  //!main 화면에 보여지는 아이들 탭 메뉴 관련
  //부모는 여러 아이들을 등록 시킬 수 있다.
  //부모가 로그인 할 경우 main 화면에 출력되는 정보는 아이를 기준으로 한다.
  const [childId, setChildId] = useState({
    institutionId: "0",
    id: "0",
  });
  //List 상태 업데이트
  const [list, setList] = useState({
    event: [],
    notice: [],
    all: [],
    currentCategory: "",
    currentList: [],
    mainMiniNotice: [],
    mainMiniIndiNotice: [],
    medicineRequest: [],
    medicineReport: [],
    indiNotice: {} as any,
  });

  // 메인에서 관리하는 list 목록들을 선택적으로 업데이트
  const handleUpdateList = async (title: string) => {
    const childId =
      userInfo.permission === "parent"
        ? userInfo.mainData[userInfo.currentChild].childId
        : null;
    if (title === "공지사항") {
      const result = await requestNotice(childId);
      if (result) {
        setList({
          ...list,
          event: result.ElEvent,
          notice: result.ElNotice,
          all: result.noticeInfo,
          currentCategory: "notice",
          currentList: result.ElNotice,
        });
      }
      return;
    }
    if (title === "알림장") {
      const result = await requestIndiNotice();
      if (result) {
        setList({
          ...list,
          indiNotice: result,
          currentList: result.teacherRead,
        });
      }
    }
  };
  const handleInitializeList = async () => {
    const childId =
      userInfo.permission === "parent"
        ? userInfo.mainData[userInfo.currentChild].childId
        : null;
    const notice = await requestNotice(childId);
    const indiNotice = await requestIndiNotice();
    if (indiNotice && notice) {
      setList({
        ...list,
        event: notice.ElEvent,
        notice: notice.ElNotice,
        all: notice.noticeInfo,
        currentList: notice.ElNotice,
        indiNotice: indiNotice,
        mainMiniNotice: notice.noticeInfo,
        mainMiniIndiNotice: indiNotice.indiNoticeInfo,
      });
    }
  };
  useEffect(() => {
    handleInitializeList();
  }, []);
  const handleChangeNotice = (category?: string) => {
    //공지사항
    if (category === "공지사항") {
      setList({
        ...list,
        currentList: list.notice,
        currentCategory: "notice",
      });
      return;
    }
    if (category === "행사") {
      setList({
        ...list,
        currentList: list.event,
        currentCategory: "event",
      });
      return;
    }
    //알림장
    if (category === "수신") {
      setList({
        ...list,
        currentList: list.indiNotice.teacherRead,
      });
      return;
    }
    if (category === "발송") {
      setList({
        ...list,
        currentList: list.indiNotice.teacherWrite,
      });
      return;
    }
    if (category === "투약의뢰서") {
    }
    if (category === "투약보고서") {
    }
  };
  // 기관에 소속되어 승인이 완료된 원아는 실시간 상태 확인을 할 수있다.
  function handleCheckData(institutionId: string, childId: string) {
    firestore
      .collection("institution")
      .doc(String(institutionId))
      .collection("children")
      .doc(String(childId))
      .get()
      .then((doc) => {
        // 등록한 아이가 승인이 완료 되었을때
        if (doc.data()) {
          handleRealTimeState(institutionId, childId);
          return;
        }
        //아이가 승인이 되지 않았을때
        alert("원아의 정보가 없습니다");
      });
  }
  // 실시간 데이터베이스에 등록되어 있는 원아일경우 실시간을 현재 상태를 추적 monitoring 한다.
  function handleRealTimeState(institutionId: string, childId: string) {
    firestore
      .collection("institution")
      .doc(String(institutionId))
      .collection("children")
      .doc(String(childId))
      .onSnapshot((doc) => {
        setIsOk(doc.data()?.isOk);
        setIsEat(doc.data()?.isEat);
        setIsSleep(doc.data()?.isSleep);
        setIsCheck(doc.data()?.isCheck);
        setPlease(doc.data()?.please);
      });
  }

  //메인 화면에서 사용될 data 요청
  const setMainData = async () => {
    const token = JSON.parse(localStorage.getItem("loginInfo")!).accessToken;
    const mainData = await requestMainData(token);
    await hadleSetMainData(mainData);
  };

  useEffect(() => {
    if (userInfo.permission === "parent") {
      handleCheckData(
        userInfo.mainData[userInfo.currentChild].institutionId,
        userInfo.mainData[userInfo.currentChild].childId,
      );
    }
  }, [userInfo.currentChild]);
  //한번 로그인을 한 유저가 새로고침 및 웹브라우저를 재실행 했을때 유지된 로그인 정보를
  //도대로 main 화면을 구성하기 위한 서버로 main data 요청
  useEffect(() => {
    if (
      Object.keys(userInfo.mainData).length === 0 &&
      userInfo.isLogin === false
    ) {
      setMainData();
    }
  }, []);

  useEffect(() => {
    // 부모가 로그인을 했을때 아이의 실시간 데이터를 업데이트
    if (userInfo.permission === "parent") {
      setChildId({
        institutionId: String(
          userInfo.mainData[userInfo.currentChild].institutionId,
        ),
        id: String(userInfo.mainData[userInfo.currentChild].childId),
      });
      handleCheckData(
        userInfo.mainData[userInfo.currentChild].institutionId,
        userInfo.mainData[userInfo.currentChild].childId,
      );
    }
  }, [userInfo.permission]);
  return (
    <Wrap>
      {userInfo.isLogin === true ? (
        <>
          <Header id="header">
            <Nav handleLogout={handleLogout}></Nav>
          </Header>
          <Aside id="aside">
            <TopSubNav id="top-submenu"></TopSubNav>
            <FristPart id="avatar">
              <Avatar userInfo={userInfo}></Avatar>
            </FristPart>
            <SecondPart id="state" permission={userInfo.permission}>
              {userInfo.permission === "parent" ? (
                <>
                  <State
                    type="현재상태"
                    childInfo={userInfo}
                    isCheck={isCheck}
                    isOk={isOk}
                    isSleep={isSleep}
                    isEat={isEat}
                    please={please}
                  ></State>
                </>
              ) : null}
            </SecondPart>
            <ThirdPart id="submenu">
              <SubMenu
                permission={userInfo.permission}
                handleLogout={handleLogout}
              ></SubMenu>
            </ThirdPart>
            <FourthPart>
              <div className="forDesk">
                <SecondSubMenu></SecondSubMenu>
              </div>
            </FourthPart>
          </Aside>
          <Section id="content">
            <ContentCard>
              <Switch>
                <Route exact path={`/main`}>
                  <Contents
                    userInfo={userInfo}
                    list={list}
                    handleChangeChild={handleChangeChild}
                  ></Contents>
                </Route>
                <Route
                  exact
                  path={`/main/notice/:no`}
                  render={() => (
                    <ReadForm
                      contents={list.mainMiniNotice}
                      title="공지사항"
                    ></ReadForm>
                  )}
                ></Route>
                <Route
                  exact
                  path={`/main/mainIndiNotice/:no`}
                  render={() => (
                    <ReadForm
                      contents={list.mainMiniIndiNotice}
                      title="알림장"
                    ></ReadForm>
                  )}
                ></Route>
                <Route
                  path={`/main/notice`}
                  render={() => (
                    <Notice
                      userInfo={userInfo}
                      list={list}
                      setList={setList}
                      handleChangeNotice={handleChangeNotice}
                      handleUpdateList={handleUpdateList}
                    />
                  )}
                />
                <Route
                  path={`/main/medicine`}
                  render={() => (
                    <Medicine
                      handleUpdateList={handleUpdateList}
                      userInfo={userInfo}
                    />
                  )}
                />
                <Route
                  path={`/main/meal`}
                  render={() => <Meal userInfo={userInfo} />}
                />
                <Route
                  path={`/main/indi_notice`}
                  render={() => (
                    <IndiNotice
                      handleChangeNotice={handleChangeNotice}
                      handleUpdateList={handleUpdateList}
                      userInfo={userInfo}
                      list={list}
                      setList={setList}
                    />
                  )}
                />
                <Route
                  path={`/main/album`}
                  render={() => <Album userInfo={userInfo} />}
                />
                <Route
                  path={`/main/approve`}
                  render={() => <ApproveChildren userInfo={userInfo} />}
                />
                <Route path={`/main/profile`}>
                  <Profile userInfo={userInfo} />
                </Route>
                <Route path={`/main/education`} component={EducationList} />
                <Route exact path={`/main/report`} component={Report} />
                <Route
                  path={"/main/timetable"}
                  render={() => (
                    <TimetableList
                      userInfo={userInfo}
                      handleTimetableChange={handleTimetableChange}
                    />
                  )}
                />
                <Route path={"/main/education"} component={EducationList} />
                <Route path={"/main/report"} component={Report} />
                <Route
                  exact
                  path={"/main/director"}
                  render={() => (
                    <CreateClass
                      setModalMessage={setModalMessage}
                      setModalVisible={setModalVisible}
                    />
                  )}
                />
                <Route
                  exact
                  path={"/main/management"}
                  render={() => <Management userInfo={userInfo} />}
                />
                <Route path={"/main/bus"} component={Bus} />
              </Switch>
            </ContentCard>
          </Section>
          <FourthPart>
            <div className="forMobile">
              <SecondSubMenu></SecondSubMenu>
            </div>
          </FourthPart>
          <Footer>
            <div className="mobileFooter">
              <FooterContents></FooterContents>
            </div>
          </Footer>
          <div className="bottomNav">
            <ThirdPart id="bottomSub">
              <SubMenu
                permission={userInfo.permission}
                handleLogout={handleLogout}
              ></SubMenu>
            </ThirdPart>
          </div>
        </>
      ) : (
        <Loding>
          <img id="loading" src="../images/loading.gif" />
        </Loding>
      )}
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 900px;
  margin: 0 auto;
  .bottomNav {
    display: none;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    #top-submenu {
      width: 100%;
    }
    #aside {
      width: 100%;
      height: 40%;
    }
    #content {
      width: 100%;
    }
    #submenu {
      display: none;
    }
    #avatar {
      width: 90%;
      height: 220px;
      margin: 0 auto;
    }
    #state {
      width: 90%;
      height: 20%;
      margin: 0 auto;
      div {
        display: flex;
        height: fit-content;
        gap: 1%;
      }
    }
    .bottomNav {
      position: fixed;
      bottom: 0px;
      background: #efefef;
      width: 100%;
      z-index: 10;
      display: flex;
      justify-content: center;
    }
    #header {
      display: none;
    }
    .back {
      height: 30px;
      width: auto;
    }
    .logout {
      flex: 1 auto;
    }
  }
`;
const Header = styled.div`
  width: 100%;
  height: 40px;
  padding: 1%;
  margin-bottom: 7%;
`;
const Aside = styled.div`
  width: 25%;
  height: 800px;
  float: left;
  padding: 1%;
`;
const Section = styled.div`
  width: 75%;
  height: 1300px;
  float: left;
  padding: 1%;
`;
const Footer = styled.div`
  width: 100%;
  height: 80px;
  clear: both;
  padding: 5%;
  margin-bottom: 50px;
  @media ${({ theme }) => theme.device.mobileL} {
    .mobileFooter {
      display: none;
    }
  }
`;
const TopSubNav = styled.div`
  width: 100%;
  widht: 50px;
`;
const FristPart = styled.div`
  width: 100%;
  height: 25%;
  padding: 2%;
`;
const SecondPart = styled.div<any>`
  width: 100%;
  height: 14%;
  display: flex;
  padding: 2%;
  ${(props) =>
    props.permission !== "parent" &&
    css`
      display: none;
    `}
`;
const ThirdPart = styled.div`
  width: 100%;
  padding: 2%;
  padding: 10px 0px 10px 0px;
  @media ${({ theme }) => theme.device.mobileL} {
    flex: 1 auto;
  }
`;
const FourthPart = styled.div`
  width: 100%;
  height: 31%;
  padding: 2%;
  @media only screen and (min-width: 700px) {
    .forMobile {
      display: none;
    }
  }
  @media ${({ theme }) => theme.device.mobileL} {
    .forDesk {
      display: none;
    }
  }
`;
const ContentCard = styled.div`
  margin-bottom: 3%;
  background: white;
  height: 100%;
  ${({ theme }) => theme.common.contentCardDiv}
`;
const Loding = styled.div`
  margin-top: 25%;
  display: flex;
  justify-content: center;
  #loading {
    text-align: center;
    width: 25%;
    height: auto;
  }
`;
const Back = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 auto;
`;
const Home = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 auto;
`;
