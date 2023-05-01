import { motion } from "framer-motion";
import { RxInfoCircled } from "react-icons/rx";
import { AiFillStar } from "react-icons/ai";
import { TrendingMovie } from "@/hooks/useTrendingMovies";
import type { ModalData } from "@/pages/main";
type Props = {
  movie: TrendingMovie;
  openModal: (data: ModalData) => void;
};

const Header = ({ movie, openModal }: Props) => {
  return (
    <>
      <header
        className="flex flex-col w-full md:h-[46vw] py-6 pt-[4rem] bg-cover top-0 px-[var(--padding-s)] sm:px-[var(--padding-l)] justify-around bg-no-repeat"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <h1 className="">NO.1 Streaming</h1>
        <div className="h-auto flex flex-col">
          <motion.div
            className="flex flex-col origin-bottom-left"
            initial={{ scale: 1 }}
            animate={{ scale: 0.5 }}
            transition={{ delay: 4, duration: 2 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-8xl py-10">
              {movie.title || movie.name}
            </h2>
            <motion.p
              className={`max-w-3xl hidden lg:block pb-6`}
              initial={{ opacity: 1, height: "100%" }}
              animate={{ opacity: 0, height: "50%" }}
              transition={{ delay: 4, duration: 1 }}
            >
              {movie.overview}
            </motion.p>
          </motion.div>
          <div className="flex items-center gap-5">
            <motion.button
              className="flex items-center 2xl sm:text-3xl gap-2 bg-slate-500 bg-opacity-40 p-3 rounded-md"
              onClick={() => openModal({ ...movie, key: "null" })}
            >
              <RxInfoCircled />
              Info
            </motion.button>
            <motion.p className="flex items-center gap-1 rounded-md p-2 bg-slate-300 bg-opacity-30">
              <AiFillStar fill="#FDCC0D" />
              {movie.vote_average.toFixed(1)}
            </motion.p>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
