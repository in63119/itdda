import styled from 'styled-components';
export default function Program() {
  return (
    <Wrap>
      <Loading id="loading" src="../images/outOfService.png" />
    </Wrap>
  );
}

const Loading = styled.img`
  width: 40vw;
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  place-content: center;
`;
