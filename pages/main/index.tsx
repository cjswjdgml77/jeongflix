import useTrendingMovies from "@/hooks/useTrendingMovies";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { TrendingMovie } from "@/hooks/useTrendingMovies";
import Header from "@/components/Header";
import { movieRequest } from "@/lib/request";
import SlideContainer from "@/components/SlideContainer";
import VideoModal from "@/components/VideoModal";
import { getSession, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const session = await getSession({ req });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = await useTrendingMovies();
  return {
    props: { data, session: await getServerSession(req, res, authOptions) },
  };
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
  const { data: session } = useSession();
  useEffect(() => {
    const randomMovie = data[Math.floor(Math.random() * data.length)];
    setMovie(randomMovie);
    setInitial(true);
  }, []);

  if (!session) return <p>Access Denied</p>;
  return (
    <div className="">
      <main className="overflow-hidden pb-11 flex flex-col gap-10">
        {initial && movie && <Header movie={movie} />}
        <SlideContainer
          title="You may also like"
          dataUrl={movieRequest.getMoviesWithPopular}
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
