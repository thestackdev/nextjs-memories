import { createSlice } from "@reduxjs/toolkit";

let initialState = { user: null };
if (typeof window !== "undefined") {
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (auth) initialState = auth;
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    delUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, delUser } = slice.actions;
export default slice.reducer;
