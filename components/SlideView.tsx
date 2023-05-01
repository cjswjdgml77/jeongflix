import { CSSProperties, useEffect, useRef } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import VideoCard from "./VideoCard";
import { ModalData } from "@/pages/main";
const SlideView = <T,>({
  data,
  openModal,
}: {
  data: T[];
  openModal: (data: ModalData | null) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);

  const slideMove = (isRight: boolean) => {
    let sm = 3;
    let md = 4;
    let lg = 5;
    const width = window.innerWidth;
    let startMove: number = 0;
    let endMove: number = 0;
    let swap: number = 0;
    let showSlide = 0;
    if (width > 1024) {
      startMove = 16.8 * lg * -1 - 16.8;
      endMove = -11.8;
      showSlide = lg;
    } else if (width > 768) {
      startMove = 21.25 * md * -1 - 21.25;
      endMove = -16.25;
      showSlide = md;
    } else {
      startMove = 28.66 * sm * -1 - 28.66;
      endMove = -23.66;
      showSlide = sm;
    }
    if (isRight) {
      swap = endMove;
      endMove = startMove;
      startMove = swap;
    }
    return { startMove, endMove, showSlide };
  };
  const leftHandler = () => {
    if (!ref.current || !leftRef.current || !rightRef.current) return;
    leftRef.current.disabled = true;
    rightRef.current.disabled = true;
    const div = ref.current;
    const { startMove, endMove, showSlide } = slideMove(false);
    const childs = div.childNodes;
    for (let i = 0; i < showSlide; i++) {
      div.insertBefore(childs[childs.length - 1], childs[0]);
    }
    div.style.setProperty("--start-move", `${startMove}%`);
    div.style.setProperty("--end-move", `${endMove}%`);
    div.classList.add("animating");
    setTimeout(() => {
      div.classList.remove("animating");
      leftRef.current!.disabled = false;
      rightRef.current!.disabled = false;
    }, 500);
  };
  const rightHandler = () => {
    if (!ref.current || !leftRef.current || !rightRef.current) return;
    leftRef.current.disabled = true;
    rightRef.current.disabled = true;
    const div = ref.current;
    const { startMove, endMove, showSlide } = slideMove(true);

    div.style.setProperty("--start-move", `${startMove}%`);
    div.style.setProperty("--end-move", `${endMove}%`);

    div.classList.add("animating");
    setTimeout(() => {
      const childs = div.childNodes;
      for (let i = 0; i < showSlide; i++) {
        div.appendChild(childs[0]);
      }
    }, 500);
    setTimeout(() => {
      div.classList.remove("animating");
      leftRef.current!.disabled = false;
      rightRef.current!.disabled = false;
    }, 500);
  };
  return (
    <div className="flex relative">
      <div
        className={`flex w-full h-full absolute top-0 left-0 justify-between ${
          data.length < 6 && "lg:invisible"
        } ${data.length < 5 && "md:invisible"} ${
          data.length < 4 && "invisible"
        }`}
      >
        <button
          className={`min-w-[5%] bg-black/70 z-20`}
          onClick={() => {
            leftHandler();
            // slideMove(false);
          }}
          ref={leftRef}
        >
          <SlArrowLeft className={`text-lg sm:text-2xl`} />
        </button>
        <button
          className={`min-w-[5%] bg-black/70 z-20 text-right`}
          onClick={() => {
            rightHandler();
          }}
          ref={rightRef}
        >
          <SlArrowRight className="text-lg sm:text-2xl inline-block" />
        </button>
      </div>

      <div
        className={`flex w-full overflow-x-visible gap-[1%]  
          ${
            data.length < 6
              ? "lg:translate-x-[5%]"
              : "lg:translate-x-[var(--translate-lg)]"
          }
          ${
            data.length < 5
              ? "md:translate-x-[5%]"
              : "md:translate-x-[var(--translate-md)]"
          }
          ${
            data.length < 4
              ? "translate-x-[5%]"
              : " translate-x-[var(--translate-sm)]"
          }
        `}
        style={
          {
            "--translate-sm": "-23.66%",
            "--translate-md": "-16.25%",
            "--translate-lg": "-11.8%",
          } as CSSProperties
        }
        ref={ref}
      >
        {data.map((video: any, idx: number) => (
          <VideoCard key={video.id} data={video} openModal={openModal} />
        ))}
      </div>
    </div>
  );
};

export default SlideView;
