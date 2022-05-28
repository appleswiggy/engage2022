import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Track from "../components/Track";

function songs() {
  const router = useRouter();
  const [songs, setSongs] = useState([]);

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("http://localhost:3000/auth/signin");
    }
  });

  if (!router.query._id) {
      return (
        <div className="text-white">
            <p>Invalid request.</p>
            <a 
              className="text-[#0000FF]" 
              href={"http://localhost:3000/"}>
                Click here to go to Home page.
            </a>
        </div>
      );
  }

useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/api/single?_n_songs=10&_id=" + router.query._id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();

      if (responseData['success']) {
        setSongs(responseData['message']);

        // add the current song to recently played songs.
        const data = JSON.stringify({id: router.query._id});
        if (data) {
          fetch('/api/multi', {
                    method: 'PUT',
                    body: data,
                });
        }
      }
    };
    fetchSongs();
    
  }, [router.query._id]);

  if(!songs) return (
    <div className='flex flex-col items-center mt-[10%]'>
      <Empty />
    </div>);

  return (
    <div className="">
      <Head>
        <title>Musify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen min-w-max bg-gray-800 lg:pb-24">
        <Sidebar />
        <div className="ml-24 mt-12 flex flex-row items-center justify-between">

            <iframe 
              className="rounded-[12px] ml-10 w-[500px] h-[580px]" 
              src={"https://open.spotify.com/embed/track/" + 
              router.query._id + "?utm_source=generator"} 
              frameBorder="0"
            ></iframe>

            {(songs.length != 0) && (
              <div className="flex gap-x-8 mr-10 w-[700px] absolute right-10 md:relative ml-6">
                <div className="pr-11">
                  <h2 className="text-white font-bold mb-3 text-2xl">
                    You might also like ...
                  </h2>
                  <div className="overflow-y-scroll h-[600px] scrollbar-thin 
                                scrollbar-thumb-gray-600 scrollbar-thumb-rounded 
                                hover:scrollbar-thumb-gray-500 w-[720px]">
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
                </div>
              </div>
            )}
            
        </div>
      </main> 
    </div>
  )
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
};

export default songs;