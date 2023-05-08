import { test } from "vitest";
import { changeDateFormat } from "../src/features/users/User.jsx";

test("changeDateFormat", () => {
  const mongoDBDate = "2023-03-18T20:06:37.926Z";
  const expected = "18/03/2023";
  const actual = changeDateFormat(mongoDBDate);
  expect(actual).toBe(expected);
});
