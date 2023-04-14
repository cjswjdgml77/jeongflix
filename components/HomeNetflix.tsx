import React, { CSSProperties, useRef, useState } from "react";
import { PopularMovies } from "@/hooks/usePopularMovies";
import MovieCard from "./MovieCard";
import Image from "next/image";
import logo from "../public/logo.png";
type Props = {
  data: PopularMovies[];
};

const HomeNetflix = ({ data }: Props) => {
  const [mousePos, setMousePos] = useState<number>(0);
  const ref = useRef<HTMLUListElement>(null);
  const mouseDownHandler = (e: React.MouseEvent) => {
    setMousePos(e.clientX);
  };
  const mouseLeaveHadler = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const movement = e.clientX - mousePos;
    const differ = 50;
    const rotate = Number(ref.current.style.getPropertyValue("--rotate"));
    if (movement > 0 && movement > differ) {
      console.log("right move");
      ref.current.style.transform = `rotateY(${rotate + 18}deg)`;
      ref.current.style.setProperty("--rotate", (rotate + 18).toString());
    } else if (movement < 0 && movement < differ * -1) {
      ref.current.style.transform = `rotateY(${rotate - 18}deg)`;
      ref.current.style.setProperty("--rotate", (rotate - 18).toString());
      console.log("left move");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] overflow-hidden absolute top-0 left-0">
      <div
        className="flex justify-center items-center snap-div"
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseLeaveHadler}
      >
        <ul
          className="flex max-w-[70vw] snap-ul transition-transform duration-500"
          ref={ref}
          style={{ "--rotate": 0 } as CSSProperties}
        >
          {data.map((movie, idx) => (
            <MovieCard key={movie.id} movie={movie} rotateY={0 + idx * 18} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeNetflix;
