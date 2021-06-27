import React, { useState } from "react";

interface Props {
  socialSelection: boolean;
  handleSocialSelection: any;
}
function SocialSelection({ socialSelection, handleSocialSelection }: Props) {
  if (socialSelection) {
    return (
      <div>
        <button onClick={() => handleSocialSelection()}>일반 회원가입</button>
        <button>Kakao 회원가입</button>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default SocialSelection;
