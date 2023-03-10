import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
// import coffeeStoresData from '../../data/coffee-stores.json'
import styles from  '../../styles/coffee-store.module.css'
import Image from 'next/image';
import cls from 'classnames'
import {fetchCoffeeStores} from '../../lib/coffee-stores'

export async function getStaticProps(staticProps) {
  const {params}  = staticProps;
  
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore:coffeeStores.find(coffeeStore =>{
        return coffeeStore.fsq_id.toString() === params.id  //dynamic id
      })
    }, // will be passed to the page component as props
  }
}
export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map(coffeeStore =>{
    return{
      params: {
        id: coffeeStore.fsq_id,
      },
    }
  })
  // console.log("c", paths)
  return {
    paths,
    fallback: true, // can also be true or 'blocking'
  }
}

const coffeStore = (props) => {
  const {name, address, neighbourhood, imgUrl} = props.coffeeStore
// console.log("guy", props.coffeStore)
  const Router = useRouter()
  if(Router.isFallback){
    return <div>Loading...</div>
  }
  const handleUpvoteButton = () =>{
    console.log('handle upvote')
  }
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
          <Link href='/'>Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
          <h1 className={styles.name}>{name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
          <Image src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} width={600} height={360}   className={styles.storeImg} alt={name}></Image>
          </div>
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" alt='location'></Image>
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width="24" height="24" alt=''></Image>
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" alt=''></Image>
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up vote!</button>
        </div>
      </div>
    </div>
  )
}

export default coffeStore;
