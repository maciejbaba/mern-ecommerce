import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../users/usersApiSlice";

const saveSessionToLocalStorage = (session: InitialState) =>
  localStorage.setItem("session", JSON.stringify(session));

const getSessionFromLocalStorage = () => {
  const session = localStorage.getItem("session");
  return session ? JSON.parse(session) : null;
};

const deleteSessionFromLocalStorage = () => localStorage.removeItem("session");

type InitialState = {
  user: User | null;
  token: string | null;
};

const initialState: InitialState = getSessionFromLocalStorage() || {
  user: null,
  token: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<InitialState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      saveSessionToLocalStorage(state);
    },
    clearSession: (state) => {
      state.user = null;
      state.token = null;
      deleteSessionFromLocalStorage();
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;

export default sessionSlice.reducer;

export const selectUser = (state: { session: InitialState }) =>
  state.session.user;
export const selectToken = (state: { session: InitialState }) =>
  state.session.token;
