import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { StoreContext } from "../../store/store-context";
import { useState, useEffect, useContext } from "react";

export async function getStaticProps(staticProps) {
  const { params } = staticProps;

  const coffeeStores = await fetchCoffeeStores();

  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
    return coffeeStore.fsq_id === params.id;
  });

  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((coffeeStore) => {
    return { params: { id: coffeeStore.fsq_id } };
  });

  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const { state } = useContext(StoreContext);
  // console.log("from  id.js", state.coffeeStores);

  const [coffeeStoreFromDb, setCoffeeStoreFromDb] = useState({});
  const [vote, setVote] = useState(0);

  const findCoffeeStoreById = () => {
    return state.coffeeStores.find((store) => {
      console.log(store.fsq_id);
      return store.fsq_id === id;
    });
  };

  const destructureFrom = () => {
    if (props.coffeeStore) {
      if (Object.keys(props.coffeeStore).length > 1) {
        return { ...props.coffeeStore };
      } else {
        return { ...findCoffeeStoreById() };
      }
    }
  };

  useEffect(() => {
    setCoffeeStoreFromDb(destructureFrom());
  }, [id, state.coffeeStores]);

  useEffect(() => {
    if (coffeeStoreFromDb && Object.keys(coffeeStoreFromDb).length > 0) {
      handleCreateCoffeeStore(coffeeStoreFromDb);
    }
  }, [coffeeStoreFromDb]);

  const handleCreateCoffeeStore = async () => {
    const coffeeData = coffeeStoreFromDb;
    try {
      const data = {
        id: coffeeData?.fsq_id,
        name: coffeeData?.name,
        address: coffeeData?.location.address,
        region:
          coffeeData?.location?.region ||
          coffeeData?.region ||
          coffeeData?.formatted_address,
        vote: 0,
        imgUrl: coffeeData?.imgUrl,
      };

      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log("Response =>", responseData);
    } catch (err) {
      console.error("Error creating coffee store", err);
    }
  };

  const [voting, setVotingCount] = useState(1);
  const handleUpvoteButton = () => {
    let count = voting + 1;
    setVotingCount(count);
    console.log("handle upvote");
  };
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { name, imgUrl, location } = coffeeStoreFromDb;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
              src={
                imgUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
              width={600}
              height={360}
              className={styles.storeImg}
              alt={name}
            ></Image>
          </div>
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt="location"
            ></Image>
            <p className={styles.text}>
              {location?.address ||
                location?.formatted_address ||
                location?.location}
            </p>
          </div>

          {location?.locality && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt="near me"
              ></Image>
              <p className={styles.text}>
                {" "}
                {location?.location ||
                  location?.region ||
                  location?.formatted_address}
              </p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="star"
            ></Image>
            <p className={styles.text}>{voting}</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
    // <div></div>
  );
};

export default CoffeeStore;
