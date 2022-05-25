import Head from 'next/head';
import { getProviders, signIn } from "next-auth/react";


export default function signin({ providers }) {
  return (
    <div className="">
      <Head>
        <title>Musify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Dashboard/> */}

      {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <div className="pl-4">
                <button
                  className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2"
                  onClick={() => signIn(provider.id, { callbackUrl: "http://localhost:3000/" })}
                >
                  Sign in
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