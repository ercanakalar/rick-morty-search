import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedDataItem {
  id: string;
  name: string;
  character_image_url: string;
  episode_number: number;
  isSelected?: boolean;
}

interface KeepSelectedDataState {
  selectedData: SelectedDataItem[];
  inputValue: string;
}

const initialState: KeepSelectedDataState = {
  selectedData: [],
  inputValue: '',
};

const keepSelectedDataSlice = createSlice({
  name: 'keepSelectedData',
  initialState,
  reducers: {
    setSelectedData: (state, action: PayloadAction<{ type: string; payload: any }>) => {
      switch (action.payload.type) {
        case 'add':
          state.selectedData.push({ ...action.payload.payload});
          break;
        case 'remove':
          state.selectedData = state.selectedData.filter(
            (item) => item.id !== action.payload.payload.id
          );
          break;
        default:
          break;
      }
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    }
  },
});

export const { setSelectedData, setInputValue } = keepSelectedDataSlice.actions;

export default keepSelectedDataSlice.reducer;
