import React from "react";
import styled from "styled-components";
interface propType {
  handleInputValue: any;
  type: string;
}
export default function WriteMedicineForm({
  handleInputValue,
  type,
}: propType) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  return (
    <Wrap>
      <Container>
        <SubText>
          {`금일 본 자녀의 투약을 ${"밀알어린이집"} 선생님께 의뢰합니다.`}
        </SubText>
        <InputForm required defaultValue="증상 : " name="symtom"></InputForm>
        <InputForm
          required
          defaultValue="약의 종류 : "
          name="typeOf"
        ></InputForm>
        <InputForm
          required
          defaultValue="약의 용량 : "
          name="quantity"
        ></InputForm>
        <InputForm
          required
          defaultValue="투약 시간: "
          name="takeTime"
        ></InputForm>
        <InputForm
          required
          defaultValue="보관 방법: "
          name="management"
        ></InputForm>
        <WriterWrapper>
          <Warning>{`*투약으로 인한 책임은 의뢰자가 집니다.`}</Warning>
          <DateWrapper>
            <div>{`${year}.${month}.${day}`}</div>
            <div>보호자 : {"김엄마"}</div>
          </DateWrapper>
        </WriterWrapper>
      </Container>
    </Wrap>
  );
}
const Container = styled.div`
  width: 90%;
  height: 100%;
  padding: 5%;
  margin: 0 auto;
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const TextBox = styled.textarea`
  width: 100%;
  padding: 2%;
  height: 98%;
  outline: none;
  border: 0px;
  resize: none;
  ::placeholder {
    color: #dbdbdb;
  }
  border-radius: 15px 15px 15px 15px;
  box-shadow: 0px 0px 5px #c8c8c8;
`;
const InputForm = styled.input`
  width: 100%;
  margin-top: 2%;
  margin-bottom: 2%;
  ${({ theme }) => theme.common.defaultInput}
`;
const WriterWrapper = styled.div`
  margin-top: 4%;
  display: flex;
  justify-content: space-between;
`;
const SubText = styled.div`
  margin-bottom: 10%;
`;

const Warning = styled.span`
  color: #6f6eff;
`;
const DateWrapper = styled.span`
  text-align: end;
`;
