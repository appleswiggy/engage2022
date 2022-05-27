import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Body from '../components/Body';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function recommendations() {
  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { status, data:session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("http://localhost:3000/auth/signin");
    }
  });

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/api/multi?_recommend=true&_n_songs=10&_email=" + session?.user?.email, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();

      if (responseData['success']) {
        setSongs(responseData['message']);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="">
      <Head>
        <title>Musify - Recommended songs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen min-w-max bg-gray-800 lg:pb-24">
        <Sidebar light={4} />
        <Header text={" Recommendations "} />
        <Body songs={songs} />
      </main> 

    </div>
  )
}

export default recommendations;

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