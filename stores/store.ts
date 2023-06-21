import { configureStore } from "@reduxjs/toolkit";
import { menuListApi } from "./services/menuList";

export const store = configureStore({
  reducer: {
    [menuListApi.reducerPath]: menuListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menuListApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
