import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProductInterfaceResponse} from "../../utils/interface/productInterface";
import axios from "axios";
import {TProductDetail} from "../../utils/type/productType";

interface IInitialState {
  loading: boolean;
  product: TProductDetail | null;
}

const initialState: IInitialState = {
  loading: true,
  product: null
};

export const getProductById = createAsyncThunk<ProductInterfaceResponse, string>(
  "getProductById/productSlice",
  async (id, thunkAPI: any) => {
    try {
      const response = await axios(`/product/${id}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().userSlice.token}`
        }
      });

      return {
        product: response.data
      };

    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const productItemSlice = createSlice({
  name: "productItemSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<ProductInterfaceResponse>) => {
        state.product = action.payload.product;
        state.loading = false;
      })
      .addCase(getProductById.rejected, (state) => {
        state.loading = false;
      })
  }
});

export default productItemSlice.reducer