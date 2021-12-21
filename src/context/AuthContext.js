import createDataContext from "./createDataContext";

const authenticationReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialState = {
  isAuthenticating: false,
};

export const { Context, Provider } = createDataContext(
  authenticationReducer,
  {},
  initialState
);
