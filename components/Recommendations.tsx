import Image from "next/image";
import { BasicDatas } from "@/hooks/useMovieLists";
type Props = {
  recommendations: BasicDatas[];
};

const Recommendations = ({ recommendations }: Props) => {
  const fixedData = recommendations
    .filter((data) => data.poster_path !== null)
    .slice(0, 6);
  return (
    <div className="grid grid-cols-3 gap-y-10">
      {fixedData.map((recomm) => (
        <div key={recomm.id} className="flex justify-center">
          <Image
            alt={recomm.title}
            src={`https://image.tmdb.org/t/p/original${recomm.poster_path}`}
            width={200}
            height={300}
          />
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
