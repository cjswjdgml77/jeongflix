import { movieRequest } from "@/lib/request";
import { motion } from "framer-motion";
import type { ModalData } from "@/pages/main";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieClips } from "@/hooks/useMovieClips";
import GenreComp, { Genre } from "./GenreComp";
import ModalVideoCard from "./ModalVideoCard";

type Props = {
  data: any;
  openModal: (data: ModalData | null) => void;
};

interface Details {
  id: number;
  title?: string;
  name?: string;
  release_date: string;
  genres: Genre[];
  overview: string;
}
interface SimilarMovies {
  id: number;
  backdrop_path: string;
  title: string;
}
interface TotalDatas {
  detail: Details;
  videos: {
    id: number;
    results: MovieClips[];
  };
  recommendations: {
    results: SimilarMovies[];
  };
  similars: {
    results: SimilarMovies[];
  };
}
const VideoModal = ({ data, openModal }: Props) => {
  const [content, setContent] = useState<TotalDatas>();

  useEffect(() => {
    async function getData() {
      if (!data) return;
      const url = [
        movieRequest.getMovieWithVideo(data.id),
        movieRequest.getMovieDetails(data.id),
        movieRequest.getMoviesWithRecommendations(data.id),
        movieRequest.getMoviesWithSimilar(data.id),
      ];
      Promise.all(url.map((requestUrl) => axios.get(requestUrl))).then(
        ([
          { data: movie },
          { data: detail },
          { data: recommendations },
          { data: similars },
        ]) => {
          console.log(movie);
          setTimeout(() => {
            setContent({ detail, videos: movie, recommendations, similars });
          }, 50);
        }
      );
    }
    getData();
  }, [data]);
  return data === null ? (
    <></>
  ) : (
    <div
      className="fixed w-[100%] h-[100vh] top-0 left-0 right-0 bottom-0 bg-black/50 cursor-pointer overflow-x-hidden noselect"
      onClick={(e) => {
        openModal(null);
      }}
    >
      <motion.div
        layoutId={`modal-${data.id}`}
        className="z-[10] w-full max-w-[800px] h-[100vh] mx-auto bg-gray-900 cursor-default rounded-t-md top-0 overflow-y-scroll  hidden-scrollbar"
        transition={{ duration: 0.5 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          width={600}
          alt={data.title || data.name}
          height={300}
          className="w-full rounded-t-md"
        />
        <div className="flex flex-col px-[var(--padding-m)] py-[var(--padding-l)]">
          <div className="flex justify-between items-center flex-col md:flex-row">
            <p className="text-4xl pb-4">{content?.detail.title}</p>
            {content && <GenreComp genres={content.detail.genres} />}
          </div>
          {content && (
            <p className="text-gray-400">{content.detail.overview}</p>
          )}
        </div>
        <div>
          <p>Recommendations</p>
        </div>
        <div className="z-[10] w-full max-w-[800px] mx-auto bg-gray-900 cursor-default flex flex-col px-[var(--padding-m)]">
          <p className="text-2xl">Clips</p>
          {content && <ModalVideoCard clips={content.videos.results} />}
        </div>
      </motion.div>
    </div>
  );
};

export default VideoModal;
