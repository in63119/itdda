import { firestore } from "./firebase";
//원장이 기관을 생성했을때 firebase에 기관 등록
export function handleAddInstitution(institutionId: string) {
  firestore
    .collection("institution")
    .doc(String(institutionId))
    .set({})
    // .then(() => {
    //   console.log('');
    // })
    .catch((error) => {
      alert("오류가 발생했습니다.");
    });
}
//선생님이 미승인된 원아를 승인완료 했을경우 마다 실행됨
//추가될 원아의 아이디가 존재 할 경우 덮어씌워짐.
export function handleAddChild(institutionId: string, childId: string) {
  firestore
    .collection("institution")
    .doc(String(institutionId))
    .collection("children")
    .doc(String(childId))
    .set({
      isCheck: false,
      isEat: false,
      isOk: false,
      please: false,
      isSleep: false,
    })
    .then(() => {
      // handleCheckData(institutionId, childId);
    })
    .catch(() => {
      alert("오류가 발생했습니다.");
    });
}
//실시간 데이터 베이스에서 원아 삭제
export function handleDeleteChild(institutionId: string, childId: string) {
  firestore
    .collection("institution")
    .doc(institutionId)
    .collection("children")
    .doc(childId)
    .delete()
    // .then(() => {
    //   console.log('');
    // })
    .catch(() => {
      alert("오류가 발생했습니다.");
    });
}
// function handleCheckCollection(institutionId: string) {
//   firestore
//     .collection('institution')
//     .doc(String(institutionId))
//     .get()
//     .then((doc) => {
//       if (doc.data()) {
//         // handleRealTimeState(institutionId);
//         return;
//       }
//       //아이가 승인이 되지 않았을때
//       alert('해당기관이 없습니다');
//     });
// }

export function handleCheckData(institutionId: string, childId: string) {
  firestore
    .collection("institution")
    .doc(String(institutionId))
    .collection("children")
    .doc(String(childId))
    .get()
    .then((doc) => {
      // console.log(institutionId, '기관', childId, '아이');
      // 등록한 아이가 승인이 완료 되었을때
      if (doc.data()) {
        return console.log(doc.id, " ", doc.data);
      }
      // console.log('기관', institutionId, ' 의', childId, ' =아이');
      //아이가 승인이 되지 않았을때
      alert("원아의 정보가 없습니다");
    });
}
export function handleGetAllChildByInstitution(institutionId: any) {
  firestore
    .collection("institution")
    .doc(String(institutionId))
    .collection("children")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, ' => ', doc.data());
      });
    });
}

export function InsertChildStat(institutionId: string, childId: string) {
  const state = firestore
    .collection("institution")
    .doc(String(institutionId))
    .collection("children")
    .doc(String(childId))
    .get()
    .then((doc) => {
      // conchildrenListsole.log(institutionId, '기관', childId, '아이');
      // 등록한 아이가 승인이 완료 되었을때
      if (doc.data()) {
        return doc.data();
      }
      // console.log('기관', institutionId, ' 의', childId, ' =아이');
      //아이가 승인이 되지 않았을때
      alert("원아의 정보가 없습니다");
    });
  return state;
}

export function updateChildState(
  institutionId: string,
  childId: string,
  stateName: string,
  state: boolean,
) {
  firestore
    .collection("institution")
    .doc(String(institutionId))
    .collection("children")
    .doc(String(childId))
    .update({
      [stateName]: !state,
    });
}
