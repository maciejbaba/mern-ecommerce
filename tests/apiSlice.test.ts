import { test } from "vitest";
import { baseUrl } from "../src/app/api/apiSlice";
import { apiSlice } from "../src/app/api/apiSlice";

test("baseUrl", () => {
  if (window.location.origin.includes("localhost")) {
    expect(baseUrl).toBe("http://localhost:3500");
  } else {
    expect(baseUrl).toBe("https://mern-ecommerce-api-pt6x.onrender.com");
  }
});

test("apiSlice", () => {
  expect(apiSlice).toBeDefined();
});
