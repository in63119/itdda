import React from "react";

function UserInfo() {
  return (
    <div>
      <div>
        <span>이름 : </span>
        <input type="text" placeholder="이름"></input>
      </div>
      <div>
        <span>이메일 : </span>
        <input type="email" placeholder="이메일"></input>
      </div>
    </div>
  );
}

export default UserInfo;
