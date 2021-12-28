import createDataContext from "./createDataContext";
import {
  RESULT_DEFAULT,
  RESULT_LOADING,
  LOADING,
  GETBIRTHDAY,
  ADDBIRTHDAY,
  DELETEBIRTHDAY,
  RESULT_SUCCESS,
  RESULT_FAILURE,
} from "./ActionType";
import { getDatabase, ref, set, push, get, child } from "firebase/database";

const initialState = {
  result: RESULT_DEFAULT,
  data: "",
};

const birthdayReducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, result: RESULT_LOADING };
    case GETBIRTHDAY:
      return {
        ...state,
        result: action.hasSucceeded ? RESULT_SUCCESS : RESULT_FAILURE,
        data: action.hasSucceeded ? action.data : "",
      };
    case ADDBIRTHDAY:
      return {
        ...state,
        result: action.hasSucceeded ? RESULT_SUCCESS : RESULT_FAILURE,
        data: [...state.data, action.data],
      };
    case DELETEBIRTHDAY:
      return {
        ...state,
        result: action.hasSucceeded ? RESULT_SUCCESS : RESULT_FAILURE,
      };
    default:
      return state;
  }
};

const getBirthday = (dispatch) => {
  return async ({ token }) => {
    dispatch({
      type: LOADING,
    });

    const dbRef = ref(getDatabase());
    get(child(dbRef, `${token}/people`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const people = [];

          snapshot.forEach((item) => {
            const temp = item.val();
            people.push({ ...temp, id: item.key });
          });

          dispatch({
            type: GETBIRTHDAY,
            hasSucceeded: true,
            data: people,
          });
        } else {
          console.log("No data available");

          dispatch({
            type: GETBIRTHDAY,
            hasSucceeded: false,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: GETBIRTHDAY,
          hasSucceeded: false,
        });
      });
  };
};

const addBirthday = (dispatch) => {
  return async ({ token, image, name, email, phone, date }) => {
    dispatch({
      type: LOADING,
    });

    const newItem = {
      image: image ? image : "",
      name: name ? name : "",
      email: email ? email : "",
      phone: phone ? phone : "",
      date: date ? date : "",
    };
    const postListRef = ref(getDatabase(), token + "/people");
    const newPostRef = push(postListRef);
    set(newPostRef, newItem)
      .then(() => {
        dispatch({
          type: ADDBIRTHDAY,
          hasSucceeded: false,
          data: { ...newItem, id: newPostRef.key }, //Adding newly generated key in our local object for flatlist
        });
      })
      .catch((error) => {
        console.error(error);

        dispatch({
          type: ADDBIRTHDAY,
          hasSucceeded: false,
        });
      });
  };
};

const deleteBirthday = (dispatch) => {
  return async () => {
    dispatch({
      type: LOADING,
    });

    try {
      dispatch({
        type: GETBIRTHDAY,
        hasSucceeded: true,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: GETBIRTHDAY,
        hasSucceeded: false,
      });
    }
  };
};

export const { Context, Provider } = createDataContext(
  birthdayReducer,
  {
    getBirthday: getBirthday,
    addBirthday: addBirthday,
    deleteBirthday: deleteBirthday,
  },
  initialState
);
