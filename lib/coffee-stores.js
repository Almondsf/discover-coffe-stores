const getUrlCoffees =  (limit) =>{
    return `https://api.foursquare.com/v3/places/search?&limit=${limit}`
}

export const fetchCoffeeStores = async () =>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `${process.env.AUTH}`
        }
      };
    const response = await fetch(getUrlCoffees(50), options)
    const data = await response.json();
    //console.log(data)
    // console.log(data.results)
    return data.results;
}