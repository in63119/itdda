import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
interface Props {
  inputs: Record<string, unknown>;
  instiInputs: Record<string, unknown>;
  instiSelection: boolean;
  handleInstiSelection: any;
  errormessage: string;
  inputInstiInfo: any;
  postInsti: any;
}
function InstiSelection({
  inputs,
  instiInputs,
  instiSelection,
  handleInstiSelection,
  errormessage,
  inputInstiInfo,
  postInsti,
}: Props) {
  const [clickButton, setClickButton] = useState(0);
  const handleChangeButton = (index: number) => {
    if (index === 0) {
      inputInstiInfo("유치원");
      setClickButton(index);
    } else if (index === 1) {
      inputInstiInfo("어린이집");
      setClickButton(index);
    } else if (index === 2) {
      inputInstiInfo("학원");
      setClickButton(index);
    }
  };
  return instiSelection ? (
    <InstSelect>
      <div>
        <div className="h1">기관 유형을 선택해주세요</div>
        <div className="instInfoFrame">
          <Button
            className={clickButton !== 0 ? "instInfo" : "click"}
            onClick={() => handleChangeButton(0)}
          >
            유치원
          </Button>
          <Button
            id="forMargin"
            className={clickButton !== 1 ? "instInfo" : "click"}
            onClick={() => handleChangeButton(1)}
          >
            어린이집
          </Button>
          <Button
            id="forMargin"
            className={clickButton !== 2 ? "instInfo" : "click"}
            onClick={() => handleChangeButton(2)}
          >
            학원
          </Button>
        </div>
        <div className="error">{errormessage}</div>
        <div className="done">
          <Button
            onClick={() => {
              postInsti(
                inputs.name,
                inputs.role,
                inputs.mobile,
                inputs.permission,
                inputs.email,
                inputs.password,
                instiInputs.info,
                instiInputs.master,
                instiInputs.institutionName
              );
            }}
          >
            기관 가입 완료
          </Button>
        </div>
      </div>
    </InstSelect>
  ) : (
    <div></div>
  );
}

export default InstiSelection;

const InstSelect = styled.div`
  width: 600px;
  .h1 {
    margin: 30px 0 0 0;
    text-align: center;
  }
  .instInfo {
    background: #ffffff;
    border: 1px solid #e4e4e4;
    color: #595959;
    width: 100px;
    margin-top: 70px;
  }
  .instInfoFrame {
    display: flex;
    justify-content: center;
  }
  #forMargin {
    margin-left: 30px;
  }
  .error {
    color: red;
    text-align: center;
  }
  .done {
    margin-top: 70px;
    display: flex;
    justify-content: center;
  }
  .click {
    background: #ffe67b;
    font-size: 1rem;
    color: #595959;
    padding: 5px 20px 5px 20px;
    border: none;
    border-radius: 20px;
    outline: 0px;
    cursor: pointer;
    text-decoration: none;
    width: 100px;
    margin-top: 70px;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    #forMargin {
      margin-left: 10px;
    }
  }
`;

const Button = styled.button`
  background: #6f6eff;
  font-size: 1rem;
  color: white;
  padding: 5px 20px 5px 20px;
  border: none;
  border-radius: 20px;
  outline: 0px;
  cursor: pointer;
  text-decoration: none;
`;
