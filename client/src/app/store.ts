import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userSlice from "../features/user/userSlice"
import producersSlice from "../features/producers/producersSlice"


export const store = configureStore({
  reducer: {userSlice, producersSlice},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
