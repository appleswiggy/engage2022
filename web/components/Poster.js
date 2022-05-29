import Link from "next/link";

function Poster({ id, title, artist, img }) {

  let str_artists;
  try {
    // artist is a string of the form "['artist1', 'artist2']"
    // Converting them to the string of the form "artist1, artist2"
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
            alt=""
            className="absolute bottom-0 left-0 rounded-[16px]"
          />
        </header>
      </article>
    </Link>
  );
}

export default Poster;
