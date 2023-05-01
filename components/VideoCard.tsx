import { motion } from "framer-motion";
import type { ModalData } from "@/pages/main";
import Image from "next/image";

type Props = {
  data: any;
  openModal: (data: ModalData) => void;
};

const VideoCard = ({ data, openModal }: Props) => {
  return (
    <>
      <motion.button
        initial={{ opacity: 0, x: 100, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        className="min-w-[28.66%] max-w-[28.66%] md:min-w-[21.25%] md:max-w-[21.25%] lg:min-w-[16.8%] lg:max-w-[16.8%] rounded-md"
        layout
        layoutId={`modal-${data.key || data.id}`}
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
          priority
        />
      </motion.button>
    </>
  );
};

export default VideoCard;
