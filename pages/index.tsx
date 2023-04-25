import HomeNetflix from "@/components/HomeNetflix";
import usePopularMovies, { PopularMovie } from "@/hooks/usePopularMovies";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const data =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await usePopularMovies();
  return { props: { data } };
};

type Props = {
  data: PopularMovie[];
};
export default function Home({ data }: Props) {
  return <HomeNetflix data={data} />;
}
