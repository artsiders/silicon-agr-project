import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Restaurant, Session } from "../_interface";


interface RestaurantAction {
  payload: Restaurant;
  type: string;
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("session");
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state: Session) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("session", serializedState);
  } catch (err) {
    console.error("Error saving state to LocalStorage:", err);
  }
};
const initialState: Session = loadState() || {
  token: "",
  connected: false,
  restaurant: {
    _id: "",
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    plats: [],
    boissons: [],
    tables: [],
  }
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,

  reducers: {
    connect: (state: Session, action) => {
      const { payload } = action;
      state.token = payload.token;
      state.connected = payload.connected;
      state.restaurant = payload.restaurant;
      saveState(state);
    },

    disconnect: (state: Session) => {
      state.token = "";
      state.connected = false;
      state.restaurant = {
        _id: "",
        name: "",
        address: "",
        phoneNumber: "",
        email: "",
        password: "",
        plats: [],
        boissons: [],
        tables: [],
      };
      saveState(state);
    },

    updateRestoSession: (state: Session, action: PayloadAction<RestaurantAction["payload"]>) => {
      const { payload } = action;
      state.restaurant = payload;
      saveState(state);
    },
  },
});

export const { connect, disconnect, updateRestoSession } = sessionSlice.actions;
