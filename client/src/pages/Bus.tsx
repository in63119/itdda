import react from "react";
import styled from "styled-components";
export default function Bus() {
  const PREVIOUS_PAGE = -1;
  return (
    <Wrap>
      <div>
        <Loading id="loading" src="../images/outOfService.png" />
        <ButtonWrapper>
          <CancleButton onClick={() => history.go(PREVIOUS_PAGE)}>
            홈으로
          </CancleButton>
        </ButtonWrapper>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  place-content: center;
`;
const CancleButton = styled.span`
  ${({ theme }) => theme.common.defaultButton}
  width: 100%;
`;
const ButtonWrapper = styled.div`
  text-align: center;
`;
const Loading = styled.img`
  width: 40vw;
`;
