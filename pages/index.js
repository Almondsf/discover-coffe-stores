import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner'
import Card from '../components/card'
import { fetchCoffeeStores } from '../lib/coffee-stores'
import useTrackLocation from '../Hooks/use-track-location'
import { useEffect, useState } from 'react'
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
  const{handleTrackLocation, latLong, locationErrorMsg, isFinding} = useTrackLocation()
  // console.log({latLong, handleTrackLocation, locationErrorMsg})
  const[coffeeStores, setCoffeeStores] =useState('')
  const[coffeeStoresError, setCoffeeStoresError] =useState(null)

  useEffect(() => {
    async function fetchedCoffeeStores() {
      if (latLong) {
        try {
          const CoffeeStores = await fetchCoffeeStores(latLong, 30);
          setCoffeeStores(CoffeeStores);
        } catch (error) {
          setCoffeeStoresError(error.message)
        }
      }
    }
  
    fetchedCoffeeStores();
  }, [latLong]);
  

  const handleOnBannerBtnClick = () => {
    handleTrackLocation()
    // console.log('hi bruce banner')
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
      <Banner buttonText={isFinding ? 'Locating...' : 'View stores nearby'} handleOnClick={handleOnBannerBtnClick}/>
      {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
      {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
      <div className={styles.heroImage}>
      <Image src='/static/hero-image.png' alt='hero' width={700} height={400}/>
      </div>
      {coffeeStores.length > 0 &&
      <div className={styles.sectionWrapper}>
       <h2 className={styles.heading2}>Stores near me</h2>
      <div className={styles.cardLayout}>
      {coffeeStores.map(coffeeStore => {
      return <Card 
      key={coffeeStore.fsq_id}
      name={coffeeStore.name} imgUrl={coffeeStore.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} href={`/coffee-store/${coffeeStore.fsq_id}`} className={styles.card}/>})}
      </div>
      </div>}
      {props.coffeeStores.length > 0 &&
      <div className={styles.sectionWrapper}>
       <h2 className={styles.heading2}>Lagos stores</h2>
      <div className={styles.cardLayout}>
      {props.coffeeStores.map(coffeeStore => {
      return <Card 
      key={coffeeStore.fsq_id}
      name={coffeeStore.name} imgUrl={coffeeStore.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} href={`/coffee-store/${coffeeStore.fsq_id}`} className={styles.card}/>})}
      </div>
      </div>}
      </main>
    </div>
  )
}
