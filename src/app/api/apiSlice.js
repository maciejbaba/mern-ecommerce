import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export let baseUrl = "https://mern-ecommerce-api-pt6x.onrender.com";

if (window.location.origin.includes("localhost")) {
  baseUrl = "http://localhost:3500";
}


export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Item", "User"],
  endpoints: (builder) => ({}),
});
