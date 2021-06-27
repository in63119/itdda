import React from 'react';
import styled from 'styled-components';

interface Props {
  signupDetail: boolean;
  handleSignupDetail: any;
  onChange: any;
  errormessage: string;
  inputs: Record<string, unknown>;
}
function Signup2({
  inputs,
  signupDetail,
  handleSignupDetail,
  onChange,
  errormessage,
}: Props) {
  return signupDetail ? (
    <Detail>
      <div className="signupDetail">
        <div>
          <span>이름</span>
          <input type="text" onChange={(e) => onChange('name', e)}></input>
        </div>
        <div>
          <span>role</span>
          <input type="email" onChange={(e) => onChange('role', e)}></input>
        </div>
        <div>
          <span>전화번호</span>
          <input type="text" onChange={(e) => onChange('mobile', e)}></input>
        </div>
        <button
          onClick={() => {
            handleSignupDetail(inputs.name, inputs.role, inputs.mobile);
          }}
        >
          {inputs.permission === 'institution' ? '다음' : '완료'}
        </button>
        <div>{errormessage}</div>
      </div>
    </Detail>
  ) : (
    <div></div>
  );
}

export default Signup2;

const Detail = styled.label``;
