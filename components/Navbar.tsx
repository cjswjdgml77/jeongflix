import Image from "next/image";
import logo from "../public/logo.png";
import { signIn, signOut, useSession } from "next-auth/react";
import Login from "./login/Login";
import Logout from "./login/Logout";

type Props = {};
const Navbar = (props: Props) => {
  const { data: session, status } = useSession();
  return (
    <div className="flex sticky justify-between sm:px-[var(--padding-l)] px-[var(--padding-s)] py-[var(--padding-m)] z-10">
      <Image src={logo} alt="my-logo.png" width={100} />
      <nav></nav>
      {status !== "loading" ? session ? <Logout /> : <Login /> : ""}
    </div>
  );
};

export default Navbar;
