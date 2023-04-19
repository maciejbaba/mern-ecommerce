import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://mern-ecommerce-api-pt6x.onrender.com" }),
  tagTypes: ["Item", "User"],
  endpoints: (builder) => ({}),
});
