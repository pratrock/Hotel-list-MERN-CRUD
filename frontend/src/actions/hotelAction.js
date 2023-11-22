import { getHotelApi, searchHotelApi } from "../api/hotels";
import {
  GET_HOTELS,
  SHOW_HOTELS,
  EDIT_HOTEL,
  SEARCH_HOTELS,
} from "./actionTypes";

export const getHotels = () => {
  return {
    type: GET_HOTELS,
  };
};

export const showHotels = (hotels) => {
  return {
    type: SHOW_HOTELS,
    payload: hotels,
  };
};
export const deleteHotel = (id) => {
  return { type: EDIT_HOTEL, payload: id };
};

export const showHotelData = () => {
  return (dispatch) => {
    dispatch(getHotels());
    getHotelApi()
      .then((response) => {
        const hotels = response.data;
        dispatch(showHotels(hotels));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const searchHotelsAction = (searchTerm) => {
  console.log("Getting pause here?");
  return {
    type: SEARCH_HOTELS,
    payload: searchTerm,
  };
};

export const searchHotels = (searchTerm) => {
  console.log("I'm triggered");
  return (dispatch) => {
    console.log("Entering dispatch");
    dispatch(searchHotelsAction(searchTerm));
    searchHotelApi(searchTerm)
      .then((response) => {
        const hotels = response.data;
        console.log("I'm also triggered", hotels);
        dispatch(showHotels(hotels));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
