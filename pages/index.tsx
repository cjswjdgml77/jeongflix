import HomeNetflix from "@/components/HomeNetflix";
import usePopularMovies, { PopularMovies } from "@/hooks/usePopularMovies";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const data =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await usePopularMovies();
  return { props: { data } };
};

type Props = {
  data: PopularMovies[];
};
export default function Home({ data }: Props) {
  return <HomeNetflix data={data} />;
}
