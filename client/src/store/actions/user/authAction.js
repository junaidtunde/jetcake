import toastr from "../../../assets/toast";
import axios from "axios";
import { baseUrl } from "../../../config/server";

export const signIn = credentials => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: "REQUESTING" });

      // Make async request
      axios
        .post(baseUrl + "/user/login", credentials)
        .then(res => {
          localStorage.setItem("payld_token", res.data.token);
          toastr.showSuccessToast("User login was successful");
          dispatch({ type: "SUCCESSFUL" });
          resolve();
        })
        .catch(err => {
          toastr.showDangerToast(err.response.data.message);
          dispatch({ type: "ERROR" });
          reject(err.response.data.message);
        });
    });
  };
};

export const register = credentials => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({ type: "REQUESTING" });

      // Make async request
      axios
        .post(baseUrl + "/user/register", credentials)
        .then(res => {
          // localStorage.setItem("payld_token", res.data.token);
          toastr.showSuccessToast("User registration was successful");
          dispatch({ type: "SUCCESSFUL" });
          resolve();
        })
        .catch(err => {
          console.error(err);
          toastr.showDangerToast(err.response.data.message);
          dispatch({ type: "ERROR" });
          reject(err.response.data.message);
        });
    });
  };
};
