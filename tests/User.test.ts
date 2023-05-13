import { test } from "vitest";
import { changeDateFormat } from "../src/features/users/User.jsx";

test("Should correctly change date format from mongoDB to GB - i.e. 18/03/2023", () => {
  const mongoDBDate: string = "2023-03-18T20:06:37.926Z";
  const expected: string = "18/03/2023";
  const actual = changeDateFormat(mongoDBDate);
  expect(actual).toBe(expected);
});

// test("Should handle different data types with message", () => {
//   const number: number = 123;
//   const expected: string = "Not a string";
//   const actual: string = changeDateFormat(number); // ts normal error
//   expect(actual).toBe(expected);
// });

test("Should handle empty strings just in case", () => {
  const emptyString: string = "";
  const expected: string = "Empty date";
  const actual: string = changeDateFormat(emptyString);
  expect(actual).toBe(expected);
});
