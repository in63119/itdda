import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { SignupCommon, SignupInstitution } from "./Index";
import {
  Signup,
  SignupDetail,
  Institution,
  Selection,
  SignupSearchInsti,
  SignupSearchClass,
  InstiSelection,
  SocialSelection,
} from "../components/Index";
import {
  isPasswordCheck,
  isIdCheck,
  isPasswordCorrect,
  isNameCHeck,
  isPhoneCheck,
} from "../common/utils/validation";
import { useHistory } from "react-router-dom";
import "dotenv/config";
import axios from "axios";

import { isEmailExist } from "../common/axios";

import styled from "styled-components";
import { userInfo } from "os";
import { AnyMxRecord } from "dns";

interface Props {
  setModalMessage: any;
  setModalVisible: any;
}

axios.defaults.withCredentials = true;

//!카카오톡 REST api key 리액트는 환경변수(.env)에서 'REACT_APP_'을 붙여줘야 함
const kakaoKey = process.env.REACT_APP_KAKAO_RESTAPI_KEY;
//!카카오 로그인&회원가입 관련 url
const serverSignupUrl = "https://datda.link/kakao/signup"; //! datda 카카오회원가입 주소
const redirectUri = "https://datda.net/signup"; //! 후에 datda 주소로 변경
//!테스트용 서버 url
// const serverSignupUrl = 'http://localhost:5000/kakao/signup'; //! 서버 카카오회원가입 주소
// const redirectUri = 'http://localhost:3000/signup'; //! 후에 datda 주소로 변경

const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoKey}&redirect_uri=${redirectUri}&response_type=code`;

function Signin({ setModalMessage, setModalVisible }: Props) {
  //회원가입 필요한 정보
  const [inputs, setInputs] = useState({
    email: null,
    password: null,
    passwordCheck: null,
    name: null,
    mobile: null,
    permission: "",
    role: null,
  });
  const [instiInputs, setInstiInputs] = useState({
    institutionName: null,
    master: null,
    info: "",
  });

  //에러메세지
  const [errormessage, setErrormessage] = useState<string>("");
  //첫 페이지(회원 유형 선택)
  const [selection, setSelection] = useState<boolean>(true);

  const [isEmail, setIsEmail] = useState<boolean>(false);

  //아이디 비밀번호 설정 페이지
  const [signup, setSignup] = useState<boolean>(false);
  //이름 이메일 전화번호
  const [signupDetail, setSignupDetail] = useState<boolean>(false);
  //기관 눌렀을 시에 추가 입력 페이지
  const [institution, setInstitution] = useState<boolean>(false);

  const [instiSelection, setInstiSelection] = useState<boolean>(false);
  // 선생님과 학부모가 버튼을 눌렀을 시
  const [searchInsti, setSearchInsti] = useState<boolean>(false);

  const [searchClass, setSearchClass] = useState<boolean>(false);
  //! 카카오로그인 상태(isKakao->useEffact, userEmail->서버에서 쏴주는 유저메일)
  const [isKakao, setIsKakao] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const history = useHistory();
  //학부모, 선생님을 선택할 시
  const handleSelection = () => {
    setSelection(false);
    setSignup(true);
  };

  //! 버튼을 누르면 카카오 정보제공 동의화면으로 넘어감
  const handleKakao = () => {
    window.location.assign(kakaoUrl);
  };

  //! 이것은 카카오 회원가입 할때 필요한 사이드이펙트
  useEffect(() => {
    if (!isKakao) {
      setIsLoading(true);
      const url = new URL(window.location.href);
      // console.log(url);
      const authorizationCode = url.searchParams.get("code");
      if (authorizationCode) {
        setSelection(false);
        handleKakaoSignup(authorizationCode);
      }
      setIsKakao(true);
    } else if (userEmail) {
      setSelection(false);
      setInputs({ ...inputs, email: userEmail });
      history.push("/signup/common");
    }
  }, [isKakao, userEmail]);

  const handleIsEmail = async (email: string) => {
    const results = await isEmailExist(email);
    if (results === false) {
      setModalVisible(true);
      setModalMessage("이미 가입된 아이디입니다");
      setIsEmail(false);
    } else if (results === true) {
      setModalVisible(true);
      setModalMessage("이 이메일은 사용가능합니다");
      setIsEmail(true);
    }
  };

  // useEffect(() => {
  //   if (selection === false) {
  //     setSocialSelection(true);
  //   }
  // }, [selection]);

  //! 카카오 회원가입 API 요청
  const handleKakaoSignup = (authorizationCode: string) => {
    axios
      .post(serverSignupUrl, {
        authorizationCode: authorizationCode,
      })
      .then((res: any) => {
        // 만약 회원가입이 되었으면 res = 이메일 + 200상태
        // 만약 기존 이메일이 있어 회원가입이 안되었으면 res = 200상태
        if (res.status === 200) {
          alert("카카오 회원가입이 되었습니다. 세부항목을 입력해주세요.");
          setUserEmail(res.data.email);
          setIsLoading(false);
        } else if (res.status === 201) {
          alert("이미 계정이 있습니다. 로그인 하시기 바랍니다.");
          // setUserEmail(res.data.email);
          setIsLoading(false);
          history.push("/");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //기관 가입을 선택할 시
  const handleSignup = (
    email: string,
    password: string,
    passwordCheck: string,
  ) => {
    if (email === null) {
      setErrormessage("정보를 입력하서야 합니다");
    } else if (!isIdCheck(email)) {
      setErrormessage("올바르지 못한 이메일입니다");
    } else if (isEmail === false) {
      setErrormessage("이메일 중복을 확인해주세요");
    } else if (!isPasswordCheck(password)) {
      setErrormessage(
        "최소 8자 이상의, 특수문자와 숫자, 문자를 포함한 비밀번호를 입력하셔야 합니다",
      );
    } else if (!isPasswordCorrect(password, passwordCheck)) {
      setErrormessage("비밀번호가 일치하지 않습니다.");
    } else {
      setSignup(false);
      history.push("/signup/common");
      setErrormessage("");
    }
  };

  const handleSignupDetail = (
    name: string,
    role: string,
    phone: string,
    permission: string,
    email: string,
    password: string,
  ) => {
    if (name === null || role === null || phone === null) {
      setErrormessage("모든 항목은 필수입니다");
    } else if (inputs.permission.length === 0) {
      setErrormessage("가입 유형을 확인해주세요");
    } else if (!isNameCHeck(name)) {
      setErrormessage("이름을 확인해주세요");
    } else if (!isPhoneCheck(phone)) {
      setErrormessage("올바른 전화번호를 입력해주세요.");
    } else {
      setErrormessage("");
      inputs.permission === "institution"
        ? (setInstitution(true), history.push("/signup/institution"))
        : postSignup(name, role, phone, permission, email, password);
    }
  };
  const handleInstitution = (institutionName: string, master: string) => {
    institutionName === null || master === null
      ? setErrormessage("모든 항목은 필수입니다")
      : (setErrormessage(""), setInstitution(false), setInstiSelection(true));
  };

  const handleInstiSelection = (info: string) => {
    info.length === 0
      ? setErrormessage("기관 유형을 선택해주세요")
      : (history.push("/"), setErrormessage(""));
  };

  const postSignup = (
    name: string,
    role: string,
    phone: string,
    permission: string,
    email: string,
    password: string,
  ) => {
    axios
      .post("https://datda.link/auth/signup", {
        userName: name,
        role: role,
        mobile: Number(phone),
        permission: permission,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          history.push("/login");
        } else {
          setIsLoading(false);
          alert("이미 아이디가 있습니다.");
        }
      });
  };

  //인풋데이터 값 바꾸기
  const onChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputs({ ...inputs, [key]: value });
  };

  const onChangeInsti = (
    key: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = e.target;
    setInstiInputs({ ...instiInputs, [key]: value });
  };
  //교육소 분류 state에 넣기
  const inputInstiInfo = (value: string) => {
    setInstiInputs({ ...instiInputs, info: value });
  };

  return (
    <SignupGlobal>
      <div className="signGlobalFrame">
        <Link to="/">
          <div className="mobileHeader">
            <img id="logo" src="../images/datda_symbol_text_main.png" />
          </div>
          <div id="header">
            <span className="headerFont">
              <span className="headerFont1">닿다에 </span>
              <span>오신 것을 환영합니다!</span>
            </span>
          </div>
        </Link>
        <Selection
          selection={selection}
          handleSelection={handleSelection}
          handleKakao={handleKakao}
        />
        <Signup
          inputs={inputs}
          signup={signup}
          handleSignup={handleSignup}
          errormessage={errormessage}
          onChange={onChange}
          handleIsEmail={handleIsEmail}
        />
        <Switch>
          <Route exact path="/signup/common">
            <SignupCommon
              inputs={inputs}
              handleSignupDetail={handleSignupDetail}
              errormessage={errormessage}
              onChange={onChange}
            />
          </Route>
          <Route exact path="/signup/institution">
            <SignupInstitution
              inputs={inputs}
              institution={institution}
              handleInstitution={handleInstitution}
              onChangeInsti={onChangeInsti}
              errormessage={errormessage}
              instiInputs={instiInputs}
              instiSelection={instiSelection}
              handleInstiSelection={handleInstiSelection}
              inputInstiInfo={inputInstiInfo}
              setErrormessage={setErrormessage}
            />
          </Route>
        </Switch>
      </div>
      {/* <SignupDetail
      inputs={inputs}
        signupDetail={signupDetail}
        handleSignupDetail={handleSignupDetail}
        errormessage={errormessage}
        onChange={onChange}/> */}

      {/* <Institution
        institution={institution}
        handleInstitution={handleInstitution}
        onChangeInsti={onChangeInsti}
        errormessage={errormessage}
        instiInputs={instiInputs}
      /> */}
      {/* <SignupSearchInsti
        searchInsti={searchInsti}
        handleSearchInsti={handleSearchInsti}
      />
      <SignupSearchClass
        searchClass={searchClass}
        handleSearchClass={handleSearchClass}
      /> */}
      {/* <InstiSelection
        errormessage={errormessage}
        instiInputs={instiInputs}
        instiSelection={instiSelection}
        handleInstiSelection={handleInstiSelection}
        inputInstiInfo={inputInstiInfo}
      /> */}
      {/* {!isLoading ? (
        <div></div>
      ) : (
        <div className="loadingFrame">
          <img id="loadingImage" src="../images/loading.gif"></img>
        </div>
      )} */}
    </SignupGlobal>
  );
}

export default Signin;

const SignupGlobal = styled.div`
  background-image: url("../images/signbackground.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  @font-face {
    font-family: "NanumSquareWeb";
    src: url("../fonts/NanumSquareOTFLight.otf");
  }
  font-family: "NanumSquareWeb";
  .signGlobalFrame {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .mobileHeader {
    display: none;
  }
  #header {
    width: 500px;
    text-align: center;
  }
  .headerFont {
    font-size: 40px;
    color: rgb(0, 0, 0);
  }
  .headerFont1 {
    color: #6e6eff;
  }
  #logo {
    height: 40px;
    width: auto;
  }
  #loadingImage {
    width: 100px;
    height: auto;
  }
  .loadingFrame {
    display: flex;
    justify-content: center;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    background-image: none;
    .signGlobalFrame {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 0;
      margin-top: 50px;
    }
    #logo {
      height: 40px;
      width: auto;
    }
    .mobileHeader {
      display: flex;
      justify-content: center;
      text-align: center;
      margin-bottom: 50px;
    }
    .logoText {
      font-size: 30px;
      color: #3c3c3c;
    }
    #header {
      display: none;
      cursor: none;
    }
    .headerFont {
      font-size: 20px;
      color: rgb(0, 0, 0);
    }
  }
`;
