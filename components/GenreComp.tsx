type Props = {
  genres: Genre[];
};
export interface Genre {
  id: number;
  name: string;
}
const GenreComp = ({ genres }: Props) => {
  return (
    <div className="flex items-center sm:pb-5">
      <p className="pr-1 whitespace-nowrap">Genre : </p>
      <div className="max-w-[12rem] flex flex-wrap">
        {genres.map((genre, idx) => (
          <p key={genre.id} className="text-xs text-gray-500">
            {genre.name}
            {idx === genres.length - 1 ? "" : ","}
          </p>
        ))}
      </div>
    </div>
  );
};

export default GenreComp;
