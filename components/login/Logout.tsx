import React from "react";
import { signOut } from "next-auth/react";
type Props = {};

const Logout = (props: Props) => {
  return (
    <>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
