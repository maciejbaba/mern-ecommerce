import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../users/usersApiSlice";

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
