import { validateTextWidget } from "../../validateTextWidget";

export function validateTextArray(textArray) {
  // NEW SANITIZATION FUNCTION SHOULD BE HERE

  return {
    isError: false,
    title: null,
    message: null,
  };

  // const allTextIsValid = textArray.every((text) => validateTextWidget(text));
  // if (!allTextIsValid) {
  //   return {
  //     isError: true,
  //     title: "Invalid character used.",
  //     message:
  //       "Allowed special characters: $, #, !, %, brackets, commas, single & double quotes, and semicolons.",
  //   };
  // } else {
  //   return {
  //     isError: false,
  //     title: null,
  //     message: null,
  //   };
  // }
}
