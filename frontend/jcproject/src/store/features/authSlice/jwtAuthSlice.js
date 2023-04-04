import { createSlice } from "@reduxjs/toolkit";

export const jwtAuthSlice = createSlice({
  name: "auth",
  initialState: { user_id: null, tokens: null, user_type: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user_id, tokens, user_type } = action.payload;
      state.user_id = user_id;
      state.user_type = user_type;
      state.tokens = tokens;
    },
    logOut: (state, action) => {
      state.user_id = null;
      state.user_type = null;
      state.tokens = null;
    },
  },
});

export const { setCredentials, logOut } = jwtAuthSlice.actions;

export default jwtAuthSlice.reducer;

export const selectCurrentUser_id=(state)=>state.auth.user_id
export const selectCurrentUser_type=(state)=>state.auth.user_type
export const selectTokens=(state)=>state.auth.tokens