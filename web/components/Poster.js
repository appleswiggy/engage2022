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
      <article className="card w-[300px] h-[400px] group">
        <header className="card-header">
          <p className="truncate w-[250px] mb-2">{str_artists}</p>
          <h2 className="truncate w-[250px]">{title}</h2>
          <img
            src={img}
            className="absolute bottom-0 left-0 rounded-[16px] opacity-80 group-hover:opacity-100"
          />
        </header>
      </article>
    </Link>
  );
}

export default Poster;
