import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import {
  Main,
  Login,
  Intro,
  Signup,
  UserInfo,
  SignupCommon,
  GuestWaiting,
  GuestApproving,
} from "./pages/Index";
import { Modal } from "./components/Index";
import styled, {
  GlobalStyleComponent,
  ThemeProvider,
  createGlobalStyle,
} from "styled-components";
import theme from "./assets/theme";

function App() {
  const history = useHistory();
  // modal 상태
  const [modalMessage, setModalMessage] = useState("^___^  << 한솔님");
  const [modalVisible, setModalVisible] = useState(false);
  // loading 상태
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //로그인 한 유저정보
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    permission: "",
    currentChild: 0,
    mainData: {},
  });
  //부모가 자신의 아이들 탭을 선택시 원아 정보를 변경
  const handleChangeChild = (index: number) => {
    setUserInfo({
      ...userInfo,
      currentChild: index,
    });
  };
  // modal창 제거
  const closeModal = () => {
    setModalVisible(false);
  };
  // 회원이 로그인 하고 유저 상태를 변경!
  const hadleSetMainData = (data: any) => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo")!);
    setUserInfo({
      ...userInfo,
      isLogin: true,
      permission: loginInfo.permission,
      mainData: data,
    });
  };
  //시간표를 등록하고 mainData.timetable 업데이트
  const handleTimetableChange = (timetable: any) => {
    const newTimetable = {
      timetable: timetable,
    };
    setUserInfo({
      ...userInfo,
      mainData: {
        ...userInfo.mainData,
        ...newTimetable,
      },
    });
  };
  useEffect(() => {
    if (Object.keys(userInfo.mainData).length !== 0) {
      history.push("/main");
    }
  }, [userInfo.mainData]);

  //회원 로그아웃 시
  const handleLogout = (): void => {
    localStorage.clear();
  };

  return (
    <Router>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/">
            <Intro hadleSetMainData={hadleSetMainData}></Intro>
          </Route>
          <Route path="/login">
            <Login hadleSetMainData={hadleSetMainData}></Login>
          </Route>
          <Route path="/signup">
            <Signup
              setModalMessage={setModalMessage}
              setModalVisible={setModalVisible}
            />
          </Route>
          {/* 로그인이 됐을때만 화면 접속 가능 */}
          <>
            <Route
              path={`/main`}
              render={() => (
                <Main
                  userInfo={userInfo}
                  handleTimetableChange={handleTimetableChange}
                  handleChangeChild={handleChangeChild}
                  hadleSetMainData={hadleSetMainData}
                  handleLogout={handleLogout}
                  setModalMessage={setModalMessage}
                  setModalVisible={setModalVisible}
                />
              )}
            />
            <Route
              path="/userinfo"
              component={UserInfo}
              userPermission={userInfo.permission}
            />
            <Route exact path="/waiting" component={GuestWaiting} />
            <Route path="/waiting/approving" component={GuestApproving} />
          </>
        </Switch>
      </ThemeProvider>
      <Modal visible={modalVisible} closable maskClosable onClose={closeModal}>
        <h3>{modalMessage}</h3>
      </Modal>
    </Router>
  );
}

export default App;
// 전체 element 기본속성 결정
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  body {
    margin: 0;
    padding: 0;
    #intro_global{
      ::-webkit-scrollbar{
        width: 7px;
        border-radius : 6px;
        background-color : green;
      }
      
      ::-webkit-scrollbar-thumb{
        border-radius : 4px;
          width : 100px;
          background-color : orange;
          -webkit-box-shadow : 0 0 1px rgba(255,255,255,0.5);
        }
    }
	}
	a{
		text-decoration:none;
		color:#7f7b7b;
	}
`;
