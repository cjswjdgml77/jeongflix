import React from "react";
import type { ModalData } from "@/pages/main";
import SlideView from "./SlideView";
import { useMovieLists } from "@/hooks/useMovieLists";
type Props = {
  dataUrl: string;
  title: string;
  openModal: (data: ModalData | null) => void;
};

const SlideContainer = ({ title, dataUrl, openModal }: Props) => {
  const { data, error, isLoading } = useMovieLists(dataUrl);
  if (error) return null;
  return (
    <div className="flex flex-col">
      <h3 className="text-2xl px-[var(--padding-s)] sm:px-[var(--padding-l)] py-5 md:py-7 lg:py-9">
        {title}
      </h3>
      {data && <SlideView data={data.results} openModal={openModal} />}
    </div>
  );
};

export default SlideContainer;
