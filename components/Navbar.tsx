import Image from "next/image";
import logo from "../public/logo.png";
import { signIn, signOut, useSession } from "next-auth/react";
import Login from "./login/Login";
import Logout from "./login/Logout";
import Link from "next/link";

type Props = {};
const Navbar = (props: Props) => {
  const { data: session, status } = useSession();
  return (
    <div className="flex fixed w-full top-0 justify-between sm:px-[var(--padding-l)] px-[var(--padding-s)] py-[var(--padding-s)] z-10">
      <Link href={`${session ? "/main" : "/"} `}>
        <Image src={logo} alt="my-logo.png" width={100} />
      </Link>
      <nav></nav>
      {status !== "loading" ? session ? <Logout /> : <Login /> : ""}
    </div>
  );
};

export default Navbar;
