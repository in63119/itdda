import react from 'react';
import styled from 'styled-components';
interface propType {
  timetable: any;
  type: string;
  handleUpdateTimetable: any;
}
export default function TimetableCard({
  timetable,
  type,
  handleUpdateTimetable,
}: propType) {
  // input handler
  const handleOnChange = (event: any, step: any) => {
    const { name, value, id } = event.target;
    handleUpdateTimetable(step, name, value);
  };
  return (
    <>
      <CardWrapper>
        <Container>
          <NumberWrapper>
            <Number>No.{timetable.step}</Number>
          </NumberWrapper>
          <TimeWrapper id={timetable.step}>
            <Time>시간 :</Time>
            {type === 'read' ? (
              <span>{timetable.time}</span>
            ) : (
              <>
                <InputTime
                  name="time"
                  onChange={(e) => {
                    handleOnChange(e, timetable.step);
                  }}
                  placeholder={timetable.time}
                ></InputTime>
              </>
            )}
          </TimeWrapper>
          <ContentsWrapper>
            <Contents>내용 :</Contents>
            {type === 'read' ? (
              <ContentsText>{timetable.contents}</ContentsText>
            ) : (
              <InputContents
                name="contents"
                onChange={(e) => {
                  handleOnChange(e, timetable.step);
                }}
                placeholder={timetable.contents}
              ></InputContents>
            )}
          </ContentsWrapper>
        </Container>
      </CardWrapper>
    </>
  );
}
const Container = styled.div`
  display: flex;
  width: 100%;
  // text-align: center;
`;
const NumberWrapper = styled.span`
  display: flex;
  flex: 0.2 auto;
  font-size: 1rem;
`;
const TimeWrapper = styled.span`
  display: flex;
  flex: 1 auto;
`;
const ContentsWrapper = styled.span`
  display: flex;
  flex: 2 auto;
  @font-face {
    font-family: 'NanumSquareWeb';
    src: url('../fonts/NanumSquareOTFLight.otf');
  }
  font-family: 'NanumSquareWeb';
`;
const Number = styled.span`
  font-size: 10px;
  flex: 1 auto;
`;
const InputNumber = styled.input`
  ${({ theme }) => theme.common.defaultInput}
  flex: 1 auto;
`;
const Time = styled.span`
  text-align: end;
  align-self: center;
  width: 3rem;
  padding-right: 3%;
  flex: 1.3 auto;
`;
const InputTime = styled.input`
  width: 7rem;
  ${({ theme }) => theme.common.defaultInput}
`;
const Contents = styled.span`
  flex: 1 auto;
  width: 5rem;
  align-self: center;

  text-align: end;
  padding-right: 3%;
`;
const InputContents = styled.input`
  ${({ theme }) => theme.common.defaultInput}
  width: 100%;

  flex: 1 auto;
`;

const CardWrapper = styled.div`
  ${({ theme }) => theme.common.defaultCardDiv}
  width:95%;
  height: auto;
  margin: 0 auto;
  margin-top: 2%;
  margin-bottom: 2%;
  padding: 2%;
  display: flex;
`;
const ContentsText = styled.span`
  flex: 1 auto;
`;
