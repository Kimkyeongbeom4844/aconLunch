import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const menuListApi = createApi({
  reducerPath: "menuListApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/menuList.json" }),
  endpoints: (builder) => ({
    getMenuList: builder.query({
      query: () => "",
    }),
  }),
});

export const { useGetMenuListQuery } = menuListApi;
