import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { ImHeadphones } from "react-icons/im";
import { useState } from "react";
import Link from "next/link";

function Track({ id, title, artist, img }) {
  const [hasLiked, setHasLiked] = useState(false);

  let str_artists;
  try {
    str_artists = artist
      .slice(2, -2)
      .replaceAll('\', \'', ', ')
      .replaceAll('", "', ', ')
      .replaceAll('", \'', ', ')
      .replaceAll('\', "', ', ');
  } catch (error) {
    str_artists = artist;
  }

  return (
    <div className="flex items-center justify-between space-x-20 cursor-default hover:bg-white/10 py-2 px-4 rounded-lg group transition ease-out">
      <div className="flex items-center">
        <img
          src={img}
          alt=""
          className="rounded-xl h-12 w-12 object-cover mr-3"
        />
        <div>
          <h4 className="text-white text-sm font-semibold truncate w-[450px]">
            {title}
          </h4>
          <p className="text-[rgb(179,179,179)] text-[13px] font-semibold group-hover:text-white">
            {str_artists}
          </p>
        </div>
      </div>

      <div className="md:ml-auto flex items-center space-x-2.5">
        <div className="text-white flex space-x-1 text-sm font-semibold">
          {/* <ImHeadphones className="text-lg" /> */}
        </div>
        <div className="flex items-center rounded-full border-2 border-gray-700 w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
          <ImHeadphones className="text-lg ml-3 icon text-white" />
          <>
          <Link href={{ pathname: 'http://localhost:3000/songs', query: { _id: id } }}>
            <div className="h-10 w-10 rounded-full border border-white/60 flex items-center justify-center absolute -right-0.5 hover:bg-[#15883e] hover:border-[#15883e] icon hover:scale-110">
              <BsFillPlayFill className="text-white text-xl ml-[1px]" />
            </div>
          </Link>
          </>
        </div>
      </div>
    </div>
  );
}

export default Track;
