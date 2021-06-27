import React, { useState } from "react";
import styled from "styled-components";

function Report() {
  const [report, setReport] = useState({ title: "", content: "" });

  const onChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setReport({ ...report, [key]: value });
  };
  return (
    <Wrap>
      <ContentCard>
        <Title>닿다에게 알려주세요</Title>
        <div className="flexFrame report title">
          <div className="flexFrame">
            <span className="titleEl">제목</span>
            <div className="titleFrame">
              <input
                className="title inputTitle"
                type="text"
                onChange={(e) => {
                  onChange("title", e);
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className="contents flexFrame">
          <span className="titleEl">내용</span>
          <div className="contentFrame">
            <input
              className="content"
              type="text"
              onChange={(e) => {
                onChange("content", e);
              }}
            ></input>
          </div>
        </div>
        <div id="buttonArea">
          <Button>제출</Button>
        </div>
      </ContentCard>
    </Wrap>
  );
}
export default Report;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  @font-face {
    font-family: "NanumSquareWeb";
    src: url("../fonts/NanumSquareOTFLight.otf");
  }
  font-family: "NanumSquareWeb";
`;
const ContentCard = styled.div`
  ${({ theme }) => theme.common.contentCardDiv}
  display: flex;
  flex-direction: column;
  width: 100%;
  .flexFrame {
    display: flex;
    flex-direction: column;
  }
  .titleFrame {
    display: flex;
    justify-content: center;
  }
  .contentFrame {
    display: flex;
    justify-content: center;
  }
  .titleEl {
    margin-left: 30px;
  }
  .report {
    width: 100%;
  }
  .content {
    margin-top: 30px;
    height: 50vh;
    width: 90%;
    border-radius: 12px 12px 12px 12px;
    border: solid 1px #eeeeee;
    font-size: 20px;
  }
  #buttonArea {
    text-align: center;
    margin-top: 10%;
  }
  .inputTitle {
    margin-bottom: 30px;
    width: 90%;
    font-size: 30px;
    border: solid 1px white;
    border-bottom: solid 1px #eeeeee;
  }
`;

const Title = styled.div`
  justify-content: start;
  margin-left: 15px;
  width: 100%;
  font-size: 35px;
  width: 100%;
  height: 10%;
  color: black;
  padding-top: 30px;
`;

const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
`;
