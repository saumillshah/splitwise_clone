import { RECENT_DATA } from "./types";
import ApiRequest from "../backendRequestAPI"
import axios from "axios";

export const  getRecentData = (userData) =>async dispatch => {
    axios.defaults.withCredentials = true;
    await axios.post(`${ApiRequest}/expense/recentActivity`, userData)
        .then(response => dispatch({
            type: RECENT_DATA,
            payload: response.data
        }))
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: RECENT_DATA,
                    payload: error.response.data
                });
            }
            return;
        });
}