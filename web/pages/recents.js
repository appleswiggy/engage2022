import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Body from '../components/Body';
import Empty from '../components/Empty';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar';

function recents() {
  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // Redirect to signin page if session expires or if the 
  // user is unauthenticated.
  const { status, data:session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    }
  });

  useEffect(() => {
    setLoading(true);

    const fetchSongs = async () => {
      const response = await fetch("/api/multi", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();

      if (responseData['success']) {
        setSongs(responseData['message']);
      }
    };
    fetchSongs();

    setLoading(false);
  }, []);

  return (
    <div className="">
      <Head>
        <title>Musify - Recently played</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen min-w-max bg-gray-800 lg:pb-24">
        <Sidebar light={3} />
        <Header text={" Recently played "} />

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
          <div className='flex flex-col items-center mt-[5%]'>
            <Empty />
          </div>)}
          
      </main> 
    </div>
  )
}

export default recents;

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