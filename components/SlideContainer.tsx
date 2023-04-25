import { useClientData } from "@/hooks/useClientData";
import Image from "next/image";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import type { PopularMovie } from "@/hooks/usePopularMovies";
import type { ModalData } from "@/pages/main";
import { AxiosError } from "axios";
import SlideView from "./SlideView";
type Props = {
  dataUrl: string;
  title: string;
  openModal: (data: ModalData | null) => void;
};
export interface BasicDatas {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  name: string;
}

const SlideContainer = <T,>({
  title,
  dataUrl,
  openModal,
}: {
  title: string;
  dataUrl: string;
  openModal: (data: ModalData | null) => void;
}) => {
  const {
    data,
    error,
  }: { data: { results: BasicDatas[] }; error: AxiosError } =
    useClientData(dataUrl);

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl px-[var(--padding-s)] sm:px-[var(--padding-l)] py-4">
        {title}
      </h3>
      {data && (
        <SlideView<BasicDatas> data={data.results} openModal={openModal} />
      )}
    </div>
  );
};

export default SlideContainer;
