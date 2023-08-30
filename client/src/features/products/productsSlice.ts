import {TProduct} from "../../utils/type/productType";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {ProductsInterfaceResponse} from "../../utils/interface/productInterface";
import {removeBasketProductItem} from "../basket/basketSlice";

interface IInitialState {
  loading: boolean;
  products: TProduct[];
}

const initialState: IInitialState = {
  loading: false,
  products: []
};

export const getAllProduct = createAsyncThunk<ProductsInterfaceResponse>(
  "getAllProduct/productSlice",
  async (_, thunkAPI: any) => {
    try {
      const response = await axios("/product", {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().userSlice.token}`
        }
      });


      return {
        products: response.data
      };

    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*GET ALL PRODUCTS*/
      .addCase(getAllProduct.pending, () => {
      })
      .addCase(getAllProduct.fulfilled, (state, action: PayloadAction<ProductsInterfaceResponse>) => {
        state.products = action.payload.products;
      })
      .addCase(getAllProduct.rejected, () => {
      });
  }
});

export default productSlice.reducer;