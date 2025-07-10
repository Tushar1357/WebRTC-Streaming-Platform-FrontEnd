import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLive: false,
  currentMeetInfo: {},
};

const currentMeetSlice = createSlice({
  name: "currentMeet",
  initialState,
  reducers: {
    updateCurrentMeet: (state, action) => {
      state.currentMeetInfo = action.payload;
      state.isLive = true;
    },
  },
});

export const currentMeetActions = currentMeetSlice.actions;
export default currentMeetSlice.reducer;
