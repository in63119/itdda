import React from "react";
import styled from "styled-components";
interface propType {
  handleInputValue: any;
  type: string;
}
export default function TextAreaForm({ handleInputValue, type }: propType) {
  const handleTextArea = (e: any, category: string) => {
    const { name, value } = e.target;
    handleInputValue(name, value, category);
  };
  return (
    <>
      {" "}
      <TextBox
        placeholder="내용작성"
        name="content"
        onChange={(e: any) => handleTextArea(e, type)}
      ></TextBox>
    </>
  );
}
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
