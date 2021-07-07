import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { requestGetProfile } from "../common/axios";
import { GuestWaiting } from "../pages/Index";

interface Props {
  userInfo: {
    permission: string;
    isLogin: boolean;
    mainData: any;
    currentChild: number;
  };
}

export default function ProfileList({ userInfo }: Props) {
  const permission = JSON.parse(localStorage.getItem("loginInfo")!).permission;

  const [profileInfo, setProfileInfo] = useState<any>({
    basicInfo: "",
    approved: "",
    unapproved: "",
  });

  useEffect(() => {
    if (permission === "teacher" || permission === "institution") {
      getProfile();
    } else {
      getProfile(userInfo.mainData[userInfo.currentChild].childId);
    }
  }, []);

  const getProfile = async (childId?: string | null) => {
    const results = await requestGetProfile(childId);
    if (results) {
      setProfileInfo({
        ...profileInfo,
        basicInfo: results.basicInfo,
        approved: results.approved,
        unapproved: results.unapproved,
      });
    }
  };

  const onChange = (key: any, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setProfileInfo({ ...profileInfo.basicInfo, [key]: value });
  };

  return profileInfo.basicInfo.length === 0 ? (
    <Wrap>
      <ContentCard>
        <Loading>
          <img id="loading" src="../images/loading.gif" />
        </Loading>
      </ContentCard>
    </Wrap>
  ) : (
    <Wrap>
      <ContentCard>
        <Title>프로필</Title>
        <div id="profile">
          <div id="profileArea">
            <div id="flexLeft">
              <AvatarCard
                src={
                  permission !== "parent"
                    ? userInfo.mainData.profileImg
                    : userInfo.mainData[userInfo.currentChild].profileImg
                }
                alt="avatar"
              ></AvatarCard>
              {JSON.parse(localStorage.getItem("loginInfo")!).permission ===
              "teacher" ? (
                <div id="profileButton"></div>
              ) : JSON.parse(localStorage.getItem("loginInfo")!).permission ===
                "parent" ? (
                <div id="profileButton">
                  <Link to="/main/profile/institution">
                    <Button>아이등록</Button>
                  </Link>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div id="contentsWrap">
              {JSON.parse(localStorage.getItem("loginInfo")!).permission !==
              "institution" ? (
                <ProfileData>
                  <ProfileWrapper>
                    <div className="profile name">
                      <span className="blue">
                        {permission === "teacher" ? "이름" : "이름"}
                      </span>
                      <input
                        className="textBox username"
                        type="text"
                        placeholder={profileInfo.basicInfo.name}
                        onChange={(e) => {
                          onChange("name", e);
                        }}
                      ></input>
                    </div>
                    <div className="profile email">
                      <span className="blue">이메일 </span>
                      <span className="emailText">
                        {profileInfo.basicInfo.email}
                      </span>
                    </div>
                    <div className="profile mobile">
                      <span className="blue">전화번호 </span>
                      <input
                        className="textBox phone"
                        type="text"
                        placeholder={profileInfo.basicInfo.mobile}
                        onChange={(e) => {
                          onChange("mobile", e);
                        }}
                      ></input>
                    </div>
                  </ProfileWrapper>
                </ProfileData>
              ) : (
                <>
                  <ProfileWrapper>
                    <div className="profile name">
                      <span className="blue">기관이름 </span>
                      <input
                        className="textBox"
                        type="text"
                        placeholder={profileInfo.basicInfo.name}
                        onChange={(e) => {
                          onChange("institution", e);
                        }}
                      ></input>
                    </div>
                    <div className="profile email">
                      <span className="blue">이메일 </span>
                      <span className="emailText">
                        {profileInfo.basicInfo.email}
                      </span>
                    </div>
                    <div className="profile mobile">
                      <span className="blue">전화번호 </span>
                      <input
                        className="textBox phone"
                        type="text"
                        placeholder={profileInfo.basicInfo.mobile}
                        onChange={(e) => {
                          onChange("mobile", e);
                        }}
                      ></input>
                    </div>
                  </ProfileWrapper>
                </>
              )}
            </div>
          </div>
          {JSON.parse(localStorage.getItem("loginInfo")!).permission ===
          "parent" ? (
            <>
              <ProfileApprovedWrap>
                <div className="blue bigText">승인된 내 아이들</div>
                <ProfileApprovedList>
                  <ApprovedTitle>
                    <span className="approvedName">이름</span>
                    <span className="approvedClass">반</span>
                    <span className="approvedInsti">기관</span>
                  </ApprovedTitle>
                  {profileInfo.approved.map((child: any) => (
                    <div className="indiApprovedResults">
                      <span className="approvedNameResults">{child.name}</span>
                      <span className="approvedClassResults">
                        {child.classs.className}
                      </span>
                      <span className="approvedInstiResults">
                        {child.institution.institutionName}
                      </span>
                    </div>
                  ))}
                </ProfileApprovedList>
              </ProfileApprovedWrap>
              <ProfileUnapprovedWrap>
                <div className="blue bigText">승인 대기중인 내 아이들</div>
                <ProfileUnapprovedList>
                  <UnapprovedTitle>
                    <span className="unapprovedName">이름</span>
                    <span className="unapprovedInsti">기관</span>
                  </UnapprovedTitle>
                  {profileInfo.unapproved.map((child: any) => (
                    <div className="indiUnapprovedResults">
                      <span className="unapprovedNameResults">
                        {child.name}
                      </span>
                      <span className="unapprovedInstiResults">
                        {child.institution.institutionName}
                      </span>
                    </div>
                  ))}
                </ProfileUnapprovedList>
              </ProfileUnapprovedWrap>
            </>
          ) : (
            <div></div>
          )}
          <div id="complete">
            <Button>수정</Button>
            <Link to="/main">
              <Button>확인</Button>
            </Link>
          </div>
        </div>
      </ContentCard>
    </Wrap>
  );
}

const ProfileWrapper = styled.span`
  display: inline-block;
  text-align: left;
  div {
    margin-top: 2%;
  }
`;

const ProfileData = styled.span`
  text-align: left;
  width: fit-content;
  display: block;
  margin: 0 auto;
  margin-top: 3%;
  div {
    padding: 2% 0 2% 0;
  }
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;

  #contentsWrap {
    flex: 3 1 auto;
  }
  #flexLeft {
    flex: 1 1 auto;
  }
  #profile {
    text-align: center;
  }
  .profile {
  }
  #profileArea {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10% 0 10%;
  }
  #complete {
    text-align: center;
    margin-bottom: 5%;
  }
  .blue {
    color: blue;
  }

  .blue.bigText {
    font-size: 2rem;
  }
  .textBox {
    text-align: center;
    border: solid 0px;
    border-bottom: solid 1px;
  }
  .username {
    margin-left: 35px;
  }
  .phone {
    margin-left: 6px;
  }

  .emailText {
    margin-left: 18px;
  }
  #profileButton {
    padding-left: 40px;
  }
`;

const Loading = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  #loading {
    text-align: center;
    width: 25%;
    height: auto;
  }
`;

const ContentCard = styled.div`
  ${({ theme }) => theme.common.contentCardDiv}
`;
const Title = styled.h3`
  ${({ theme }) => theme.common.contentTitle}
  color : black;
  margin-left: 5%;
`;
const Button = styled.button`
  ${({ theme }) => theme.common.defaultButton}
  margin : 4% 2% 0 2%;
`;

const ApprovedTitle = styled.div`
  width: 100%;
  display: flex;
  padding: 1%;
  border-bottom: solid 1px lightgray;
  .approvedName {
    width: 100%;
    flex: 1 auto;
    text-align: center;
  }
  .approvedClass {
    width: 100%;
    flex: 1 auto;
    text-align: center;
  }
  .approvedInsti {
    width: 100%;
    flex: 1 auto;
    text-align: center;
  }
`;

const ProfileApprovedList = styled.div`
  border: solid 1px lightgray;
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
  .indiApprovedResults {
    width: 100%;
    display: flex;
    padding: 1%;

    .approvedNameResults {
      width: 100%;
      flex: 1 auto;
      text-align: center;
    }
    .approvedClassResults {
      width: 100%;
      flex: 1 auto;
      text-align: center;
    }
    .approvedInstiResults {
      width: 100%;
      flex: 1 auto;
      text-align: center;
    }
  }
`;

const ProfileUnapprovedList = styled.div`
border: solid 1px lightgray;
border-radius: 10px;
width: 80%;
margin: 0 auto;
  .indiUnapprovedResults {
    width: 100%;
		display: flex;
    .unapprovedNameResults {
      width: 100%;
      flex: 1 auto;
      text-align: center;
    }
    .unapprovedInstiResults {
      width: 100%;
      flex: 1 auto;
      text-align: center;
    }
`;

const UnapprovedTitle = styled.div`
  width: 100%;
  display: flex;
  .unapprovedName {
    width: 100%;
    flex: 1 auto;
    text-align: center;
  }
  .unapprovedInsti {
    width: 100%;
    flex: 1 auto;
    text-align: center;
  }
`;

const ProfileApprovedWrap = styled.div`
  margin-top: 2%;
`;

const ProfileUnapprovedWrap = styled.div`
  margin-top: 60px;
`;

const AvatarCard = styled.img`
  overflow: hidden;
  border-radius: 20px;
  resize: both;
  width: 120px;
  height: 120px;
`;
