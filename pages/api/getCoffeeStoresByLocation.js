import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    //configure Latlong and Limit
    const { latLong, limit } = req.query;

    const response = await fetchCoffeeStores(latLong, limit);
    res.status(200);
    res.json(response);
  } catch (err) {
    console.error("There is an error");
  }
  //
};

export default getCoffeeStoresByLocation;
