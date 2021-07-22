import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function FooterContents() {
  return (
    <Wrap>
      <div>developed</div>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2rem;
`;
