import React from 'react';
import styled from 'styled-components';

interface Props {
  selection: boolean;
  handleSelection: any;
  handleKakao: any;
}
function Selection({ selection, handleSelection, handleKakao }: Props) {
  return selection ? (
    <SelectionWrap>
      <div className="selectionFrame">
        <div className="button">
          <img
            className="normal"
            src="../images/normalSignup.png"
            onClick={() => handleSelection()}
          ></img>
          <img
            className="kakao"
            src="../images/kakaoSignup.png"
            onClick={() => handleKakao()}
          ></img>
        </div>
      </div>
    </SelectionWrap>
  ) : (
    <div></div>
  );
}

export default Selection;

const SelectionWrap = styled.div`
  .selectionFrame {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
  .normal {
    cursor: pointer;
    height: 30px;
    width: auto;
  }
  .kakao {
    margin-top: 10px;
    cursor: pointer;
    margin-left: 50px;
    height: 30px;
    width: auto;
  }
  .button {
    text-align: center;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    .kakao {
      margin: 30px 0 0 0;
      cursor: pointer;
    }
    .button {
      display: flex;
      flex-direction: column;
      margin-top: 90px;
    }
  }
`;
