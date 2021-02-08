import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      // state.user = {}
      // action.payload is basically an object. 
      //so, what it does here, it sets the user state to an object
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  },
});

export const { login, logout } = userSlice.actions;

// selectors are basically the state value for e.g user (see initial state)
export const selectUser = state => state.user.user;

export default userSlice.reducer;
