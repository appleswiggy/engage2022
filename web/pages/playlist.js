import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Body from '../components/Body';
import Dropdown from '../components/Dropdown';
import Sidebar from '../components/Sidebar';

function playlist() {
  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [link, setLink] = useState("");

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("http://localhost:3000/auth/signin");
    }
  });

  const fetchSongs = async () => {
    setLoading(true);
    const response = await fetch("/api/playlist?_n_songs=10&_link=" + link, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();

    if (responseData['success']) {
      console.log(responseData['message'])
      setSongs(responseData['message']);
    }
    setLoading(false);
  };

  return (
    <div className="">
      <Head>
        <title>Musify - Find similar songs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen min-w-max bg-gray-800 lg:pb-24">
        <Sidebar light={5} />

        <div className='ml-24'>
          <form onSubmit={(e) => {e.preventDefault(); fetchSongs();}}>
            <label for="playlist_link">Playlist Link:</label>
            <input 
              type="text" 
              id="playlist_link" 
              name="playlist_link"
              onChange={(e) => setLink(e.target.value)}
              />
            <button type="submit">Submit</button>
          </form>
        </div>
        {isLoading && (<p className='ml-24 text-white'>Loading ...</p>)}
        {(!isLoading && songs.length != 0) && (<Body songs={songs} />)}
        <div className="mx-[20%]">
          <Dropdown />
        </div>
      </main> 

    </div>
  )
}

export default playlist;

export async function getServerSideProps(context) {
  // Check if the user is authenticated on the server...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/signin",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}