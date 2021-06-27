import React, { useState } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import {
  ProfileList,
  SelectInstitution,
  AddChildren,
} from '../components/Index';

interface Props {
  userInfo: {
    permission: string;
    isLogin: boolean;
    mainData: any;
    currentChild: number;
  };
}

function Profile({ userInfo }: Props) {
  const [instiInfo, setInsti] = useState([]);

  const [instiSelect, setInstiSelect] = useState<string>('');

  const [children, setChildren] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');
  return (
    <Wrap>
      <Switch>
        <Route exact path="/main/profile">
          <ProfileList userInfo={userInfo} />
        </Route>
        <Route exact path="/main/profile/institution">
          <SelectInstitution
            instiInfo={instiInfo}
            setInsti={setInsti}
            instiSelect={instiSelect}
            setInstiSelect={setInstiSelect}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </Route>
        <Route exact path="/main/profile/children">
          <AddChildren
            children={children}
            setChildren={setChildren}
            instiSelect={instiSelect}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </Route>
      </Switch>
    </Wrap>
  );
}

export default Profile;

const Wrap = styled.div`
  width: 100%;
  height: 97%;
`;
