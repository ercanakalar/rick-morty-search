import { createSlice } from '@reduxjs/toolkit';

import { getCharacterByName } from '../../../libs/characters/get-by-name';

const initialState: { loading: boolean; getCharactersByName: any; error: any } =
  {
    loading: false,
    getCharactersByName: [],
    error: [],
  };

const getByNameSlice = createSlice({
  name: 'getByName',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharacterByName.pending, (state) => {
      state.loading = true;
      state.error = [];
    });
    builder.addCase(getCharacterByName.fulfilled, (state, action: any) => {
      state.loading = false;
      state.getCharactersByName = action.payload.data;
      state.error = [];
    });
    builder.addCase(getCharacterByName.rejected, (state, action) => {
      state.loading = false;
      state.getCharactersByName = [];
      state.error = action.payload ?? 'Something went wrong';
    });
  },
});

export default getByNameSlice.reducer;
