import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import producersSlice from "../features/producers/producersSlice";
import productSlice from "../features/products/productsSlice";
import productItemSlice from "../features/products/productItemSlice";
import basketSlice from "../features/basket/basketSlice";
import ordersSlice from "../features/orders/ordersSlice";


export const store = configureStore({
  reducer: {userSlice, producersSlice, productSlice, productItemSlice, basketSlice, ordersSlice}
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
