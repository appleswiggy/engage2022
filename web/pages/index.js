import Head from 'next/head';
import Dashboard from '../components/Dashboard';
import axios from 'axios';  

export default function Home({songs}) {
  return (
    <div className="">
      <Head>
        <title>Musify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard songs={songs}/>
    </div>
  );
}

export async function getServerSideProps(ctx) {
    // get the current environment
    let dev = process.env.NODE_ENV !== 'production';
    let { DEV_URL, PROD_URL } = process.env;

    // request posts from api
    let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/popular`);
    // extract the data
    let data = await response.json();

    return {
        props: {
            songs: data['message'],
        },
    };
}