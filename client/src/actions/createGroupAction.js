import { GET_ALL_USER, ADD_GROUP } from "./types";
import ApiRequest from "../backendRequestAPI"
import axios from "axios";

export const getAllUsers = (Data) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(Data)
    axios.post(`${ApiRequest}/group/creategroup/getUser`, Data)
        .then(response =>{ dispatch({
            type: GET_ALL_USER,
            payload: response.data
        }) 
        console.log(response.data)})
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: GET_ALL_USER,
                    payload: error.response.data
                });
            }
        });
}

export const addGroup = (Data) => dispatch => {
    axios.defaults.withCredentials = true;
    console.log(Data)
    axios.post(`${ApiRequest}/group/addgroup`, Data)
        .then(response =>{ dispatch({
            type: ADD_GROUP,
            payload: response.data
        }) 
        console.log(response.data)})
        .catch(error => {
            if (error.response && error.response.data) {
                return dispatch({
                    type: ADD_GROUP,
                    payload: error.response.data
                });
            }
        });
}

// export const getAllGroups = (Data) => dispatch => {
//     axios.defaults.withCredentials = true;
//     console.log(Data)
//     axios.post(`${ApiRequest}/group/getgroups`, Data)
//         .then(response =>{ dispatch({
//             type: GET_GROUP,
//             payload: response.data
//         }) 
//         console.log(response.data)})
//         .catch(error => {
//             if (error.response && error.response.data) {
//                 return dispatch({
//                     type: GET_GROUP,
//                     payload: error.response.data
//                 });
//             }
//         });
// }