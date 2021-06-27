import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

interface propType {
  userInfo: any;
}
export default function AlbumCarousel({ userInfo }: propType) {
  return (
    <div>
      <CarouseAlbum infiniteLoop={true} autoPlay={true} showThumbs={false}>
        {userInfo.mainData
          ? userInfo.permission === 'parent'
            ? userInfo.mainData[userInfo.currentChild].album.map((el: any) => {
                return (
                  <AlbumDiv>
                    <AlbumImg src={el.photo} />
                  </AlbumDiv>
                );
              })
            : userInfo.mainData.album.map((el: any) => {
                return (
                  <AlbumDiv>
                    <AlbumImg src={el.photo} />
                  </AlbumDiv>
                );
              })
          : null}
      </CarouseAlbum>
      <More to="/main/album">더보기</More>
    </div>
  );
}
const More = styled(Link)<any>`
  display: block;
  text-align: right;
  padding: 0% 5% 0% 5%;
`;
const CarouseAlbum = styled(Carousel)`
  width: 90%;
  margin: 0 auto;
`;
const AlbumDiv = styled.div`
  width: 50%;
  height: 218px;
  margin: 0 auto;
`;
const AlbumImg = styled.img`
  height: 200px;
  margin: 0 auto;
  border-radius: 10px;
  margin-bottom: 5%;
`;
