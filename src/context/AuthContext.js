import createDataContext from "./createDataContext";
import { AUTHENTICATE, SIGNIN, SIGNOUT, SIGNUP } from "./ActionType";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as logoff,
} from "firebase/auth";
import { auth } from "../firebase/Firebase";

const initialState = {
  token: "",
};

const authenticationReducer = (state, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return { ...state, token: action.token };
    case SIGNIN:
      return { ...state, token: action.token };
    case SIGNUP:
      return { ...state, token: action.token };
    case SIGNOUT:
      return { ...state, token: "" };
    default:
      return state;
  }
};

function checkAuthStatus() {
  return new Promise((resolve, reject) => {
    try {
      auth.onAuthStateChanged((user) => resolve(user));
    } catch (err) {
      reject(err);
    }
  });
}

const authenticate = (dispatch) => {
  return async () => {
    const user = await checkAuthStatus();
    if (user) {
      console.log("User is already logged in!");
      dispatch({
        type: AUTHENTICATE,
        token: user.uid,
      });
    }
  };
};

const signUp = (dispatch) => {
  return async ({ username, password }) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );

      dispatch({
        type: SIGNUP,
        token: user.user.uid,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SIGNUP,
        token: "",
      });
    }
  };
};

const signIn = (dispatch) => {
  return async ({ username, password }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, username, password);

      dispatch({
        type: SIGNIN,
        token: user.user.uid,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SIGNIN,
        token: "",
      });
    }
  };
};

const signOut = (dispatch) => {
  return async () => {
    try {
      await logoff(auth);

      dispatch({
        type: SIGNOUT,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SIGNOUT,
      });
    }
  };
};

export const { Context, Provider } = createDataContext(
  authenticationReducer,
  {
    authenticate: authenticate,
    signUp: signUp,
    signIn: signIn,
    signOut: signOut,
  },
  initialState
);
