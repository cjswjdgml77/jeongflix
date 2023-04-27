import { useMyList } from "@/hooks/useMyList";
import { BasicDatas } from "@/hooks/useMovieLists";
import { BsCheck2Circle } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import axios from "axios";

type Props = {
  data: any;
};

const FavoriteButton = ({ data }: Props) => {
  const {
    data: mylist,
    error,
    isLoading,
    mutate,
  } = useMyList(`/api/mylist/${data.content_id || data.id}`);
  const addListHandler = async (data: BasicDatas) => {
    const result = axios.post("/api/mylist", { data: data });
    mutate();
  };

  return (
    <div className="w-full text-right">
      {mylist && mylist.mylist.length > 0 ? (
        <BsCheck2Circle className="inline-block text-4xl mr-2" />
      ) : (
        <button
          className="w-auto bg-slate-300/20 px-4 py-2 rounded-md"
          onClick={() => {
            addListHandler(data);
          }}
        >
          <CiSquarePlus className="inline-block text-4xl mr-2" />
          <span>Add MyList</span>
        </button>
      )}
    </div>
  );
};

export default FavoriteButton;
