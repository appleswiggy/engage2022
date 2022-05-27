import Poster from "./Poster";
import Track from "./Track";

function Body({ songs }) {
  return (
    <section className="flex flex-col items-center ml-36 py-4 space-y-8 md:max-w-6xl md:mr-2.5">
      <div className="card-list scrollbar-hide text-white font-body">
        {songs
            .slice(0, 6)
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
        <div className="w-full pr-11">
          <h2 className="text-white font-bold mb-3">
            Songs
          </h2>
          <div className="space-y-3 border-2 border-gray-700 rounded-2xl p-3 bg-gray-900 overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]">
            {songs
                .slice(6, songs.length)
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
