import { motion } from "framer-motion";
import type { ModalData } from "@/pages/main";
import Image from "next/image";
import React from "react";

type Props = {
  data: any;
  openModal: (data: ModalData) => void;
};

const VideoCard = ({ data, openModal }: Props) => {
  return (
    <>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-w-[28.66%] md:min-w-[21.25%] lg:min-w-[16.8%] rounded-md"
        layout
        layoutId={`modal-${data.id}`}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => {
          openModal(data);
        }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          alt={data.title}
          className="w-full rounded-md"
          width={300}
          height={200}
        />
      </motion.button>
    </>
  );
};

export default VideoCard;
