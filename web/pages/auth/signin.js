import Head from 'next/head';
import { getProviders, signIn } from "next-auth/react";
import Image from 'next/image';


export default function signin({ providers }) {
  return (
    <div className="bg-gray-100 h-screen flex flex-col 
                    items-center pt-40 space-y-4">
      <Head>
        <title>Musify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image
        src="https://media.discordapp.net/attachments/898544585167482891/900083852658225172/image0.png"
        width={250}
        height={250}
        objectFit="contain"
      />

      {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <div className="pl-4">
                
                <button
                  className="login-with-google-btn"
                  onClick={() => signIn(provider.id, { callbackUrl: "http://localhost:3000/" })}
                >
                  Sign in with Google
                </button>
                
              </div>
            </div>
      ))}
    </div>
  );
}


export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}