import Sidebar from "./Sidebar"

function Dashboard({songs}) {
  return (
    <main className="flex min-h-screen min-w-max bg-black lg:pb-24">
      <Sidebar />
      <div className="text-white mx-[90px] flex flex-wrap w-[1400px]">
        {songs.map(song => (
          <iframe className="rounded-[12px] m-[20px]" src={"https://open.spotify.com/embed/track/" + song['id'] + "?utm_source=generator"} width="300" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        ))}
      </div>
    </main>
  )
}

export default Dashboard