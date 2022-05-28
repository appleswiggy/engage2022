import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Body from '../components/Body';
import Empty from '../components/Empty';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';

function playlist() {
  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [link, setLink] = useState("");

  // Redirect to signin page if session expires or if the 
  // user is unauthenticated.
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("http://localhost:3000/auth/signin");
    }
  });

  const fetchSongs = async () => {
    setLoading(true);

    const response = await fetch("/api/playlist?_n_songs=20&_link=" + link, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();

    if (responseData['success']) {
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
        <Header text={" Songs similar to your playlist "} />

        <div className='ml-36 mt-5'>
          <form onSubmit={(e) => {e.preventDefault(); fetchSongs();}}>
                <div class="form__body">
                  <div class="form__group field">

                    <input
                      type="input"
                      class="form__field"
                      onChange={(e) => setLink(e.target.value)}
                      name="playlist_link"
                      placeholder="Playlist Link"
                    />
                    <label for="playlist_link" class="form__label">Playlist Link</label>

                  </div>
                </div>
                <br/>
              <button type="submit" className='text-white bg-[#2196F3] mn-button raised'>Submit</button>
          </form>
        </div>

        {isLoading && (
          <div className='flex flex-col items-center mt-[10%]'>
            <Loader/>
          </div>
          )}

        {(!isLoading && songs.length != 0) && (
          <div className='flex flex-col items-center'>
            <Body songs={songs} />
          </div>)}

        {(!isLoading && songs.length == 0) && (
          <div className='flex flex-col items-center mt-[5%] '>
            <Empty />
          </div>)}
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