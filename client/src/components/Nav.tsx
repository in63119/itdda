import React from "react";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
interface propsType {
  location: RouteComponentProps["location"];
  history: RouteComponentProps["history"];
  match: RouteComponentProps["match"];
  handleLogout: any;
}
function Nav({ history, handleLogout }: propsType) {
  return (
    <Wrap>
      <WrapLinks>
        <Space></Space>
        <LogoWrapper to="/main">
          <Logo src="../images/datda_symbol_text_main.png" alt="logo"></Logo>
        </LogoWrapper>
        {/* <label onClick={() => history.push('/main/profile')}>프로필</label> */}
        <Links to="/" onClick={() => handleLogout()}>
          <div className="logout">Log out</div>
        </Links>
      </WrapLinks>
    </Wrap>
  );
}
//해당 컴포넌트는 route컴포넌트가 아니기때문에
//history를 사용 할 수 없어 withRouter사용
export default withRouter(Nav);
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: white;
  box-shadow: 0 4px 4px -1px #c8c8c8;
  @font-face {
    font-family: "NanumSquareWeb";
    src: url("../fonts/NanumSquareOTFRegular.otf");
  }
  font-family: "NanumSquareWeb";
`;
const Links = styled(Link)`
  color: black;
  font-size: 13px;
  flex: 1 auto;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  .logout {
    text-align: end;
    margin-right: 20px;
  }
`;
const WrapLinks = styled.div`
  width: 100%;
  display: flex;
  @media ${({ theme }) => theme.device.mobileL} {
    width: 100%;
    display: flex;
    a {
      flex: 1 auto;
      text-align: center;
    }
  }
`;

const LogoWrapper = styled(Link)<any>`
  display: flex;
  justify-content: center;
  flex: 1 auto;
  width: 100%;
`;
const Logo = styled.img`
  width: auto;
  height: 20px;
`;

const Space = styled.span`
  flex: 1 auto;
  width: 100%;
`;

const Name = styled.span`
  font-size: 1.6rem;
`;
