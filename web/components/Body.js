import Poster from "./Poster";
import Track from "./Track";

function Body({ songs }) {
  return (
    <section className="flex flex-col items-center py-4 space-y-8 md:max-w-6xl md:mr-2.5">
      <div className="card-list scrollbar-hide text-white font-body">
        {songs
            .slice(0, 5)
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
      {(songs.length > 5) && (
        <div className="flex gap-x-8 w-full flex-col items-center absolute min-w-full md:relative ml-6">
          <div className="pr-11">
            <h2 className="text-white font-bold mb-3 text-2xl">
              More songs ...
            </h2>
            {/* <div className="space-y-3 border-2 border-gray-700 rounded-2xl p-3 bg-gray-900 overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]"> */}
            <div className="overflow-y-scroll h-[700px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[720px]">
              {songs
                  .slice(5, songs.length)
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
            {/* </div> */}
          </div>
        </div>
      )}
      
    </section>
  );
}

export default Body;
