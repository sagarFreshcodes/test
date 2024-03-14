import { combineReducers } from "redux";
import recordSlice from "./Reducer/recordReducer";
const rootReducer = combineReducers({
  recordData: recordSlice,
});

export default rootReducer;
