import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
interface propType {
  userInfo: any;
}
export default function Carousel({ userInfo }: propType) {
  // carousel 상태
  const slideRef = useRef<HTMLDivElement>(null);
  const TOTAL_SLIDES = 1;
  const [currentSlide, setCurrentSlide] = useState(0);
  // carousel의 다음 슬라이드
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // carousel의 이전 슬라이드
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    const { current } = slideRef;
    if (current !== null) {
      current.style.transition = "all 0.3s ease-in-out";
      current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  }, [currentSlide]);
  return (
    <>
      <CarouselContainer>
        <Title>앨범</Title>
        {userInfo.mainData ? (
          <SliderContainer ref={slideRef}>
            {userInfo.permission === "parent"
              ? userInfo.mainData[userInfo.currentChild].album.map(
                  (element: any, index: number) => {
                    return (
                      <AlbumCard key={element.albumId}>
                        <AlbumImg src={element.photo} alt="앨범사진"></AlbumImg>
                      </AlbumCard>
                    );
                  },
                )
              : userInfo.mainData.album.map((element: any, index: number) => {
                  return (
                    <AlbumCard key={element.albumId}>
                      <AlbumImg src={element.photo} alt="앨범사진"></AlbumImg>
                    </AlbumCard>
                  );
                })}
          </SliderContainer>
        ) : null}

        <More to="/main/album">더보기</More>
        {/* {userInfo.mainData.album.length >= 1 ? ( */}
        <SlideButtonWrap>
          <SlideButton onClick={prevSlide}>
            <Arrow>{"<"}</Arrow>
          </SlideButton>
          <SlideButton onClick={nextSlide}>
            <Arrow>{">"}</Arrow>
          </SlideButton>
        </SlideButtonWrap>
      </CarouselContainer>
    </>
  );
}
const SlideButtonWrap = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  top: -109px;
  position: relative;
  justify-content: space-between;
`;
const SlideButton = styled.span`
  width: 40px;
  height: 40px;
	border-radius: 30px;
	display: flex;
  background: white;
	align-items: center;
	place-content: center;
	cursor:pointer;
  box-shadow: 1px 1px 3px;
}
`;
const Arrow = styled.span`
  font-size: 2.5rem;
  color: #6f6eff;
  position: absolute;
  z-index: 9;
`;
const CarouselContainer = styled.div`
  width: 90%;
  overflow: hidden;
  height: auto;
  margin: 5%;
  margin-top: 2%;
  @font-face {
    font-family: "NanumSquareWeb";
    src: url("../fonts/NanumSquareOTFLight.otf");
  }
  font-family: "NanumSquareWeb";
`;
const SliderContainer = styled.div`
  display: flex;
  margin-top: 3%;
`;
const AlbumCard = styled.span`
  width: 150px;
  height: 100px;
  display: inline-table;
  margin: 0px 8px 0px 8px;
  ${({ theme }) => theme.common.divCardStyle};
`;
const AlbumImg = styled.img`
  width: 180px;
  height: 100px;
  border-radius: 15px;
`;
const Title = styled.label`
  width: 100%;
  height: 16%;
  margin-bottom: 3%;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
`;
const More = styled(Link)<any>`
  display: block;
  padding: 2%;
  text-align: end;
`;
