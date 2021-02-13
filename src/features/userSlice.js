import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    userSubscription: null
  },
  reducers: {
    login: (state, action) => {
      // state.user = {}
      // action.payload is basically an object. 
      //so, what it does here, it sets the user state to an object
      state.user = action.payload;
    },
    subcription: (state, action) => {
      state.userSubscription = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  },
});

export const { login, logout, subcription } = userSlice.actions;

// selectors are basically the state value for e.g user (see initial state)
export const selectUser = state => state.user.user;
export const selecSubcription = state => state.user.userSubscription;

export default userSlice.reducer;
