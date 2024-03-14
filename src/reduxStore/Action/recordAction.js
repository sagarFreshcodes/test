import {
  getEditRecordData,
  getRecordListResponse,
} from "../Reducer/recordReducer";

export const StoreRecordResponce = (data) => (dispatch) => {
  console.log("StoreBookApiResponce test1");
  dispatch(getRecordListResponse(data));
};
export const StoreEditRecordData = (data) => (dispatch) => {
  console.log("StoreBookApiResponce test1");
  dispatch(getEditRecordData(data));
};
