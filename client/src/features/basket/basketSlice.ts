import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {IBasketDetails} from "../../utils/interface/basketDetailsInterface";

interface IInitialState {
  basketProductCount: number;
  basket: IBasketDetails[];
}


const initialState: IInitialState = {
  basketProductCount: 0,
  basket: []
};

export const getDetailsBasket = createAsyncThunk(
  "getDetailsBasket/basketSlice",
  async (_, thunkAPI: any) => {
    try {
      const response = await axios("/basket/details", {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().userSlice.token}`
        }
      });

      return {
        basket: response.data.basket
      };

    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


const basketSlice = createSlice({
  name: "basketSlice",
  initialState,
  reducers: {
    incrementCountBasketProductItem: (state, action) => {
      state.basket = state.basket.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            count: item.count + 1
          };
        }
        return item;
      });
    },
    decrementCountBasketProductItem: (state, action) => {
      state.basket = state.basket.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            count: item.count - 1
          };
        }
        return item;
      });
    },
    removeBasketProductItem: (state, action) => {
      state.basket = state.basket.filter(item => item.product.id !== action.payload.productId);
    },
    zeroingBasket: (state) => {
      state.basket = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailsBasket.pending, (state) => {
      })
      .addCase(getDetailsBasket.fulfilled, (state, action) => {
        state.basket = action.payload.basket;
      })
      .addCase(getDetailsBasket.rejected, (state) => {
      });
  }
});

export const {
  incrementCountBasketProductItem,
  decrementCountBasketProductItem,
  removeBasketProductItem,
  zeroingBasket
} = basketSlice.actions;
export default basketSlice.reducer;