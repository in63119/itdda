import { time } from 'console';

//시간표의 시간과 현재 시간을 비교해서 시간표 progess bar의 %를 반환
export const findStepEducation = (currentTime: string, totalTimetable: any) => {
  // console.log(totalTimetable, '타임테이블');
  let currentStep = 0;
  if (
    totalTimetable === null ||
    totalTimetable === undefined ||
    totalTimetable === 'undefinded'
  ) {
    return;
  }
  const data = totalTimetable
    .replace(/\s/g, '')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .replace(/\{/g, '')
    .replace(/\}/g, '')
    .replace(/\"/g, '')
    .replace(/\'/g, '')
    .replace(/\},{/g, '}|{')
    .replace(/step:/g, '')
    .replace(/time:/g, '')
    .replace(/contents:/g, '')
    .split(',');

  const newArr = [];
  for (let i = 0; i < data.length; i += 3) {
    newArr.push(
      Object.assign(
        {},
        { step: data[i], time: data[i + 1], contents: data[i + 2] },
      ),
    );
  }
  const calculatedCurrentTime = Number(currentTime);
  for (const element of newArr) {
    const fristTime = element.time.split('~')[0];
    const secondTime = element.time.split('~')[1];
    const startTime = Number(fristTime.replace(':', ''));
    const endTime = Number(secondTime.replace(':', ''));

    // console.log(startTime, ' 시작', endTime, '끝');
    // console.log(calculatedCurrentTime, '현재');
    if (
      calculatedCurrentTime >= startTime &&
      calculatedCurrentTime <= endTime
    ) {
      currentStep = (Number(element.step) / newArr.length) * 100;
      // console.log(currentStep, '현재스탭');

      return {
        step: currentStep,
        timetable: element.time,
        currentEducation: element.contents,
      };
    }
  }
  return;
};
// 서버로 부터 받은 문자열의 시간표를 배열로 변경
export function ChangeToArray(timetable: string) {
  if (timetable === null || timetable === undefined) {
    return;
  }
  // console.log(timetable, '타임테이블 ');
  const data = timetable
    .replace(/\s/g, '')
    .replace(/\[/g, '')
    .replace(/\]/g, '')
    .replace(/\{/g, '')
    .replace(/\"/g, '')
    .replace(/\'/g, '')
    .replace(/\}/g, '')
    .replace(/\},{/g, '}|{')
    .replace(/step:/g, '')
    .replace(/time:/g, '')
    .replace(/contents:/g, '')
    .split(',');
  const arr = [];
  for (let i = 0; i < data.length; i += 3) {
    arr.push(
      Object.assign(
        {},
        { step: data[i], time: data[i + 1], contents: data[i + 2] },
      ),
    );
  }
  return arr;
}
