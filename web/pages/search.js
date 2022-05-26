import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Body from '../components/Body';
import Dropdown from '../components/Dropdown';
import Search from '../components/Search';
import Sidebar from '../components/Sidebar';

function search() {
  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("http://localhost:3000/auth/signin");
    }
  });

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch("/api/search?_query=" + search, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();

      if (responseData['success']) {
        setSongs(responseData['message']);
      }
    };

    fetchResults();
  }, [search]);

  // if (!songs) return <p className='text-white'>Erorr...</p>;


  return (
    <div className="">
      <Head>
        <title>Musify - Search songs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen min-w-max bg-gray-800 lg:pb-24">
        <Sidebar light={1} />

        <div className='ml-24'>
          <Search search={search} setSearch={setSearch} />
        </div>
        <Body songs={songs} />
        <div className="mx-[20%]">
          <Dropdown />
        </div>
      </main> 

    </div>
  )
}

export default search;

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