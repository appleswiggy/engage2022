import Poster from "./Poster";
import Track from "./Track";

function Body({ songs }) {
  return (
    <section className="ml-24 py-4 space-y-8 md:max-w-6xl flex-grow md:mr-2.5">
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4">
        {songs
            .slice(0, 4)
            .map((track) => (
            <Poster
                key={track['id']}
                id={track['id']}
                title={track['name']}
                artist={track['artists']}
                img={track['img']}
            />
            ))
        }   
      </div>

      <div className="flex gap-x-8 absolute min-w-full md:relative ml-6">
        {/* Tracks */}
        <div className="w-full pr-11">
          <h2 className="text-white font-bold mb-3">
            {/* {searchResults.length === 0 ? "New Releases" : "Tracks"} */}
            Songs
          </h2>
          <div className="space-y-3 border-2 border-gray-700 rounded-2xl p-3 bg-gray-900 overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]">
            {songs
                .slice(4, songs.length)
                .map((track) => (
                <Track
                    key={track['id']}
                    id={track['id']}
                    title={track['name']}
                    artist={track['artists']}
                    img={track['img']}
                />
                ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
