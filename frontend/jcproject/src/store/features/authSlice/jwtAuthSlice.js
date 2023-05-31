import { createSlice } from "@reduxjs/toolkit";

const localkey = "CONSULT_KEY";

export const jwtAuthSlice = createSlice({
  name: "auth",
  initialState: { user_id: null, tokens: null, user_type: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user_id, tokens, user_type } = action.payload;
      return {
        user_id,
        user_type,
        tokens,
      };
    },
    logOut: (state, action) => {
      localStorage.removeItem(localkey);
      return {
        user_id: null,
        user_type: null,
        tokens: null,
      };
    },
  },
});

export const { setCredentials, logOut } = jwtAuthSlice.actions;


export const selectCurrentUser_id = (state) => state.auth.user_id;
export const selectCurrentUser_type = (state) => state.auth.user_type;
export const selectTokens = (state) => state.auth.tokens;

export default jwtAuthSlice.reducer;