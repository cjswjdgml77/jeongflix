import { CSSProperties, useRef, useState } from "react";
import { PopularMovie } from "@/hooks/usePopularMovies";
import MovieCard from "./MovieCard";
import Image from "next/image";
import logo from "../public/logo.png";
type Props = {
  data: PopularMovie[];
};

const HomeNetflix = ({ data }: Props) => {
  const [mousePos, setMousePos] = useState<number>(0);
  const [touchPos, setTouchPos] = useState<number[] | []>([]);
  const ref = useRef<HTMLUListElement>(null);
  const mouseDownHandler = (e: React.MouseEvent) => {
    setMousePos(e.clientX);
  };
  const touchStartHandler = (e: React.TouchEvent) => {
    setTouchPos([e.touches[0].clientX]);
  };
  const mouseLeaveHandler = (e: React.MouseEvent) => {
    moveCard(mousePos, e.clientX);
  };
  const moveCard = (previous: number, clientX: number) => {
    if (!ref.current) return;
    const movement = clientX - previous;
    const differ = 50;
    const rotate = Number(ref.current.style.getPropertyValue("--rotate"));
    if (movement > 0 && movement > differ) {
      ref.current.style.transform = `rotateY(${rotate + 18}deg)`;
      ref.current.style.setProperty("--rotate", (rotate + 18).toString());
    } else if (movement < 0 && movement < differ * -1) {
      ref.current.style.transform = `rotateY(${rotate - 18}deg)`;
      ref.current.style.setProperty("--rotate", (rotate - 18).toString());
    }
  };
  const touchMoveHandler = (e: React.TouchEvent) => {
    setTouchPos([...touchPos, e.touches[0].clientX]);
  };
  const touchEndHandler = (e: React.TouchEvent) => {
    moveCard(touchPos[0], touchPos[touchPos.length - 1]);
    setTouchPos([]);
    //moveCard(e.touches[0].clientX);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] overflow-hidden absolute top-0 left-0">
      <div
        className="flex justify-center items-center snap-div"
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseLeaveHandler}
        onTouchStart={touchStartHandler}
        onTouchEnd={touchEndHandler}
        onTouchMove={touchMoveHandler}
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
