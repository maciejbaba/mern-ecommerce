import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../users/usersApiSlice";
import { RootState } from "../../app/store";

const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};

const deleteTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

type InitialState = {
  user: User | null;
  token: string | null;
};

const localToken = localStorage.getItem("token");
const notParsedUser = localStorage.getItem("user");

const initialState: InitialState = {
  user: notParsedUser ? JSON.parse(notParsedUser) : null,
  token: localToken,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<InitialState>) => {
      const { user, token } = action.payload;
      if (user && token) {
        state.user = user;
        state.token = token;
        saveTokenToLocalStorage(token);
      }
      if (!user) {
        console.log("no user");
      }
      if (!token) {
        console.log("no token");
      }
    },
    clearSession: (state) => {
      state.token = null;
      state.user = null;
      deleteTokenFromLocalStorage();
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;

export const selectToken = (state: RootState) => state.session.token;
export const selectUser = (state: RootState) => state.session.user;
