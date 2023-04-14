import Link from "next/link";

type Props = {};

const Login = (props: Props) => {
  return (
    <Link href="/auth/signin" className="cursor-pointer">
      Login
    </Link>
  );
};

export default Login;
