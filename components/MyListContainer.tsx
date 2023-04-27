import { MyList } from "@/hooks/useMyList";
import { ModalData } from "@/pages/main";
import SlideView from "./SlideView";

type Props = {
  data: {
    mylist: MyList[];
  };
  openModal: (data: ModalData | null) => void;
};

const MyListContainer = ({ data, openModal }: Props) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-2xl px-[var(--padding-s)] sm:px-[var(--padding-l)] py-5 md:py-7 lg:py-9">
        My Favorite List
      </h3>
      {data.mylist && <SlideView data={data.mylist} openModal={openModal} />}
    </div>
  );
};

export default MyListContainer;
