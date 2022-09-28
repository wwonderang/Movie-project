import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    users: [],
    isUserAuthrized: false,
  },
  reducers: {
    signInUser(state, action) {
      // state.users.filter((user) => user.email !== action.payload.email);
      state.user = action.payload;
      state.isUserAuthrized = true;
    },
    signOutUser(state) {
      state.user = null;
    },
    signUpUser(state, action)  {
      state.users.push(action.payload);
    },
  },
});


export const {signInUser, signOutUser, signUpUser} = userSlice.actions;

export default userSlice.reducer;
