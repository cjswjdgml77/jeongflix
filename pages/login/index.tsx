import React from "react";
import Link from "next/link";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
type Props = {};

const index = (props: Props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <form action=""></form>
      <button
        onClick={() => {
          signIn();
        }}
      >
        SignIn
      </button>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
      <Link href="login/register">Register</Link>
    </div>
  );
};

export default index;
