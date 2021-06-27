import React from 'react';
import styled from 'styled-components';

interface Props {
  instiInputs: Record<string, unknown>;
  institution: boolean;
  onChangeInsti: any;
  errormessage: string;
  handleInstitution: any;
}
function Institution({
  instiInputs,
  institution,
  onChangeInsti,
  errormessage,
  handleInstitution,
}: Props) {
  return institution ? (
    <SignupInstitution>
      <div className="institution">
        <div className="institutionFrame">
          <input
            type="text"
            className="institutionEl"
            placeholder="기관 이름"
            onChange={(e) => onChangeInsti('institutionName', e)}
          ></input>
        </div>
        <div className="institutionFrame">
          <input
            type="text"
            className="institutionEl"
            placeholder="기관장 이름"
            onChange={(e) => onChangeInsti('master', e)}
          ></input>
        </div>
        <div className="error">{errormessage}</div>
        <div className="institutionFrame">
          <Button
            onClick={() =>
              handleInstitution(instiInputs.institutionName, instiInputs.master)
            }
          >
            다음
          </Button>
        </div>
      </div>
    </SignupInstitution>
  ) : (
    <div></div>
  );
}

export default Institution;

const SignupInstitution = styled.div`
  width: 380px;
  margin-top: 50px;
  .institutionFrame {
    display: flex;
    justify-content: center;
  }
  .institutionEl {
    width: 380px;
    margin-bottom: 25px;
    font-size: 20px;
    border: solid 0px;
    border-bottom: solid 1.5px;
    ${({ theme }) => theme.common.defaultInput};
  }
  .error {
    color: red;
    text-align: center;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    .institutionEl {
      width: 200px;
    }
  }
`;

const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin : 2vh 0 3vh 0;
  width: 150px;
`;
