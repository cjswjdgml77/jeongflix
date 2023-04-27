import { PropsWithChildren } from "react";
import Navbar from "./Navbar";

type Props = {};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
