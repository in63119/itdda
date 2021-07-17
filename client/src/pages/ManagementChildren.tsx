import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { StateListForm } from "../components/Index";
import { requestApproveChild } from "../common/axios";
import { addState } from "../common/utils/addState";
import { handleGetAllChildByInstitution } from "../common/utils/firebaseFunction";
import { firestore } from "../common/utils/firebase";
interface propsType {
  userInfo: any;
}
export default function Management({ userInfo }: propsType) {
  const urlMatch = useRouteMatch();
  handleGetAllChildByInstitution(userInfo.mainData.institutionId);
  const [inputVlaue, setInputValue] = useState({
    title: "",
    content: "",
    category: "",
  });
  //승인된 원아의 상태관리
  const [childInfo, setChildInfo] = useState<any>({
    isDataOk: false,
    childrenList: [],
  });
  const handleUpdateChildInfo = async () => {
    const chilrenList = await requestApproveChild();
    setChildInfo({
      isDataOk: true,
      childrenList: await addState(chilrenList),
    });
  };
  const handleRealTimeChildrenState = (institutionId: string) => {
    firestore
      .collection("institution")
      .doc(String(institutionId))
      .collection("children")
      .onSnapshot((doc) => {
        const updateData = doc.docChanges()[0].doc.data();
        if (updateData) {
          childInfo.childrenList.forEach((elelemt: any, index: number) => {
            if (elelemt.childId === Number(doc.docChanges()[0].doc.id)) {
              elelemt.state.isOk = updateData.isOk;
              elelemt.state.isCheck = updateData.isCheck;
              elelemt.state.isSleep = updateData.isSleep;
              elelemt.state.isEat = updateData.isEat;
              elelemt.state.please = updateData.please;
            }
          });
        }
        setChildInfo({
          ...childInfo,
          childrenList: childInfo.childrenList,
        });
      });
  };
  // 사용자 입력 값 핸들러
  const handleInputValue = (
    name: string,
    content: string,
    category: string,
  ) => {
    setInputValue({
      ...inputVlaue,
      [name]: content,
      category: category,
    });
  };
  useEffect(() => {
    if (childInfo.childrenList.length !== 0) {
      handleRealTimeChildrenState(userInfo.mainData.institutionId);
    }
  }, [childInfo.childrenList]);
  useEffect(() => {
    handleUpdateChildInfo();
  }, []);
  return (
    <Wrap>
      <Switch>
        <Route exact path={`${urlMatch.path}`}>
          <StateListForm
            childInfo={childInfo}
            title="원아 상태관리"
            fristCategory="전체"
            secondCategory="반별"
          ></StateListForm>
        </Route>
      </Switch>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
