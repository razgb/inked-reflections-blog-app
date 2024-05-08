import { auth } from "../../main";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function signupUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log(user);

    // CREATE USER IN FIRESTORE

    return {
      isValidated: user.emailVerified,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
    throw error;
  }
}

/*
Notes: 

1. name upload as displayName to userauth. 
2. username upload to user collections. 
3. maybe rearange data structure in firebase? 
*/
