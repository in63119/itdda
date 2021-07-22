import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function SecondSubMenu() {
  return (
    <Wrap>
      <Container>
        <ImageWrapper>
          <Link to="/main/report">
            <Image className="bugReport" src="../images/bugReport.png"></Image>
          </Link>
          <Link to="/main/education">
            <Image className="eduCoding" src="../images/eduCoding.png"></Image>
          </Link>
        </ImageWrapper>
      </Container>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  @media ${({ theme }) => theme.device.mobileL} {
    width: 100%;
    height: 100%;
  }
`;

const SubMenuBar = styled(Link)`
  display: block;
  width: 100%;
  ${({ theme }) => theme.common.defaultButton}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  width: 100%;
  border-radius: 15px 15px 15px 15px;
  box-shadow: 0px 0px 5px #c8c8c8;
  overflow: auto;
`;

const Text = styled.div`
  position: absolute;
  padding: 10px;
  color: white;
  // grid-gap: 6%;
  // grid-auto-rows: repeat(auto-fill);
  // border-radius: 15px 15px 15px 15px;
  // box-shadow: 0px 0px 5px #c8c8c8;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 15px 15px 15px 15px;
  .eduCoding {
    width: 90%;
    height: 90%;
  }
`;

const ImageWrapper = styled.div`
  @media ${({ theme }) => theme.device.mobileL} {
    display: flex;
    flex-direction: column;
  }
  .bugReport {
    width: 100%;
    height: auto;
  }
  .eduCoding {
    width: 100%;
    height: auto;
  }
`;
