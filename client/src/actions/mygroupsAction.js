import { GET_ALL_GROUP } from "./types";
import ApiRequest from "../backendRequestAPI"
import axios from "axios";

export const getAllmyGroups = (Data) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(Data)
    axios.post(`${ApiRequest}/group/getgroups`, Data)
        .then(response =>{ dispatch({
            type: GET_ALL_GROUP,
            payload: response.data
        }) 
        console.log(response.data)})
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: GET_ALL_GROUP,
                    payload: error.response.data
                });
            }
        });
}