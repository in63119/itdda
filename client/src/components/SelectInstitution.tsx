import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { requestSearchInsti } from '../common/axios';

interface Props {
  instiInfo: any;
  setInsti: any;
  instiSelect: string;
  setInstiSelect: any;
  errorMessage: string;
  setErrorMessage: any;
}

function SelectionInstitution({
  instiInfo,
  setInsti,
  instiSelect,
  setInstiSelect,
  errorMessage,
  setErrorMessage,
}: Props) {
  const history = useHistory();
  //검색
  const [instiInput, setInstiInput] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInstiInput(value);
  };

  const onChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInstiSelect(value);
  };

  const searchInsti = async (value: string) => {
    const results = await requestSearchInsti(value);
    if (results) {
      setInsti(results);
    }
  };

  const nextStep = (institutinId: string) => {
    if (institutinId.length === 0) {
      setErrorMessage('기관을 선택해주세요');
    } else {
      history.push('/main/profile/children');
      setErrorMessage('');
    }
  };
  return (
    <Wrap>
      <ContentCard>
        <h1>기관을 선택해주세요</h1>
        <div>
          <input
            type="text"
            onChange={(e) => {
              onChange(e);
            }}
          ></input>
          <button
            onClick={() => {
              searchInsti(instiInput);
            }}
          >
            검색
          </button>
        </div>
        {instiInfo.map((insti: any) => (
          <div>
            <input
              type="radio"
              value={insti.institutionId}
              name="institution"
              onChange={(e) => {
                onChecked(e);
              }}
            ></input>
            <span>{insti.institutionName}</span>
          </div>
        ))}
        <div>
          {JSON.parse(localStorage.getItem('loginInfo')!).permission ===
          'teacher' ? (
            <Link to="/main/profile">
              <Button>선택 완료</Button>
            </Link>
          ) : (
            <Button
              onClick={() => {
                nextStep(instiSelect);
              }}
            >
              아이 등록
            </Button>
          )}
        </div>
        <div>{errorMessage}</div>
      </ContentCard>
    </Wrap>
  );
}

export default SelectionInstitution;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentCard = styled.div`
  ${({ theme }) => theme.common.contentCardDiv}
`;
const Title = styled.div`
  ${({ theme }) => theme.common.contentTitle}
`;
const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin : 0 5% 0 5%;
`;
