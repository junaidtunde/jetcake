import { Action } from "../types";

const initState = {
  user: null,
  loading: false,
  submit: false
};

const userReducer = (state = initState, action: Action) => {
  switch (action.type) {
    case "GOTTEN_USER":
      return {
        ...state,
        user: action.data,
        loading: false
      };

    case "UPDATED_USER":
      return {
        ...state,
        user: action.data,
        loading: false
      };

    case "REQUESTING_SOMETHING":
      return {
        ...state,
        loading: true
      };

    case "USER_ERROR":
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};

export default userReducer;
