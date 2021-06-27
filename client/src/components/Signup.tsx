import React from "react";
import styled from "styled-components";
interface Props {
  inputs: Record<string, unknown>;
  handleSignup: any;
  signup: boolean;
  errormessage: string;
  onChange: any;
  handleIsEmail: any;
}

function Signup({
  signup,
  handleSignup,
  errormessage,
  onChange,
  inputs,
  handleIsEmail,
}: Props) {
  return signup ? (
    <Setemail>
      <div className="signupCom">이메일과 비밀번호를 설정해주세요</div>
      <div className="frameCenter">
        <div className="signup">
          <div className="signupFrame">
            <input
              className="signupEl"
              type="text"
              placeholder="이메일 설정"
              onChange={(e) => onChange("email", e)}
            ></input>
            <div className="checkFrame">
              <Button
                className="check"
                onClick={() => {
                  handleIsEmail(inputs.email);
                }}
              >
                중복 확인
              </Button>
            </div>
          </div>
          <div className="signupFrame">
            <input
              className="signupEl"
              type="password"
              placeholder="비밀번호 설정"
              onChange={(e) => onChange("password", e)}
            ></input>
          </div>
          <div className="signupFrame">
            <input
              className="signupEl"
              type="password"
              placeholder="비밀번호 확인"
              onChange={(e) => onChange("passwordCheck", e)}
            ></input>
          </div>
          <div className="error">{errormessage}</div>
          <div className="nextFrame">
            <Button
              className="next"
              onClick={() => {
                handleSignup(
                  inputs.email,
                  inputs.password,
                  inputs.passwordCheck
                );
              }}
            >
              다음
            </Button>
          </div>
        </div>
      </div>
    </Setemail>
  ) : (
    <div></div>
  );
}

export default Signup;

// /*회원가입 첫번째 창 css 수정중
// border: solid 0px;
//     width: 400px;
//     float: right;
//     text-align: left;
// }
// */
const Setemail = styled.label`
  margin-top: 30px;
  .signup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 400px;
  }
  .signupEl {
    font-size: 20px;
    margin-right: 10px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border: solid 0px;
    border-bottom: solid 1.5px;
    width: 400px;
    ${({ theme }) => theme.common.defaultInput};
  }
  .signupFrame {
    display: flex;
    width: 600px;
  }
  .error {
    color: red;
  }
  .next {
    text-align: center;
    width: 200px;
  }
  .signupCom {
    text-align: center;
    margin-bottom: 30px;
  }
  @font-face {
    font-family: "NanumSquareWeb";
    src: url("../fonts/NanumSquareOTFLight.otf");
  }
  font-family: "NanumSquareWeb";
  .nextFrame {
    display: flex;
    justify-content: center;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    .signupFrame {
      width: 200px;
      display: flex;
      flex-direction: column;
    }
    .frameCenter {
      display: flex;
      justify-content: center;
    }
    .signupEl {
      width: 200px;
    }
    .signup {
      width: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .next {
      text-align: center;
      width: 80px;
      margin-top: 40px;
    }
    .check {
      margin-top: 0px;
    }
    .checkFrame {
      display: flex;
      justify-content: center;
    }
  }
`;
const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin : 2vh 0 3vh 0;
`;
