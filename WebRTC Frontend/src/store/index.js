import { configureStore } from "@reduxjs/toolkit";
import meetingReducer from "./meetingSlice";
import authReducer from "./authSlice"
import currentMeetReducer from "./currentmeetslice"

const store = configureStore({
  reducer: {
    meeting: meetingReducer,
    auth: authReducer,
    currentMeet: currentMeetReducer
  }
})

export default store;