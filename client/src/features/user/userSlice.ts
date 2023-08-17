import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RegisterInterface} from "../../utils/interface/registerInterface";
import {TResponseUserData, TUser} from "../../utils/type/userType";
import axios from "axios";
import {LoginInterface} from "../../utils/interface/loginInterface";
import {operationWithLocalStorage} from "../../utils/customFunk/operationWithLocalStorage";
import {ETypeOperationWithLocalStorage, TypeToastify} from "../../utils/enums/enums";
import {GoogleAuthInterface} from "../../utils/interface/googleAuthInterface";
import {notify} from "../../elements/toastify/toastify";

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

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    handleLogout: (state) => {
      operationWithLocalStorage("token", ETypeOperationWithLocalStorage.remove);
      state.user = null;
      state.token = null;
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
        notify(action.payload.response.data.message, TypeToastify.ERROR)
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
        notify(action.payload.response.data.message, TypeToastify.ERROR)
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
        notify(action.payload.response.data.message, TypeToastify.ERROR)
      })

      /*Profile user*/
      .addCase(handleProfileApi.pending, (state) => {
      })
      .addCase(handleProfileApi.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(handleProfileApi.rejected, (state, action: any) => {
        notify(action.payload.response.data.message, TypeToastify.ERROR)
      });
  }
});

export const {handleLogout} = userSlice.actions;
export default userSlice.reducer;