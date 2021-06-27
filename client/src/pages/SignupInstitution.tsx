import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Institution, InstiSelection } from '../components/Index';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

axios.defaults.withCredentials = true;

interface Props {
  inputs: Record<string, unknown>;
  instiInputs: Record<string, unknown>;
  institution: boolean;
  onChangeInsti: any;
  errormessage: string;
  handleInstitution: any;
  instiSelection: boolean;
  handleInstiSelection: any;
  inputInstiInfo: any;
  setErrormessage: any;
}
function SignupInstitution({
  inputs,
  instiInputs,
  institution,
  onChangeInsti,
  errormessage,
  handleInstitution,
  instiSelection,
  handleInstiSelection,
  inputInstiInfo,
  setErrormessage,
}: Props) {
  const history = useHistory();
  const postInsti = (
    name: string,
    role: string,
    phone: string,
    permission: string,
    email: string,
    password: string,
    info: string,
    master: string,
    institutionName: string,
  ) => {
    if (info.length === 0) {
      setErrormessage('기관유형 중 하나를 선택해주세요');
    } else {
      axios
        .post('https://datda.link/auth/institution', {
          userName: name,
          role: role,
          mobile: Number(phone),
          permission: permission,
          email: email,
          password: password,
          info: info,
          master: master,
          institutionName: institutionName,
        })
        .then((res) => {
          if (res.status === 200) {
            history.push('/login');
          } else {
            alert('다시 시도해주세요');
          }
        });
    }
  };

  if (inputs.email === null) {
    return <Redirect to="/signup" />;
  }
  return (
    <div className="institution">
      <Institution
        institution={institution}
        handleInstitution={handleInstitution}
        onChangeInsti={onChangeInsti}
        errormessage={errormessage}
        instiInputs={instiInputs}
      />
      <InstiSelection
        inputs={inputs}
        errormessage={errormessage}
        instiInputs={instiInputs}
        instiSelection={instiSelection}
        handleInstiSelection={handleInstiSelection}
        inputInstiInfo={inputInstiInfo}
        postInsti={postInsti}
      />
    </div>
  );
}

export default SignupInstitution;
