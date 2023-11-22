import { combineReducers } from "redux";
import reducer from "./hotelReducer";
const rootReducer = combineReducers({
  hotels: reducer,
});
export default rootReducer;
