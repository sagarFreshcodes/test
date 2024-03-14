import { createSlice } from "@reduxjs/toolkit";
import { TableData } from "../../component/Common/Helper/functionHeleper";

let userDataObject;

if (localStorage.getItem("UserInfo")) {
  if (JSON.parse(localStorage.getItem("UserInfo"))) {
    userDataObject = JSON.parse(localStorage.getItem("UserInfo"));
  } else {
    userDataObject = {};
  }
} else {
  userDataObject = {};
}

export const recordSlice = createSlice({
  name: "user",
  initialState: {
    userListResponse: TableData,
    editRecordData: {},
  },
  reducers: {
    getRecordListResponse: (state, action) => {
      state.userListResponse = action.payload;
    },
    getEditRecordData: (state, action) => {
      state.editRecordData = action.payload;
    },
  },
});

export const { getRecordListResponse, getEditRecordData } = recordSlice.actions;

export default recordSlice.reducer;
