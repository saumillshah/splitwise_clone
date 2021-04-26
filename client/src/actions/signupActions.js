import { USER_SIGNUP } from "./types";
import ApiRequest from "../backendRequestAPI"
import axios from "axios";

export const  userSignup = (userData) =>async dispatch => {
    axios.defaults.withCredentials = true;
    await axios.post(`${ApiRequest}/auth/signup`, userData)
        .then(response => dispatch({
            type: USER_SIGNUP,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: USER_SIGNUP,
                    payload: error.response.data
                });
            }
            return;
        });
}