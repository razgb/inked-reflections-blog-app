export const initialState = {
  initialEmailFocus: true,
  email: "",
  emailError: false,
  emailMessage: "",
  password: "",
  passwordError: false,
  passwordMessage: "",
  confirmPassword: "",
  strength: "",
};

export function signupReducer(state, action) {
  switch (action.type) {
    case "initialEmailFocus":
      return {
        ...state,
        initialEmailFocus: action.payload,
      };
    case "changeEmail": {
      return {
        ...state,
        email: action.payload,
        emailError: initialState.emailError,
        emailMessage: initialState.emailMessage,
      };
    }
    case "changePassword": {
      return {
        ...state,
        password: action.payload,
        passwordError: initialState.passwordError,
        passwordMessage: initialState.passwordMessage,
      };
    }
    case "changeConfirmPassword":
      return {
        ...state,
        confirmPassword: action.payload,
      };
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    case "error":
      // this case receives validation error object.
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error(
        "Invalid action type used inside signupReducer function."
      );
  }
}
