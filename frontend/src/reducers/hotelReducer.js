import { GET_HOTELS, SHOW_HOTELS, SEARCH_HOTELS } from "../actions/actionTypes";

const initialState = {
  loading: false,
  hotels: [],
  error: "",
  searchTerm: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HOTELS:
      return {
        ...state,
        hotels: "",
        loading: true,
      };
    case SHOW_HOTELS:
      return {
        ...state,
        hotels: action.payload,
        loading: false,
      };
    case SEARCH_HOTELS:
      console.log("Getting to reducer");
      return {
        ...state,
        searchTerm: action.payload,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
