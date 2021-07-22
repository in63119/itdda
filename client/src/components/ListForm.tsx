import React, { useState, useEffect } from "react";
import {
  useHistory,
  Link,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import styled from "styled-components";
import { ListInnerCard } from "./Index";
interface propsType {
  title: string;
  list: any;
  setList: ({}: any) => void;
  fristCategory?: string;
  secondCategory?: string;
  selectedCategory?: string;
  setSelectedCategory?: any;
  contents: any;
  handleUpdateList: any;
  handleChangeNotice?: any;
  permission: string;
  location: RouteComponentProps["location"];
  history: RouteComponentProps["history"];
  match: RouteComponentProps["match"];
}
function ListForm({
  list,
  match,
  title,
  setList,
  contents,
  permission,
  fristCategory,
  secondCategory,
  handleUpdateList,
  handleChangeNotice,
}: propsType) {
  const history = useHistory();
  //탭 메뉴 상태
  const [clickedMenu, setClickedMenu] = useState(0);
  //카테고리 상태
  const [category, setCategory] = useState({
    fristCategory: fristCategory,
    secondCategory: secondCategory,
  });
  const [selectedCategory, setSelectedCategory] = useState("");

  // 탭 메뉴 변경 핸들러에 따른 리스트 데이터 변경
  const handleChangeMenu = (menu: number, category?: string) => {
    setClickedMenu(menu);
    handleChangeNotice(category);
  };
  // 유저가 현재 있는 리스트 페이지의 내용을 랜더링 하기 위해 리스트를 업데이트 함.
  useEffect(() => {
    handleUpdateList(title, category.fristCategory);
    setSelectedCategory(list.currentCategory);
  }, []);
  useEffect(() => {
    setSelectedCategory(list.currentCategory);
  }, [list]);
  return (
    <Wrap>
      <Title>{title}</Title>
      <CategoryWrap>
        <Category>
          <Text
            checked={clickedMenu}
            name={fristCategory}
            className={clickedMenu === 0 ? "active" : ""}
            onClick={() => handleChangeMenu(0, category.fristCategory)}
          >
            {category.fristCategory}
          </Text>
        </Category>
        <Category>
          <Text
            checked={clickedMenu}
            className={clickedMenu === 1 ? "active" : ""}
            onClick={() => handleChangeMenu(1, category.secondCategory)}
          >
            {category.secondCategory}
          </Text>
        </Category>
        {/* <CategoryYear>년도별 검색</CategoryYear> */}
      </CategoryWrap>
      {contents !== undefined ? (
        <>
          <CardWrapper>
            {contents.map((element: any, index: number) => {
              return (
                <ListInnerCard
                  key={index}
                  content={element}
                  title={title === "알림장" ? title : element.title}
                  // category={notice.category}
                  // createAt={notice.created_at}
                  type={""}
                ></ListInnerCard>
              );
            })}
          </CardWrapper>
          <>
            {(() => {
              // console.log(title, ' = 타이틀 ', permission, '= 권한');
              if (title === "알림장" && permission === "institution") {
                return null;
              }
              if (
                title === "투약의뢰서" &&
                (permission === "institution" || permission === "teacher")
              ) {
                return null;
              }
              if (title === "공지사항" && permission === "parent") {
                return null;
              }
              return (
                <ButtonWrapper>
                  <WireButton to={`${match.path}/write`}>작성</WireButton>
                  <GoListButton onClick={() => history.replace("/main")}>
                    {" "}
                    홈
                  </GoListButton>
                </ButtonWrapper>
              );
            })()}
          </>
        </>
      ) : (
        // <LoadingWrapper>
        //   <Loader id="loadingImage" src="../images/loading.gif"></Loader>
        // </LoadingWrapper>
        <div className="emptyData">등록된 데이터가 없습니다.</div>
      )}
    </Wrap>
  );
}
export default withRouter(ListForm);
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  .emptyData {
    @font-face {
      font-family: "NanumSquareWeb";
      src: url("../fonts/NanumSquareOTFLight.otf");
    }
    font-family: "NanumSquareWeb";
    text-align: center;
    margin-top: 100px;
  }
`;

const Title = styled.div`
  justify-content: start;
  margin-left: 15px;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  width: 100%;
  height: 10%;
  color: black;
  padding-top: 30px;
`;
const CategoryWrap = styled.div`
  width: 95%;
  height: 4%;
  margin: 0 auto;
  display: flex;
  padding-bottom: 1%;
  ${(props) => props.id}
`;
const CardWrapper = styled.div`
  width: 98%;
  height: 75%;
  margin: 5% 0;
  overflow: auto;
`;

const ButtonWrapper = styled.div`
  width: 95%;
  text-align: center;
  margin: 10% 0;
`;
const WireButton = styled(Link)`
  text-decoration: none;
  ${({ theme }) => theme.common.defaultButton}
`;
const Category = styled.div<any>`
  background: white;
  width: 80px;
  hieght: 50px;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid lightgray;
  cursor: pointer;
  outline: 0;
  margin-right: 2%;
  &:focus {
    display: none;
  }
  .active {
    background: #6f6eff;
    color: white;
  }
`;
const Text = styled.div<any>`
  height: 100%;
  font-size: ${({ theme }) => theme.fontSizes.l};
  display: flex;
  align-items: center;
  place-content: center;
  color: #909090;
`;
const GoListButton = styled.span`
  margin-left: 3%;
  ${({ theme }) => theme.common.defaultButton}
`;
