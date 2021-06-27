import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  requestSearchInsti,
  requestGuestTeacherRegister,
  requestGuestParentRegister,
} from '../common/axios';
import { useHistory, Link } from 'react-router-dom';
import { isNameCHeck } from '../common/utils/validation';
import { access } from 'fs';

export default function GuestWaiting() {
  const history = useHistory();

  const permission = JSON.parse(localStorage.getItem('loginInfo')!).permission;

  const accessToken = JSON.parse(localStorage.getItem('loginInfo')!)
    .accessToken;

  const [instiInput, setInstiInput] = useState('');

  const [instiInfo, setInstiInfo] = useState([]);

  const [child, setChild] = useState<string>('');

  const [checked, setChecked] = useState({ institutionId: '' });

  const [isInsti, setIsInsti] = useState<boolean>(true);
  const [isChild, setIsChild] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setChecked({ institutionId: value });
  };

  const onChange = (callback: any, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    callback(value);
  };

  const SearchInsti = async (value: string) => {
    const results = await requestSearchInsti(value);
    if (results) {
      setInstiInfo(results);
      setErrorMessage('');
    } else {
      setErrorMessage('정보를 찾을 수 없습니다.');
    }
  };
  const handleNextStep = async (institutionId: string) => {
    if (institutionId.length === 0) {
      setErrorMessage('기관을 선택해주세요');
    } else if (permission === 'parent') {
      setIsInsti(false);
      setIsChild(true);
      setErrorMessage('');
    } else {
      const results = requestGuestTeacherRegister(institutionId);
      if (results) {
        setErrorMessage('');
        history.push('/waiting/approving');
      } else {
        setErrorMessage('올바른 요청을 보내지 못했습니다.');
      }
    }
  };

  const handleApproving = async (childName: string, institutionId: string) => {
    if (childName.length === 0) {
      setErrorMessage('아이를 입력하셔야 합니다');
    } else if (!isNameCHeck(childName)) {
      setErrorMessage('아이의 이름을 확인해주세요.');
    } else {
      const results = await requestGuestParentRegister(
        childName,
        institutionId,
      );
      if (results) {
        setErrorMessage('');
        history.push('/waiting/approving');
      } else {
        setErrorMessage('올바른 요청을 보내지 못했습니다.');
      }
    }
  };

  return (
    <WaitingWrap>
      <Link to="/">
        <div id="header">
          <span className="blue">닿다</span>
          <span>에 오신 것을 환영합니다</span>
        </div>
      </Link>

      <div id="header2">
        <div>회원가입이 완료되었습니다. 기관승인을 진행해주세요.</div>
      </div>

      {isInsti ? (
        <>
          <div id="instiInputArea">
            <div>기관검색</div>
            <div>
              <input
                type="text"
                id="instiSearch"
                onChange={(e) => {
                  onChange(setInstiInput, e);
                }}
              ></input>
              <Button
                onClick={() => {
                  SearchInsti(instiInput);
                }}
              >
                검색
              </Button>
            </div>
          </div>
          <div id="instiResults">
            {instiInfo.map((insti: any) => (
              <div>
                <input
                  type="radio"
                  name="instiList"
                  value={insti.institutionId}
                  onChange={(e) => {
                    onChecked(e);
                  }}
                />
                <span>{insti.institutionName}</span>
              </div>
            ))}
          </div>
          <div className="errorMessage">{errorMessage}</div>
          <div className="buttonArea">
            <Button
              className="complete"
              onClick={() => {
                handleNextStep(checked.institutionId);
              }}
            >
              {permission === 'parent' ? '다음' : '완료'}
            </Button>
          </div>
        </>
      ) : (
        <div></div>
      )}
      {isChild ? (
        <div id="childArea">
          <div id="childInput">
            <div>아이 이름을 입력해주세요</div>
            <input
              type="text"
              onChange={(e) => {
                onChange(setChild, e);
              }}
            />
          </div>
          <div className="errorMessage">{errorMessage}</div>
          <div className="buttonArea">
            <Button
              onClick={() => {
                handleApproving(child, checked.institutionId);
              }}
            >
              완료
            </Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </WaitingWrap>
  );
}

const WaitingWrap = styled.div`
  background-image: url('../images/signbackground.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  @font-face {
    font-family: 'NanumSquareWeb';
    src: url('../fonts/NanumSquareOTFLight.otf');
  }
  font-family: 'NanumSquareWeb';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  #header {
    font-size: 40px;
    .blue {
      color: #6e6eff;
    }
    margin-bottom: 2vh;
    @media ${({ theme }) => theme.device.mobileL} {
      font-size: 1.7rem;
    }
  }
  #header2 {
    margin-bottom: 3vh;
    @media ${({ theme }) => theme.device.mobileL} {
      font-size: 0.9rem;
    }
  }
  #instiSearch {
    width: 200px;
    border: none;
    border-bottom: 1px solid;
  }
  #instiResults {
    width: 22vw;
    height: 20vh;
    overflow: auto;
    margin-bottom: 2vh;
    @media ${({ theme }) => theme.device.mobileL} {
      width: 44%;
    }
  }
  .buttonArea {
    text-align: center;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    background: none;
  }
  .complete {
    margin: 2vh 0vw 2vh 0vw;
  }
  .errorMessage {
    color: red;
  }
`;

const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin: 2vh 0vw 2vh 1vw;
`;
