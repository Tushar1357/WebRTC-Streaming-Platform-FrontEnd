import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meetingList: [],
  editMeet: null,
  deleteMeet: null,
};

const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    updateMeetings: (state, action) => {
      state.meetingList = action.payload;
    },

    updateEditMeeting: (state, action) => {
      state.editMeet = action.payload;
    },

    updateDeleteMeeting: (state, action) => {
      state.deleteMeet = action.payload;
    },
  },
});

export const meetingAction = meetingSlice.actions;
export default meetingSlice.reducer;
