import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  requestApproveTeacher,
  requestGetClassList,
  requestChangeTeacherClass,
} from "../common/axios";
import styled from "styled-components";
import { ClassManage, TeacherManage, StudentManage } from "../components/Index";
interface Props {
  setModalMessage: any;
  setModalVisible: any;
}
function CreateClass({ setModalMessage, setModalVisible }: Props) {
  const [isClass, setIsClass] = useState<boolean>(false);
  const [isTeacher, setIsTeacher] = useState<boolean>(true);
  const [isStudent, setIsStudent] = useState<boolean>(false);

  const [message, setMessage] = useState<number>();
  //useEffect를 위한 인자
  const [classCheck, setClassCheck] = useState<string>("");

  const [classInfo, setClassInfo] = useState([]);

  const [teachers, setTeachers] = useState({
    approved: [],
    changedTeacherId: "",
    unapproved: [],
  });

  // const [students, setStudents] = useState([
  //   { userName: 'a', userId: '1', className: 'a', classId: '1' },
  // ]);

  const initGetClass = async () => {
    const classList = await requestGetClassList();
    if (classList) {
      setClassInfo(classList);
    }
  };

  const initApproveTeacher = async () => {
    const teacherList = await requestApproveTeacher();
    if (teacherList) {
      setTeachers({
        approved: teacherList.approved,
        changedTeacherId: teacherList.changedChildId,
        unapproved: teacherList.unapproved,
      });
    }
  };

  const approveButton = async (teacherId: number) => {
    const results = await requestApproveTeacher(teacherId);
    if (results) {
      setTeachers(results);
    }
  };

  const changeClassButton = async (teacherId: number, classId: number) => {
    const request = await requestChangeTeacherClass(teacherId, classId);
    if (request) {
      setMessage(classId);
    }
  };
  useEffect(() => {
    initGetClass();
  }, [classCheck]);

  useEffect(() => {
    initApproveTeacher();
  }, [message]);

  useEffect(() => {
    initGetClass();
    initApproveTeacher();
  }, []);

  const toggleClass = () => {
    setIsClass(true);
    setIsTeacher(false);
    // setIsStudent(false);
  };

  const toggleTeacher = () => {
    setIsClass(false);
    setIsTeacher(true);
    // setIsStudent(false);
  };

  const toggleStudent = () => {
    setIsClass(false);
    setIsTeacher(false);
    // setIsStudent(true);
  };
  return (
    <Wrap>
      <h3>{isClass ? "반 구성" : isTeacher ? "선생님 관리" : "원아 관리"}</h3>
      <div>
        <Button
          className="manageType manageTeacher"
          onClick={() => toggleTeacher()}
        >
          교사관리
        </Button>
        {/* <button className="manageType" onClick={() => toggleStudent()}>
          원아관리
        </button> */}
        <Button className="manageType" onClick={() => toggleClass()}>
          반관리
        </Button>
      </div>
      <ManageContainer>
        <TeacherManage
          isTeacher={isTeacher}
          teachers={teachers}
          classInfo={classInfo}
          setModalMessage={setModalMessage}
          setModalVisible={setModalVisible}
          approveButton={approveButton}
          changeClassButton={changeClassButton}
        />
        {/* <StudentManage
        classInfo={classInfo}
        isStudent={isStudent}
        students={students}
        setModalMessage={setModalMessage}
        setModalVisible={setModalVisible}
      /> */}
        <ClassManage
          isClass={isClass}
          classInfo={classInfo}
          setModalMessage={setModalMessage}
          setModalVisible={setModalVisible}
          classCheck={classCheck}
          setClassCheck={setClassCheck}
        />
      </ManageContainer>
      <ButtonArea>
        <Link to="/main">
          <Button>닫기</Button>
        </Link>
      </ButtonArea>
    </Wrap>
  );
}
export default CreateClass;

const ManageContainer = styled.div`
  width: 100%;
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 5%;
  .teacherArea {
    background-color: pink;
  }
  .classList {
    display: inline-block;
    border: solid 1px;
    border-radius: 5px;
    width: 60%;
    height: 5%;
    padding-left: 2%;
  }
  #student {
    #studentListArea {
      border: solid 1px;
      height: 400px;
      border-radius: 5px;
      overflow: auto;
    }
    #studentTitleList {
      border-bottom: solid 1px;
    }
    #studentButtonArea {
      text-align: center;
      bottom: 0px;
    }
  }
  .manageType {
    margin: 2%;
  }
  .manageTeacher {
    margin-left: 0%;
  }
  .indiTeacher {
    text-align: center;
  }
`;

const ButtonArea = styled.div`
  margin-top: 5%;
  text-align: center;
`;

const Button = styled.button`
  height: 25%;
  ${({ theme }) => theme.common.defaultButton}
`;
