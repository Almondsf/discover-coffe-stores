import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const handleOnBannerBtnClick = () => {
    console.log('hi bruce banner')
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="allows you to discover coffee stores"
        />
      </Head>

      <main className={styles.main}>
      <Banner buttonText='View stores nearby' handleOnClick={handleOnBannerBtnClick}/>
      <div className={styles.heroImage}>
      <Image src='/static/hero-image.png' width={700} height={400}/>
      </div>
      </main>
    </div>
  )
}
