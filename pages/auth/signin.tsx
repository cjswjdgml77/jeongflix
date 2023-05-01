import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ReactElement } from "react";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const iconMap = (name: string): ReactElement => {
    const icons: { [key: string]: ReactElement } = {
      GitHub: <FaGithub />,
      Google: <FcGoogle />,
    };
    return icons[name];
  };
  return (
    <>
      <div className="w-full h-[100vh] flex items-center">
        <div className="m-auto top-0 left-0 bottom-0 right-0 max-w-[500px] text-center">
          <p className="text-4xl pb-6">Log in to Jeongflix</p>
          {Object.values(providers).map((provider) => (
            <div
              key={provider.name}
              className="flex justify-center items-center gap-2 text-xl bg-slate-400/20 rounded-md mt-5 py-5"
            >
              {iconMap(provider.name)}
              <button
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: "https://google.com",
                  })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
