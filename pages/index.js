import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import coffeeStoresData from '../data/coffee-stores.json'

const inter = Inter({ subsets: ['latin'] })
export async function getStaticProps(context) {
  return {
    props: {
      coffeeStores:coffeeStoresData,
    }, // will be passed to the page component as props
  }
}

export default function Home(props) {
  
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
      <Image src='/static/hero-image.png' alt='hero' width={700} height={400}/>
      </div>
      {props.coffeeStores.length > 0 &&
      <>
       <h2 className={styles.heading2}>Toronto stores</h2>
      <div className={styles.cardLayout}>
      {props.coffeeStores.map(coffeeStore => {
      return <Card 
      key={coffeeStore.id}
      name={coffeeStore.name} imgUrl={coffeeStore.imgUrl} href={`/coffee-store/${coffeeStore.id}`} className={styles.card}/>})}
      </div>
      </>}
      
      </main>
    </div>
  )
}
