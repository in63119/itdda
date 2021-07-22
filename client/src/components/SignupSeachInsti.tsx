import React, { useState } from "react";
interface Props {
  searchInsti: boolean;
  handleSearchInsti: any;
}
function SignupSearchInsti({ searchInsti, handleSearchInsti }: Props) {
  //fakeData 추가, 나중에 axios 요청 넣기
  const [instiInfo, setInstiInfo] = useState([
    {
      institutionId: 1,
      institutionName: "우리유치원",
      institutionPhoto: "sadf",
    },
    {
      institutionId: 2,
      institutionName: "원암유치원",
      institutionPhoto: "sadf",
    },
  ]);
  const [inputText, setInputText] = useState<string>("");

  return searchInsti ? (
    <div>
      <h1>기관 정보</h1>
      <div>
        <input type="text"></input>
        <button>검색</button>
      </div>
      {instiInfo.map((info) => (
        <div>
          <input type="radio"></input>
          <span>{info.institutionName}</span>
          <img src={info.institutionPhoto}></img>
        </div>
      ))}
      <button onClick={() => handleSearchInsti()}>다음</button>
    </div>
  ) : (
    <div></div>
  );
}

export default SignupSearchInsti;
