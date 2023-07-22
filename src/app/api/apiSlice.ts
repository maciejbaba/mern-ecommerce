import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export let baseUrl: string = "https://mern-ecommerce-api-pt6x.onrender.com";

if (window.location.origin.includes("localhost")) {
  baseUrl = "http://192.168.0.14:3500"; // my server ip on local network
  // baseUrl = "http://localhost:3500"; // dev server
}

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Item", "User"],
  endpoints: builder => ({}),
});
