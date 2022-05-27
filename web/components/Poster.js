import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";

function Poster({ id, title, artist, img }) {

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
    <Link href={{ pathname: 'http://localhost:3000/songs', query: { _id: id } }}>
    <div
      className="w-[260px] h-[360px] rounded-[50px] overflow-hidden relative text-white/80 cursor-pointer hover:scale-105 hover:text-white/100 transition duration-200 ease-out group mx-auto"
    >
      <img
        src={img}
        alt=""
        className="h-full w-full absolute inset-0 object-cover rounded-[50px] opacity-80 group-hover:opacity-100"
      />

      <div className="absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5 bg-gray-900 p-2 rounded-xl">
        <div className="h-10 w-10 bg-[#15883e] rounded-full flex items-center justify-center group-hover:bg-[#1db954] flex-shrink-0">
            <BsFillPlayFill className="text-white text-xl ml-[1px]" />
        </div>

        <div className="text-[15px] text-gray-100">
          <h4 className="font-extrabold truncate w-44">{title}</h4>
          <h6>{str_artists}</h6>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default Poster;
