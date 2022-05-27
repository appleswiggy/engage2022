import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Body from '../components/Body';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("http://localhost:3000/auth/signin");
    }
  });

  // console.log(session?.user?.email);

  useEffect(() => {
    setLoading(true);
    const fetchSongs = async () => {
      const response = await fetch("/api/popular", {
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

  if (isLoading) return <p className="text-white">Loading...</p>;
  if(!songs) return <p className="text-white">Some error occured.</p>

  return (
    <div className="">
      <Head>
        <title>Musify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen min-w-max bg-gray-800 lg:pb-24">
        <Sidebar light={0} />
        <Header text={" Popular songs "} />
        <Body songs={songs} />
      </main> 
    </div>
  );
}


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