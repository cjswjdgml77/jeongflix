import { movieRequest } from "@/lib/request";
import { motion } from "framer-motion";
import type { ModalData } from "@/pages/main";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieClips } from "@/hooks/useMovieClips";
import GenreComp, { Genre } from "./GenreComp";
import ModalVideoCard from "./ModalVideoCard";
import Recommendations from "./Recommendations";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";
import { BsCheck2Circle } from "react-icons/bs";
import { useMyList } from "@/hooks/useMyList";
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
export interface SimilarMovies {
  id: number;
  backdrop_path: string;
  poster_path: string;
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
  const {
    data: mylist,
    error,
    isLoading,
    mutate,
  } = useMyList(`/api/mylist/${data.content_id || data.id}`);
  const [content, setContent] = useState<TotalDatas>();
  useEffect(() => {
    async function getData() {
      if (!data) return;
      const url = [
        movieRequest.getMovieWithVideo(data.content_id || data.id),
        movieRequest.getMovieDetails(data.content_id || data.id),
        movieRequest.getMoviesWithRecommendations(data.content_id || data.id),
        movieRequest.getMoviesWithSimilar(data.content_id || data.id),
      ];
      Promise.all(url.map((requestUrl) => axios.get(requestUrl))).then(
        ([
          { data: movie },
          { data: detail },
          { data: recommendations },
          { data: similars },
        ]) => {
          setContent({ detail, videos: movie, recommendations, similars });
        }
      );
    }
    getData();
  }, [data]);
  const addListHandler = async (data: SimilarMovies) => {
    try {
      const response = await fetch("/api/mylist", {
        method: "POST",
        body: JSON.stringify({ data }),
      });
      mutate();
    } catch (e) {}
  };
  return data === null ? (
    <></>
  ) : (
    <div
      className="fixed w-[100%] h-[100vh] top-0 left-0 right-0 bottom-0 bg-black/50 cursor-pointer overflow-x-hidden z-20"
      onClick={(e) => {
        openModal(null);
      }}
    >
      <motion.div
        layoutId={`modal-${data.key || data.id}`}
        className="z-[10] w-full max-w-[800px]  h-[60vh] sm:h-[100vh] mx-auto bg-gray-900 rounded-t-md top-0 overflow-y-scroll  hidden-scrollbar relative cursor-default"
        transition={{ duration: 0.5 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <AiOutlineCloseCircle
          className="absolute top-5 right-5 text-gray-300 text-4xl cursor-pointer"
          onClick={() => {
            console.log("clicked");
            openModal(null);
          }}
        />
        <Image
          src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          width={600}
          alt={data.title || data.name}
          height={300}
          className="w-full rounded-t-md"
        />
        <div className="flex flex-col px-[var(--padding-m)] py-[var(--padding-l)]">
          <div className="w-full text-right">
            {mylist && mylist.mylist.length > 0 ? (
              <BsCheck2Circle className="inline-block text-4xl mr-2" />
            ) : (
              <button
                className="w-auto bg-slate-300/20 px-4 py-2 rounded-md"
                onClick={() => {
                  addListHandler(data);
                }}
              >
                <CiSquarePlus className="inline-block text-4xl mr-2" />
                <span>Add MyList</span>
              </button>
            )}
          </div>
          <div className="flex justify-between items-center flex-col md:flex-row">
            <p className="text-4xl pb-4">{content?.detail.title}</p>
            {content && <GenreComp genres={content.detail.genres} />}
          </div>
          {content && (
            <p className="text-gray-400">{content.detail.overview}</p>
          )}
        </div>

        <div className="z-[10] w-full max-w-[800px] mx-auto bg-gray-900 cursor-default flex flex-col px-[var(--padding-m)]">
          <div className="pb-4 sm:pb-8">
            <p className="text-2xl pb-4 sm:pb-8">Clips</p>
            {content && <ModalVideoCard clips={content.videos.results} />}
          </div>
          <div className="pb-4 sm:pb-8">
            <p className="text-2xl pb-4 sm:pb-8">Recommendations</p>
            {content && (
              <Recommendations
                recommendations={content.recommendations.results}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoModal;
