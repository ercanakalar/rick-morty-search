import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCharacterByName = createAsyncThunk(
  '/characters/by-name',
  async (name:string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?name=${name}`
      );

      return response;
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.response.data.error);
    }
  }
);
