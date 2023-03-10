import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import { fetchCoffeeStores } from '../lib/coffee-stores'
// import coffeeStoresData from '../data/coffee-stores.json'

const inter = Inter({ subsets: ['latin'] })
export async function getStaticProps(context) {
  // let coffeeStoreData =[]
  const coffeeStores = await fetchCoffeeStores()
  return {
    props: {
      coffeeStores,
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
      key={coffeeStore.fsq_id}
      name={coffeeStore.name} imgUrl={coffeeStore.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} href={`/coffee-store/${coffeeStore.fsq_id}`} className={styles.card}/>})}
      </div>
      </>}
      </main>
    </div>
  )
}
