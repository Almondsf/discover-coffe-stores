import { createApi } from 'unsplash-js';

// on your node server
const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  //...other fetch options
});

const getUrlCoffees =  (latLong, query, limit) =>{
    return `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}`
}

const getListOfCoffeeStorePhotos = async () =>{
  const photos = await unsplashApi.search.getPhotos({
    query: 'cafe',
    page: 1,
    orientation: 'portrait',
    perPage: 40
  });
  const unsplashResults = photos.response.results
  // console.log('results', unsplashResults)
  return unsplashResults.map(results =>  results.urls['small']);
}

export const fetchCoffeeStores = async (latLong='6.657185179866756,3.21805058108139', limit=6) =>{
  const photos = await getListOfCoffeeStorePhotos()
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `${process.env.NEXT_PUBLIC_AUTH}`
        }
      };
    const response = await fetch(
      getUrlCoffees(
      latLong,
      'cafe',
      limit,
      ), options)
    const data = await response.json();
    // console.log(data)
   
    return data.results.map((results, index) =>{
      return {
        ...results,
        imgUrl: photos[index]
      }
    });
}
