import React from 'react';
import styled from 'styled-components';
export default function ChildrenState() {
  return (
    <Wrap>
      <ContentCard>
        <Title>원아상태관리</Title>
      </ContentCard>
    </Wrap>
  );
}
const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const ContentCard = styled.div`
  ${({ theme }) => theme.common.contentCardDiv}
`;
const Title = styled.div`
  ${({ theme }) => theme.common.contentTitle}
`;
