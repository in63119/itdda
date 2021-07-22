import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
interface propsType {
  permission: string;
  handleLogout: any;
}
export default function SubMenu({ permission, handleLogout }: propsType) {
  function handleBack() {
    window.history.back();
  }
  return (
    <Wrap>
      <Back onClick={() => handleBack()}>
        <div className="bottomNavFrame">
          <img className="back" src="../images/back.png" />
        </div>
      </Back>
      <Home to="/main">
        <div className="bottomNavFrame">
          <img className="home" src="../images/home.png" />
        </div>
      </Home>
      {permission === "institution" ? (
        <>
          <SubMenuButton to="/main/director">기관설정</SubMenuButton>
          <MobileSubMenu to="/main/director">
            <div className="forCenter">
              <img className="mobileInsti" src="../images/kindergarten.png" />
            </div>
          </MobileSubMenu>
        </>
      ) : null}
      {permission === "teacher" ? (
        <>
          <SubMenuButton to="/main/management">원아 상태관리</SubMenuButton>
          <SubMenuButton to="/main/approve">원아승인</SubMenuButton>
          <MobileSubMenu to="/main/management">
            <div className="forCenter">
              <img className="mobileChildStat" src="../images/checkChild.png" />
            </div>
          </MobileSubMenu>
          <MobileSubMenu to="/main/approve">
            <div className="forCenter">
              <img className="mobileAdmin" src="../images/administration.png" />
            </div>
          </MobileSubMenu>
        </>
      ) : null}
      <SubMenuButton to="/main/profile">프로필</SubMenuButton>
      <MobileSubMenu to="/main/profile">
        <div className="forCenter">
          <img className="mobileProfile" src="../images/my_page.png" />
        </div>
      </MobileSubMenu>
      <Logout to="/" onClick={() => handleLogout()}>
        <div className="bottomNavFrame">
          <img className="logout" src="../images/logout.png" />
        </div>
      </Logout>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  padding: 2%;
  text-align: center;
  @media ${({ theme }) => theme.device.mobileL} {
    display: flex;
    justify-content: space-around;
    .forCenter {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
`;

const SubMenuButton = styled(Link)`
  display: block;
  width: 100%;
  margin: 2% 0% 2% 0%;
  padding: 3px 0px 3px 0px;
  ${({ theme }) => theme.common.defaultButton}
  @media ${({ theme }) => theme.device.mobileL} {
    display: none;
  }
`;

const MobileSubMenu = styled(Link)`
  @media only screen and (min-width: 700px) {
    display: none;
  }
  .mobileInsti {
    height: 30px;
  }
  .mobileProfile {
    height: 30px;
  }
  .mobileChildStat {
    height: 30px;
  }
  .mobileAdmin {
    height: 30px;
  }
`;

const Back = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobileL} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
  }
`;

const Home = styled(Link)`
  display: none;
  @media ${({ theme }) => theme.device.mobileL} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .home {
      height: 30px;
    }
  }
`;

const Logout = styled(Link)`
  display: none;
  @media ${({ theme }) => theme.device.mobileL} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .logout {
      height: 30px;
    }
  }
`;
