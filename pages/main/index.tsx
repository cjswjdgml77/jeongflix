import useTrendingMovies from "@/hooks/useTrendingMovies";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { TrendingMovie } from "@/hooks/useTrendingMovies";
import Header from "@/components/Header";
import { movieRequest } from "@/lib/request";
import SlideContainer from "@/components/SlideContainer";
import VideoModal from "@/components/VideoModal";
import type { PopularMovie } from "@/hooks/usePopularMovies";
export const getServerSideProps: GetServerSideProps = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = await useTrendingMovies();
  return { props: { data } };
};
type Props = {
  data: TrendingMovie[];
};

export interface ModalData {
  id: number;
  backdrop_path: number;
  title?: string;
  name?: string;
}
const Home = ({ data }: Props) => {
  const [initial, setInitial] = useState(false);
  const [movie, setMovie] = useState<TrendingMovie>();
  const [modal, setModal] = useState<ModalData | null>(null);
  useEffect(() => {
    const randomMovie = data[Math.floor(Math.random() * data.length)];
    setMovie(randomMovie);
    setInitial(true);
  }, []);
  return (
    <div className="">
      <main className="overflow-x-hidden pb-11 flex flex-col gap-10">
        {initial && movie && <Header movie={movie} />}
        <SlideContainer
          title="Popuplar"
          dataUrl={movieRequest.getMoviesWithPopular}
          openModal={setModal}
        />
        <SlideContainer
          title="Upcoming"
          dataUrl={movieRequest.getMoviesWithUpcoming}
          openModal={setModal}
        />
        <SlideContainer
          title="Now Playing"
          dataUrl={movieRequest.getMoviesWithNowPlaying}
          openModal={setModal}
        />
        <SlideContainer
          title="Top Rating"
          dataUrl={movieRequest.getMoviesWithTopRates}
          openModal={setModal}
        />
        <VideoModal data={modal} openModal={setModal} />
        {/* <VideoModal id={modal} openModal={setModal} /> */}
      </main>
    </div>
  );
};

export default Home;
