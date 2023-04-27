import type { MovieClips } from "@/hooks/useMovieClips";
import YouTube from "react-youtube";

type Props = {
  clips: MovieClips[];
};

const ModalVideoCard = ({ clips }: Props) => {
  const clipsEdited = clips.slice(0, 3);
  const opts = {
    width: 600,
    height: 300,
  };
  return (
    <div className="flex flex-col gap-10">
      {clipsEdited.map((clip) => (
        <YouTube
          key={clip.id}
          videoId={clip.key}
          iframeClassName="max-w-[600px] w-[100%] "
          className="flex justify-center w-full text-center"
          opts={opts}
        ></YouTube>
      ))}
    </div>
  );
};

export default ModalVideoCard;
