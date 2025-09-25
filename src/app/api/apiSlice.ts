import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export let baseUrl: string = import.meta.env.VITE_API_URL || "http://localhost:3500";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Item", "User"],
  endpoints: () => ({}),
});
