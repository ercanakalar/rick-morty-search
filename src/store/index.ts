import { configureStore } from '@reduxjs/toolkit';

import getByNameSlice from './slice/data/get-by-name';
import keepSelectedDataSlice from './slice/data/keep-selected-data';

const store = configureStore({
  reducer: {
    getCharactersByName: getByNameSlice,
    keepSelectedData: keepSelectedDataSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
