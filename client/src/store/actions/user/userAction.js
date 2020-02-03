import axios from "axios";
import { baseUrl } from "../../../config/server";

let config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("payld_token")
  }
};

export const getUser = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: "REQUESTING_SOMETHING" });

      // Make async request
      axios
        .get(baseUrl + "/user/getInfo", config)
        .then(res => {
          dispatch({ type: "GOTTEN_USER", data: res.data.data });
          resolve();
        })
        .catch(err => {
          console.log(err.response.data.message);
          dispatch({ type: "USER_ERROR" });
          reject();
        });
    });
  };
};

export const updateUserProfile = credentials => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: "REQUESTING_SOMETHING" });

      // Make async request
      axios
        .put(baseUrl + "/user/update/profile", credentials, config)
        .then(res => {
          dispatch({ type: "UPDATED_USER", data: res.data.data });
          resolve();
        })
        .catch(err => {
          console.log(err.response.data.message);
          dispatch({ type: "USER_ERROR" });
          reject();
        });
    });
  };
};
