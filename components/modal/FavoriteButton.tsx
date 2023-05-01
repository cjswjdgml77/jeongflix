import { useFavorites } from "@/hooks/useFavorites";
import { BasicDatas } from "@/hooks/useMovieLists";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { CiSquarePlus } from "react-icons/ci";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  data: any;
};

const FavoriteButton = ({ data }: Props) => {
  const {
    data: favorites,
    error,
    isLoading,
    mutate,
  } = useFavorites(`/api/favorites/${data.content_id || data.id}`);
  const [disable, setDisable] = useState(false);
  const addListHandler = async (data: BasicDatas) => {
    try {
      setDisable(true);
      if (favorites && favorites.favorites.length > 0) {
        const result = await axios.delete(
          `/api/favorites/${favorites.favorites[0].id}`
        );
      } else {
        const result = await axios.post("/api/favorites", { data: data });
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      setDisable(false);
    }
    mutate();
  };
  if (isLoading) return null;
  return (
    <div className="w-full text-right">
      <button
        className="w-auto bg-slate-300/20 px-4 py-2 rounded-md"
        onClick={() => {
          addListHandler(data);
        }}
        disabled={disable}
      >
        {favorites && favorites.favorites.length > 0 ? (
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            version="1.1"
            className="text-4xl inline-block"
          >
            <path
              fill="#fff"
              d="M18.438,20.938H5.563a2.5,2.5,0,0,1-2.5-2.5V5.564a2.5,2.5,0,0,1,2.5-2.5H18.438a2.5,2.5,0,0,1,2.5,2.5V18.438A2.5,2.5,0,0,1,18.438,20.938ZM5.563,4.064a1.5,1.5,0,0,0-1.5,1.5V18.438a1.5,1.5,0,0,0,1.5,1.5H18.438a1.5,1.5,0,0,0,1.5-1.5V5.564a1.5,1.5,0,0,0-1.5-1.5Z"
            ></path>
            <motion.polyline
              stroke="#fff"
              fill="transparent"
              initial={{ pathLength: 0, pathOffset: 1 }}
              animate={{ pathLength: 1, pathOffset: 0 }}
              points="17 10 10 15 6 12"
            />
          </svg>
        ) : (
          <CiSquarePlus className="inline-block text-4xl" />
        )}
        <span className="ml-2">
          {favorites && favorites.favorites.length > 0
            ? "Added List"
            : "Add MyList"}
        </span>
      </button>
    </div>
  );
};

export default FavoriteButton;
