import type { MovieClips } from "@/hooks/useMovieClips";
import YouTube from "react-youtube";
import React from "react";

type Props = {
  clips: MovieClips[];
};

const ModalVideoCard = ({ clips }: Props) => {
  const clipsEdited = clips.slice(0, 5);
  const opts = {
    width: 300,
    height: 200,
  };
  return (
    <div className="flex flex-col gap-10">
      {clipsEdited.map((clip) => (
        <YouTube
          key={clip.id}
          videoId={clip.key}
          className="w-full"
          opts={opts}
        ></YouTube>
      ))}
    </div>
  );
};

export default ModalVideoCard;
