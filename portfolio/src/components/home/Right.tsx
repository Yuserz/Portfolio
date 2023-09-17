import * as React from "react";

import profile from "../../assets/images/profile.svg";

export default function Right() {
  return (
    <div className="flex justify-end">
      <img src={profile}></img>
    </div>
  );
}
