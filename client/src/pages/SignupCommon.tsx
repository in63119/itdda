import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

interface Props {
  handleSignupDetail: any;
  onChange: any;
  errormessage: string;
  inputs: Record<string, unknown>;
}
function SignupCommon({
  inputs,
  handleSignupDetail,
  onChange,
  errormessage,
}: Props) {
  // const handleCheck = () => {
  //   console.log(inputs.email);
  // };
  if (inputs.email === null) {
    return <div>loading</div>;
  }
  return (
    <Common>
      <div className="signupCom">가입유형과 세부사항을 입력해주세요</div>
      <div className="signupComFrame">
        <div className="signupDetail">
          <div id="typePermission">
            <div>가입유형</div>
            <div className="signupFrame">
              <select
                id="selectPermission"
                className="frameEl"
                onChange={(e) => {
                  onChange("permission", e);
                }}
              >
                <option className="frameEl" value=""></option>
                <option className="frameEl" value="parent">
                  학부모
                </option>
                <option className="frameEl" value="teacher">
                  선생님
                </option>
                <option className="frameEl" value="institution">
                  기관
                </option>
              </select>
            </div>
          </div>
          <div className="signupFrame">
            <input
              className="frameEl"
              type="text"
              placeholder="이름"
              onChange={(e) => onChange("name", e)}
            ></input>
          </div>
          <div className="signupFrame">
            <input
              className="frameEl"
              type="text"
              placeholder="관계 ex.엄마, 아빠, 선생님"
              onChange={(e) => onChange("role", e)}
            ></input>
          </div>
          <div className="signupFrame">
            <input
              className="frameEl"
              type="text"
              placeholder="전화번호"
              onChange={(e) => onChange("mobile", e)}
            ></input>
          </div>
          <div className="error">{errormessage}</div>
          <div className="submitFrame">
            <Button
              className="submit"
              onClick={() => {
                handleSignupDetail(
                  inputs.name,
                  inputs.role,
                  inputs.mobile,
                  inputs.permission,
                  inputs.email,
                  inputs.password,
                );
              }}
            >
              {inputs.permission === "institution" ? "다음" : "완료"}
            </Button>
          </div>
        </div>
      </div>
    </Common>
  );
}

export default SignupCommon;

const Common = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  @font-face {
    font-family: "NanumSquareWeb";
    src: url("../fonts/NanumSquareOTFLight.otf");
  }
  font-family: "NanumSquareWeb";
  .nextFrame {
    display: flex;
    justify-content: center;
  }
  .signupCom {
    margin-top: 30px;
    margin-bottom: 50px;
    text-align: center;
  }
  .signupComFrame {
    display: flex;
    justify-content: center;
  }
  .signupFrame {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .signupDetail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 380px;
    height: 200px;
  }
  #typePermission {
    font-size: 11px;
    margin-top: 100px;
  }
  .frameEl {
    width: 380px;
    margin-bottom: 30px;
    font-size: 20px;
    border: solid 0px;
    border-bottom: solid 1.5px;
    background-color: white;
    font-color: #959595;
    ${({ theme }) => theme.common.defaultInput};
  }
  #selectPermission {
    text-align: center;
    font-color: #959595;
  }
  .submitFrame {
    display: flex;
    justify-content: center;
  }
  .submit {
    width: 80px;
    margin-top: 28px;
  }
  .error {
    color: red;
    text-align: center;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    .signupDetail {
      display: flex;
      justify-content: center;
      width: 200px;
    }
    .signupFrame {
      width: 200px;
    }
  }
`;

const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin : 2vh 0 3vh 0;
`;
