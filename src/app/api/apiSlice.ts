import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export let baseUrl: string = "http://localhost:3500";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Item", "User"],
  endpoints: () => ({}),
});
