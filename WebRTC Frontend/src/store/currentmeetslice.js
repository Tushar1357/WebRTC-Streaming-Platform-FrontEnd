import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLive: false,
  currentMeetInfo: {},
  loading: true,
};

const currentMeetSlice = createSlice({
  name: "currentMeet",
  initialState,
  reducers: {
    updateCurrentMeet: (state, action) => {
      state.currentMeetInfo = action.payload;
      state.isLive = true;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = false;
      state.currentMeetInfo = {};
    },
  },
});

export const currentMeetActions = currentMeetSlice.actions;
export default currentMeetSlice.reducer;
