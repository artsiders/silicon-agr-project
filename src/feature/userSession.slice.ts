import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserSession } from "../_interface";


interface UserSessionAction {
  payload: UserSession;
  type: string;
}
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userSession");
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: UserSession) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userSession", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};
const initialState: UserSession = loadState() || {
  scanned: false,
  restaurant: {
    _id: "",
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    plats: [],
    boisson: [],
    tables: [],
  }
};

export const userSessionSlice = createSlice({
  name: "userSession",
  initialState,

  reducers: {
    scanned: (state: UserSession, action: PayloadAction<UserSessionAction["payload"]>) => {
      const { payload } = action;
      state.scanned = payload.scanned;
      state.restaurant = payload.restaurant;
      saveState(state);
    },
  },
});

export const { scanned } = userSessionSlice.actions;
