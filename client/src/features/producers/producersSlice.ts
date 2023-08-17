import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {ProducerResponseInterface} from "../../utils/interface/producerInterface";

interface IInitialState extends ProducerResponseInterface {
  loading: boolean;
}


const initialState: IInitialState = {
  producers: [],
  loading: true
};

export const getProducers = createAsyncThunk<ProducerResponseInterface>(
  "getProducers/producersSlice",
  async (_, thunkAPI: any) => {
    try {
      const response = await axios("/producer", {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().userSlice.token}`
        }
      });

      return {
        producers: response.data.producers
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const producersSlice = createSlice({
  name: "producersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducers.fulfilled, (state, action) => {
        state.producers = action.payload.producers;
        state.loading = false;

      })
      .addCase(getProducers.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default producersSlice.reducer;