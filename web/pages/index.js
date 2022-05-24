import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Musify</title>
        <meta name="description" content="Spotify song recommendation system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-5xl font-bold underline">
        Hello world!
      </h1>
    </div>
  )
}
