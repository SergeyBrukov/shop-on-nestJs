import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {notify} from "../../elements/toastify/toastify";
import {TypeToastify} from "../../utils/enums/enums";
import {zeroingBasketProduct} from "../user/userSlice";
import {zeroingBasket} from "../basket/basketSlice";

interface IInitialState {
}

const initialState: IInitialState = {};

export const createOrderByUser = createAsyncThunk<any, any>(
  "ordersSlice/createOrderByUser",
  async (data, thunkAPI: any) => {
    try {
      const response = await axios.post("/orders", data, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().userSlice.token}`
        }
      });

      thunkAPI.dispatch(zeroingBasketProduct());
      thunkAPI.dispatch(zeroingBasket());

      return {
        message: response.data.message
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const ordersSlice = createSlice({
  name: "ordersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderByUser.pending, () => {
      })
      .addCase(createOrderByUser.fulfilled, (state, action) => {
        notify(action.payload.message, TypeToastify.SUCCESS);
      })
      .addCase(createOrderByUser.rejected, () => {
      });
  }
});

export default ordersSlice.reducer;