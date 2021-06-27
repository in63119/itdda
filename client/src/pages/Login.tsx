import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { requestLogin, requestKakaoLogin } from '../common/axios';
import 'dotenv/config';

axios.defaults.withCredentials = true;

//!카카오톡 REST api key 리액트는 환경변수(.env)에서 'REACT_APP_'을 붙여줘야 함
const kakaoKey = process.env.REACT_APP_KAKAO_RESTAPI_KEY;
//!카카오 로그인&회원가입 관련 url
const redirectUri = 'https://datda.net/login'; //! 후에 datda 주소로 변경
// const redirectUri = 'http://localhost:3000/login'; //! 후에 datda 주소로 변경
const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoKey}&redirect_uri=${redirectUri}&response_type=code`;

interface propType {
  hadleSetMainData: (mainData: any) => void;
}
function Login({ hadleSetMainData }: propType) {
  console.log(hadleSetMainData);
  const history = useHistory();
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [errormessage, setErrormessage] = useState<string>('');
  //! 카카오 관련 상태
  const [isKakao, setIsKakao] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputs({ ...inputs, [key]: value });
  };

  const handleLogin = async (email: string, password: string) => {
    if (email.length === 0 || password.length === 0) {
      setErrormessage('이메일이나 비밀번호를 입력해주세요.');
    } else {
      setIsLoading(true);
      // axios 로그인 요청
      //!await로 동기적 실행 필요함.
      const mainData = await requestLogin(email, password);
      if (typeof mainData !== 'boolean') {
        if (mainData !== undefined) {
          console.log('핸들러작동');
          hadleSetMainData(mainData);
          history.push('/main');
        } else {
          setErrormessage('잘못된 요청입니다');
        }
      } else if (mainData === true) {
        history.push('/waiting');
      } else if (mainData === false) {
        history.push('/waiting/approving');
      }
      setErrormessage('');
    }
  };

  //! 버튼을 누르면 카카오 정보제공 동의화면으로 넘어감
  const handleKakao = () => {
    window.location.assign(kakaoUrl);
  };

  //! 이것은 카카오 로그인 할때 필요한 사이드이펙트
  useEffect(() => {
    if (!isKakao) {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get('code');
      if (authorizationCode) {
        setIsLoading(true);
        requestKakaoLogin(authorizationCode).then((mainData) => {
          if (typeof mainData !== 'boolean') {
            if (mainData !== undefined) {
              hadleSetMainData(mainData);
              setIsLoading(false);
              history.push('/main');
            } else {
              setErrormessage('잘못된 요청입니다');
              setIsLoading(false);
            }
          } else if (mainData === true) {
            setIsLoading(false);
            history.push('/waiting');
          } else if (mainData === false) {
            setIsLoading(false);
            history.push('/waiting/approving');
            // if (mainData) {
            //   // handleLoading();
            //   hadleSetMainData(mainData);
            //   setErrormessage('');
            //   setIsLoading(false);
            //   history.push('/main'); // 바로 너 때문이야.
          }
          // setIsLoading(false);
          // // handleLoading();
          // return;
        });
      }
      setIsKakao(true);
    }
  }, [isKakao]);

  return (
    <LoginGlobal>
      <div className="LoginGlobalFrame">
        <Link to="/">
          <div className="headerFrame">
            <img id="logo" src="../images/datda_symbol_text_main.png" />
          </div>
        </Link>
        <InputBox>
          <input
            className="inputBox"
            type="text"
            placeholder="이메일"
            onChange={(e) => onChange('email', e)}
          ></input>
        </InputBox>
        <InputBox>
          <input
            className="inputBox"
            type="password"
            placeholder="비밀번호"
            onChange={(e) => onChange('password', e)}
          ></input>
        </InputBox>
        <div className="error">{errormessage}</div>
        <div className="buttonSession">
          <div className="buttonEl">
            <img
              id="kakaoImg"
              src="../images/kakaoLogin.png"
              onClick={handleKakao}
            ></img>
          </div>
          <div className="buttonEl">
            <Button onClick={() => handleLogin(inputs.email, inputs.password)}>
              로그인
            </Button>
          </div>
          <div className="buttonEl">
            <Link to="/signup">
              <div>
                <Button>회원가입</Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {!isLoading ? (
        <div></div>
      ) : (
        <div className="loadingFrame">
          <img id="loadingImage" src="../images/loading.gif"></img>
        </div>
      )}
    </LoginGlobal>
  );
}

export default Login;

const LoginGlobal = styled.div`
  @font-face {
    font-family: 'NanumSquareWeb';
    src: url('../fonts/NanumSquareOTFLight.otf');
  }
  font-family: 'NanumSquareWeb';
  .LoginGlobalFrame {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .headerFrame {
    display: flex;
    justify-content: center;
    margin: 150px 0 60px 0;
  }
  #logo {
    height: 40px;
    width: auto;
  }
  .header {
    margin-bottom: 0px;
    font-size: 30px;
    font-weight: bold;
    @font-face {
      font-family: 'NanumSquareWeb';
      src: url('../fonts/NanumSquareOTFLight.otf');
    }
    font-family: 'NanumSquareWeb';
  }
  #loadingImage {
    width: 100px;
    height: auto;
  }
  .error {
    color: red;
  }
  #kakaoImg {
    width: auto;
    height: 30px;
    cursor: pointer;
  }

  @font-face {
    font-family: 'NanumSquareWeb';
    src: url('../fonts/NanumSquareOTFLight.otf');
  }
  font-family: 'NanumSquareWeb';

  .buttonSession {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .buttonEl {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  .loadingFrame {
    display: flex;
    justify-content: center;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    .headerFrame {
      margin: 100px 0 60px 0;
    }
  }
`;

const InputBox = styled.div`
  .inputBox {
    border: solid 0px;
    border-bottom: solid 1px;
    width: 500px;
    margin-bottom: 30px;
    font-size: 20px;
    ${({ theme }) => theme.common.defaultInput};
  }
  margin: 5px 0px 5px 0px;
  @font-face {
    font-family: 'NanumSquareWeb';
    src: url('../fonts/NanumSquareOTFLight.otf');
  }
  font-family: 'NanumSquareWeb';
  @media ${({ theme }) => theme.device.mobileL} {
    .inputBox {
      width: 216px;
    }
  }
`;

const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin : 2vh 0 2vh 0;
  width: 216px;
`;
