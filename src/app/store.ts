import { sessionSlice } from "../feature/session.slice";
import { userSessionSlice } from "../feature/userSession.slice";
import { restoCartSlice } from "../feature/restoCart.slice";

import { configureStore } from "@reduxjs/toolkit";
import { RestaurantCart, Session, UserSession } from "../_interface";

export const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
    userSession: userSessionSlice.reducer,
    restoCart: restoCartSlice.reducer,
  },
});

export type RootState = {
  session: Session;
  userSession: UserSession;
  restoCart: RestaurantCart;
};