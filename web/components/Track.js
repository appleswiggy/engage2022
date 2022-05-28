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
    <div className="flex items-center justify-between w-[700px] space-x-20 mb-10 cursor-default bg-gray-900 hover:bg-white/10 py-4 px-4 rounded-lg group transition ease-out">
      <div className="flex items-center">
        <img
          src={img}
          alt=""
          className="rounded-xl h-32 w-32 object-cover mr-3"
        />
        <div>
          <h4 className="text-white text-lg font-semibold truncate w-[350px]">
            {title}
          </h4>
          <p className="text-[rgb(179,179,179)] text-md truncate w-[350px] font-semibold group-hover:text-white">
            {str_artists}
          </p>
        </div>
      </div>

      <div className="md:ml-auto flex items-center space-x-2.5">
          <>
          <Link href={{ pathname: 'http://localhost:3000/songs', query: { _id: id } }}>
            <div className="h-[3.5rem] w-[3.5rem] rounded-full border border-white/60 flex items-center justify-center mr-[30px] hover:bg-[#15883e] hover:border-[#15883e] icon hover:scale-110">
              <BsFillPlayFill className="text-white text-3xl ml-[1px]" />
            </div>
          </Link>
          </>
      </div>
    </div>
  );
}

export default Track;
