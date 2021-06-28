import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { changeTimeStamp } from "../common/utils/changeTimeStamp";

interface Props {
  classInfo: any;
  isTeacher: boolean;
  teachers: any;
  setModalMessage: any;
  setModalVisible: any;
  approveButton: (teacherId: number) => void;
  changeClassButton: (teacherId: any, classId: any) => void;
}
function TeacherManage({
  isTeacher,
  teachers,
  classInfo,
  setModalMessage,
  setModalVisible,
  approveButton,
  changeClassButton,
}: Props) {
  const [checkedClass, setCheckedClass] = useState({ classId: "" });
  const [checkedTeacher, setCheckedTeacher] = useState({ teacherId: "" });

  const onModal = (value: any) => {
    setModalVisible(true);
    setModalMessage(value);
  };
  //radio class 버튼;
  const onCheckedClass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCheckedClass({ ...checkedClass, classId: value });
  };
  const onCheckedTeacher = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCheckedTeacher({ ...checkedTeacher, teacherId: value });
  };
  //곧 승인 요청을 내려줄 함수;
  return isTeacher ? (
    <TeacherManageWrap id="teacher">
      <UnapprovedArea>
        <div className="subTitle">승인대기중</div>
        <div id="teacherWaiting">
          <div id="teacherWaitingTitle">
            <span className="titleTeacher">교사</span>
            <span className="titleTime">시간</span>
            <span className="titleBlank" />
          </div>
          <div id="teacherWaitingList">
            {teachers.unapproved.map((teacher: any) => (
              <TeacherWrapper className="waitingEl">
                <TeacherName className="nameResults">
                  {teacher.teacherName}
                </TeacherName>
                <CreatedAt className="timeResults">
                  {changeTimeStamp(teacher.createdAt)}
                </CreatedAt>
                <UnclickedButton
                  className="approvedButton"
                  onClick={() => {
                    approveButton(teacher.teacherId);
                  }}
                >
                  수락
                </UnclickedButton>
                {/* <button>보류</button>
                <button>거절</button> */}
              </TeacherWrapper>
            ))}
          </div>
        </div>
      </UnapprovedArea>
      <ApprovedArea>
        <div className="subTitle">교사관리</div>
        <div id="teacherManage">
          <div id="teacherManageTitle">
            <span className="titleSelect">선택</span>
            <span className="titleTeacherr">교사</span>
            <span className="titleClass">반</span>
            <span className="titleButton"></span>
          </div>
          <div id="teacherManageList">
            <div id="manageListArea">
              {teachers.approved.map((teacher: any) => (
                <div className="managingEl">
                  <input
                    className="manageRadio"
                    type="radio"
                    onChange={(e) => {
                      onCheckedTeacher(e);
                    }}
                    name="teacherList"
                    value={teacher.teacherId}
                  ></input>
                  <span className="manageTeacher">{teacher.teacherName}</span>
                  <span className="manageClass">
                    {!teacher.classs
                      ? "미지정"
                      : teacher.classs.teacherClassName}
                  </span>
                  <UnclickedButton
                    className="unapprovedButton"
                    onClick={() => {
                      approveButton(teacher.teacherId);
                    }}
                  >
                    미승인
                  </UnclickedButton>
                </div>
              ))}
            </div>
            <div id="teacherButtonArea2">
              <PostButton
                onClick={() => {
                  onModal(
                    <div id="classInfoModal">
                      {classInfo.map((classs: any) => (
                        <div>
                          <input
                            type="radio"
                            name="classInfo"
                            value={classs.classId}
                            onChange={(e) => {
                              onCheckedClass(e);
                            }}
                          ></input>
                          <span>{classs.className}</span>
                        </div>
                      ))}
                    </div>,
                  );
                }}
              >
                반 변경
              </PostButton>
              <PostButton
                onClick={() => {
                  changeClassButton(
                    checkedTeacher.teacherId,
                    checkedClass.classId,
                  );
                }}
              >
                보내기
              </PostButton>
            </div>
          </div>
        </div>
      </ApprovedArea>
    </TeacherManageWrap>
  ) : (
    <div></div>
  );
}

export default TeacherManage;

const TeacherName = styled.span``;
const CreatedAt = styled.span``;
const TeacherWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  align-items: center;
  margin-top: 3px;
`;
const TeacherManageWrap = styled.div`
  #teacherWaitingTitle {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
    font-size: 1.2rem;
    border-bottom: 1px solid lightgray;
    padding: 1%;
  }
  .subTitle {
    color: #6f6eff;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
  }
  #teacherWaiting {
    border-radius: 5px;
    height: 15vh;
    overflow: auto;
    border: 1px solid lightgray;
    border-radius: 7px;
  }
  #teacherWaitingList {
    .timeResults {
      color: ${({ theme }) => theme.colors.gray};
    }
    .approvedButton {
      justify-self: center;
      max-width: fit-content;
    }
  }
  #teacherManage {
    border: solid 1px;
    border-radius: 5px;
    border: 1px solid lightgray;
    border-radius: 7px;
    height: 68vh;
    font-size: 1.2rem;
    #teacherManageList {
      overflow: auto;
      #manageListArea {
        max-height: 57vh;
        padding: 1%;
      }
    }
    #teacherManageTitle {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      text-align: center;
      font-size: 1.2rem;
      border-bottom: 1px solid lightgray;
      padding: 1%;
      .titleSelect {
        text-align: center;
        flex: 1 auto;
        width: 100%;
      }
      .titleTeacherr {
      }
      .titleClass {
        text-align: center;
        flex: 1 auto;
        width: 100%;
      }
      .titleButton {
        flex: 1 auto;
        width: 100%;
      }
    }
  }

  .managingEl {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    align-items: center;
    margin-top: 3px;
    .manageRadio {
      justify-self: center;
    }
    .manageTeacher {
      text-align: center;
    }
    .manageClass {
      text-align: center;
      @media ${({ theme }) => theme.device.mobileL} {
        padding-right: 0px;
      }
    }
    .unapprovedButton {
      place-self: center;
    }
  }

  #teacherButtonArea2 {
    text-align: end;
    margin-top: 2%;
    padding-top: 2%;
    width: 90%;
    margin: 0 auto;
  }
`;

const UnclickedButton = styled.button`
  ${({ theme }) => theme.common.unclickedButtonStyle}
  margin : 0 2% 0 2%;
`;

const PostButton = styled.button`
  ${({ theme }) => theme.common.unclickedButtonStyle}
  margin : 0 2% 0 2%;
  color: lightgray;
  background: white;
  border: 1px solid;
  border-radius: 5px;
`;

const UnapprovedArea = styled.div`
  margin-bottom: 10%;
`;

const ApprovedArea = styled.div``;
