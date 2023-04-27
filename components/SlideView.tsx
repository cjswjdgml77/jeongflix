import { CSSProperties, useRef } from "react";
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

  const leftHandler = () => {
    if (!ref.current) return;
    const div = ref.current;
    const sm = 3;
    const md = 4;
    const lg = 5;
    const width = window.innerWidth;
    let startMove: number = 0;
    let endMove: number = 0;
    let showSlide = 0;

    if (width > 1024) {
      startMove = 16.8 * 5 * -1 - 16.8;
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
    const childs = div.childNodes;
    for (let i = 0; i < showSlide; i++) {
      div.insertBefore(childs[childs.length - 1], childs[0]);
    }
    div.style.setProperty("--start-move", `${startMove}%`);
    div.style.setProperty("--end-move", `${endMove}%`);
    div.classList.add("animating");
    setTimeout(() => {
      div.classList.remove("animating");
    }, 500);
  };
  const rightHandler = (isRight: boolean) => {
    if (!ref.current) return;
    const div = ref.current;
    const sm = 3;
    const md = 4;
    const lg = 5;
    const width = window.innerWidth;
    const plus = isRight ? -1 : 1;
    let startMove: number = 0;
    let endMove: number = 0;
    let showSlide = 0;
    if (width > 1024) {
      endMove = 16.8 * lg * plus + 16.8 * plus;
      startMove = -11.8;
      showSlide = lg;
    } else if (width > 768) {
      endMove = 21.25 * md * plus + 21.25 * plus;
      startMove = -16.25;
      showSlide = md;
    } else {
      endMove = 28.66 * sm * plus + 28.66 * plus;
      startMove = -23.66;
      showSlide = sm;
    }
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
          className={`min-w-[5%] bg-black/50 z-20`}
          onClick={(e) => {
            leftHandler();
          }}
        >
          <SlArrowLeft className={`text-lg sm:text-2xl`} />
        </button>
        <button
          className={`min-w-[5%] bg-black/50 z-20`}
          onClick={() => {
            rightHandler(true);
          }}
        >
          <SlArrowRight className="text-lg sm:text-2xl" />
        </button>
      </div>

      <div
        className="flex overflow-x-visible gap-[1%] translate-x-[var(--translate-sm)] md:translate-x-[var(--translate-md)] lg:translate-x-[var(--translate-lg)] 
    
    "
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
          <VideoCard key={idx} data={video} openModal={openModal} />
        ))}
      </div>
    </div>
  );
};

export default SlideView;
