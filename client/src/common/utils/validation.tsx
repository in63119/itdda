export function isIdCheck(value: string) {
  const check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return check.test(value);
}

export function isPasswordCorrect(value: string, compare: string) {
  return value === compare;
}

export function isPasswordCheck(value: string) {
  const check = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

  return check.test(value);
}

export function isPhoneCheck(value: string) {
  const check = /^[0-9]{3}[0-9]{4}[0-9]{4}/;
  const check2 = /^[0-9]{3}-[0-9]{4}-[0-9]{4}/;
  return check.test(value) || check2.test(value);
}

export function isNameCHeck(value: string) {
  const check = /^[가-힣]{2,4}$/;
  return check.test(value);
}

// export function isInstiCheck(value: string) {
//   const check = /^[가-힣]$/;
//   return check.test(value);
// }
