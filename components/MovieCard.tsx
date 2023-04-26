import { motion } from "framer-motion";
import Image from "next/image";
import YouTube from "react-youtube";
import React, { CSSProperties, useRef, useState } from "react";
import { PopularMovie } from "@/hooks/usePopularMovies";
import useMovieClips, { MovieClips } from "@/hooks/useMovieClips";
type Props = {
  movie: PopularMovie;
  rotateY: number;
};

const MovieCard = ({ movie, rotateY }: Props) => {
  const [showVideo, setShowVideo] = useState<string>("");
  const ref = useRef<HTMLLIElement>(null);

  const imageClickHandler = async (movieId: number) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const data: MovieClips[] = await useMovieClips(movieId);

    const mouseLeaveHander = () => {
      setShowVideo("");
      ref.current?.removeEventListener("mouseleave", mouseLeaveHander);
    };
    ref.current?.addEventListener("mouseleave", mouseLeaveHander);
    setShowVideo(data[Math.floor(Math.random() * data.length)].key);
  };
  const opts = {
    height: "250",
    width: "200",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <>
      <motion.li
        key={movie.id}
        className={`snap-start snap-li transition-transform duration-300`}
        // whileHover={{
        //   transform: `rotateY(${rotateY}deg) translateZ(1300px) rotateY(${180}deg) `,
        // }}
        style={{ "--rotateY": rotateY } as CSSProperties}
        onClick={() => {
          imageClickHandler(movie.id);
        }}
        ref={ref}
      >
        <Image
          src={"https://image.tmdb.org/t/p/original" + movie.poster_path}
          className={`min-w-[100%] min-h-[100%] opacity-1 object-fill ${
            showVideo && "opacity-0"
          }`}
          alt={movie.title}
          width={200}
          height={250}
          priority
        />
        <YouTube
          videoId={showVideo}
          opts={opts}
          className={`absolute top-0 z-[-1] left-0 flex items-center h-full bg-black ${
            showVideo && "z-[10]"
          }`}
          iframeClassName="w-[250px]"
        />
      </motion.li>
    </>
  );
};

export default MovieCard;
