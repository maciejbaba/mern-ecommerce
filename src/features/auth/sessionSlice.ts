import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../users/usersApiSlice";

const saveTokenToLocalStorage = (token: string | null) => {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    console.log("no token to save");
  }
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token") ?? "";
};

const deleteTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

type InitialState = {
  user: User | null;
  token: string | null;
};

const initialState: InitialState = {
  user: null,
  token: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<InitialState>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      saveTokenToLocalStorage(token);
    },
    clearSession: (state) => {
      state = initialState;
      deleteTokenFromLocalStorage();
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;

export const selectUser = (state: { session: InitialState }) =>
  state.session.user;
export const selectToken = (state: { session: InitialState }) =>
  state.session.token;
