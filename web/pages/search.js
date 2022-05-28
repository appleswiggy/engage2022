import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Empty from '../components/Empty';
import Search from '../components/Searchbar';
import Sidebar from '../components/Sidebar';
import Track from '../components/Track';

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
    setLoading(true);
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
    setLoading(false);
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

        <div className='ml-36'>
          <Search search={search} setSearch={setSearch} />
        </div>

        {isLoading && (
          <div className='flex flex-col items-center mt-[10%]'>
            <Loader/>
          </div>
          )}

        {(!isLoading && songs.length != 0) && (
          <div className='flex flex-col items-center mt-12'>
            <div className="flex gap-x-8 mr-10 w-[700px] absolute right-10 md:relative ml-6">
              <div className="pr-11">
                <h2 className="text-white font-bold mb-3 text-2xl">
                  Search Results ...
                </h2>
                {/* <div className="space-y-3 border-2 border-gray-700 rounded-2xl p-3 bg-gray-900 overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]"> */}
                <div className="overflow-y-scroll h-[600px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[720px]">
                  {songs
                      .slice(0, songs.length)
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
          </div>
        )}
          
        {(!isLoading && songs.length == 0) && (
          <div className='flex flex-col items-center mt-[10%]'>
            <Empty />
          </div>)}

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