import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import Sidebar from "./Sidebar"

function Dashboard() {
  // const [songs, setSongs] = useState(null);
  // const [isLoading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch('api/popular')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setSongs(data['message'])
  //       setLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   console.log("Wait, tis loading");
  //   return <p className="text-white mx-[10%]">Loading...</p>;
  // }

  // if (!songs) {
  //   console.log("No songs fetched...");
  //   return <p className="text-white mx-[10%]">No songs fetched</p>;
  // }

  return (
    <main className="min-h-screen min-w-max bg-gray-800 lg:pb-24">
      <Sidebar />
      {/* <div className="text-white flex flex-wrap w-[800px] ml-auto mr-auto">
        {songs.map(song => (
          <iframe key={song['id']} className="rounded-[12px] m-[20px]" src={"https://open.spotify.com/embed/track/" +
                  song['id'] + "?utm_source=generator"} width="300" height="380" frameBorder="0"></iframe>
        ))}
      </div> */}
      <div className="mx-[20%]">
        <Dropdown />
      </div>
    </main>
  )
}

export default Dashboard;