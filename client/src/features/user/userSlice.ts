import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RegisterInterface} from "../../utils/interface/registerInterface";
import {TResponseBasketAddProduct, TResponseUserData, TUser} from "../../utils/type/userType";
import axios from "axios";
import {LoginInterface} from "../../utils/interface/loginInterface";
import {operationWithLocalStorage} from "../../utils/customFunk/operationWithLocalStorage";
import {ETypeOperationWithLocalStorage, TypeToastify} from "../../utils/enums/enums";
import {GoogleAuthInterface} from "../../utils/interface/googleAuthInterface";
import {notify} from "../../elements/toastify/toastify";
import {removeBasketProductItem} from "../basket/basketSlice";

interface IInitialState {
  loading: boolean
  user: TUser | null,
  token: string | null
}

const initialState: IInitialState = {
  loading: false,
  user: null,
  token: localStorage.getItem("token")
};

export const handleGoogleAuth = createAsyncThunk<TResponseUserData, GoogleAuthInterface>(
  "handleGoogleAuth/userSlice",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/auth/google", data);
      return {
        user: response.data.user,
        token: response.data.token,
        status: response.status
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const handleRegisterApi = createAsyncThunk<TResponseUserData, RegisterInterface>(
  "handleRegister/userSlice",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/auth/registration", data);

      return {
        user: response.data.user,
        token: response.data.token,
        status: response.status
      };

    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const handleLoginApi = createAsyncThunk<TResponseUserData, LoginInterface>(
  "handleLogin/userSlice",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/auth/login", data);

      return {
        user: response.data.user,
        token: response.data.token,
        status: response.status
      };

    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


export const handleProfileApi = createAsyncThunk<Omit<TResponseUserData, "token">>(
  "handleProfile/userSlice",
  async (_, thunkAPI: any) => {
    try {
      const response = await axios("/auth/profile", {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().userSlice.token}`
        }
      });
      return {
        user: response.data.user,
        status: response.status
      };

    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

/*BASKET*/

export const handleAddProductInUserBasket = createAsyncThunk<TResponseBasketAddProduct, number>(
  "userSlice/handleAddProductInUserBasket",
  async (productId, thunkAPI: any) => {
    try {
      await axios.post("/basket-product", {productId}, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().userSlice.token}`
        }
      });
      return {
        productId
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


export const handleRemoveProductFromUserBasket = createAsyncThunk<TResponseBasketAddProduct, number>(
  "userSlice/handleRemoveProductFromUserBasket",
  async (productId, thunkAPI: any) => {
    try {
      await axios.delete(`/basket-product/${productId}`, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().userSlice.token}`
        }
      });

      thunkAPI.dispatch(removeBasketProductItem({productId}));

      return {
        productId
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    handleLogout: (state) => {
      operationWithLocalStorage("token", ETypeOperationWithLocalStorage.remove);
      state.user = null;
      state.token = null;
    },
    handleAddProductInToUserBasketReducer: (state, action) => {
      state.user?.basket.products.push({productId: action.payload.productId, count: 1});
    },
    handleRemoveProductFromUserBasketReducer: (state, action) => {
      state.user = {
        ...state.user,
        basket: {
          ...state.user?.basket,
          //@ts-ignore
          products: state.user?.basket.products.filter(item => item.productId !== action.payload.productId)
        }
      };
    },
    zeroingBasketProduct: (state) => {
      // @ts-ignore
      state.user = {
        ...state.user,
        basket: {
          ...state.user?.basket,
          products: []
        }
      };
    }
  },

  extraReducers: builder => {
    builder
      /*Google Auth user*/
      .addCase(handleGoogleAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleGoogleAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        operationWithLocalStorage("token", ETypeOperationWithLocalStorage.ADD, action.payload.token);
      })
      .addCase(handleGoogleAuth.rejected, (state, action: any) => {
        state.loading = false;
        notify(action.payload.response.data.message, TypeToastify.ERROR);
      })

      /*Register user*/
      .addCase(handleRegisterApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleRegisterApi.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;

        operationWithLocalStorage("token", ETypeOperationWithLocalStorage.ADD, action.payload.token);
      })
      .addCase(handleRegisterApi.rejected, (state, action: any) => {
        state.loading = false;
        notify(action.payload.response.data.message, TypeToastify.ERROR);
      })

      /*Login user*/
      .addCase(handleLoginApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleLoginApi.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;

        operationWithLocalStorage("token", ETypeOperationWithLocalStorage.ADD, action.payload.token);
      })
      .addCase(handleLoginApi.rejected, (state, action: any) => {
        state.loading = false;
        notify(action.payload.response.data.message, TypeToastify.ERROR);
      })

      /*Profile user*/
      .addCase(handleProfileApi.pending, (state) => {
      })
      .addCase(handleProfileApi.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(handleProfileApi.rejected, (state, action: any) => {
        notify(action.payload.response.data.message, TypeToastify.ERROR);
      })

      /*User basket*/
      .addCase(handleAddProductInUserBasket.pending, (state) => {
      })
      .addCase(handleAddProductInUserBasket.fulfilled, (state, action: PayloadAction<TResponseBasketAddProduct>) => {
        userSlice.caseReducers.handleAddProductInToUserBasketReducer(state, action);
      })
      .addCase(handleAddProductInUserBasket.rejected, (state, action: any) => {
        notify(action.payload.response.data.message, TypeToastify.ERROR);
      })

      /*Delete product from user basket*/
      .addCase(handleRemoveProductFromUserBasket.pending, (state) => {
      })
      .addCase(handleRemoveProductFromUserBasket.fulfilled, (state, action: PayloadAction<TResponseBasketAddProduct>) => {
        userSlice.caseReducers.handleRemoveProductFromUserBasketReducer(state, action);
      })
      .addCase(handleRemoveProductFromUserBasket.rejected, (state, action: any) => {
        notify(action.payload.response.data.message, TypeToastify.ERROR);
      });
  }
});

export const {handleLogout, zeroingBasketProduct} = userSlice.actions;
export default userSlice.reducer;