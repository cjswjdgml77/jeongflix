import type { AxiosError } from "axios";
import React from "react";

type Props = {
  error: AxiosError;
};

const ErrorPage = ({ error }: Props) => {
  if (!error) return null;
  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
      {error.message}
    </div>
  );
};

export default ErrorPage;
