import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Body from "../components/Body";
import Dropdown from "../components/Dropdown";
import Sidebar from "../components/Sidebar";

function songs() {
  const router = useRouter();
  const [songs, setSongs] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("http://localhost:3000/auth/signin");
    }
  });

  if (!router.query._id) {
      return (
        <div className="text-white">
            <p>Invalid request.</p>
            <a className="text-[#0000FF]" href={"http://localhost:3000/"}>Click here to go to Home page.</a>
        </div>
      );
  }

useEffect(() => {
    setLoading(true);
    const fetchSongs = async () => {
      const response = await fetch("/api/single?_id=" + router.query._id, {
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
  }, [router.query._id]);

  if (isLoading) return <p className="text-white">Loading...</p>;
  if(!songs) return <p className="text-white">Some error occured.</p>

  return (
    <div className="">
      <Head>
        <title>Musify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen min-w-max bg-gray-800 lg:pb-24">
        <Sidebar />
        <div className="ml-24">
            <iframe className="rounded-[12px] m-[20px] w-[500px] h-[580px]" src={"https://open.spotify.com/embed/track/" +
            router.query._id + "?utm_source=generator"} frameBorder="0"></iframe>
            <button className="btn first">Like</button>
        </div>
        <Body songs={songs} />
        <div className="mx-[20%]">
          <Dropdown />
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