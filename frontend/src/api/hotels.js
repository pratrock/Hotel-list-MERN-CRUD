import axios from "axios";
export const getHotelApi = () => {
  return axios.get("/hotels");
};
export const searchHotelApi = (searchTerm) => {
  console.log("I'm triggered api");
  return axios.get(`/searchHotels?searchTerm=${searchTerm}`);
};
