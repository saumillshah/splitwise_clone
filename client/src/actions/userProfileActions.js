import { GET_USER, UPDATE_USER } from "./types";
import ApiRequest from "../backendRequestAPI"
import axios from "axios";

export const getUser = () => dispatch => {
    axios.get(`${ApiRequest}/profile/${localStorage.getItem("user_id")}`)
        .then(response => {
       
            console.log(response.data)
            if(response){
                localStorage.setItem("name", response.data.name)
                localStorage.setItem("email", response.data.email)
                localStorage.setItem("phone_number", response.data.phone_number)
                localStorage.setItem("currency", response.data.currency)
                localStorage.setItem("user_language", response.data.language)
                localStorage.setItem("timezone", response.data.timezone)
            }
           return dispatch({
            type: GET_USER,
            payload: response.data
        })
    })
        .catch(error => {
            console.log(error);
        });
}

export const updateUser = (userProfileData) => dispatch => {
    axios.defaults.withCredentials = true;
    axios.post(`${ApiRequest}/profile/userUpdate`, userProfileData)
        .then(response => {
       
            if (response.data === 'USER_UPDATED') {
                localStorage.setItem("name", userProfileData.name);
                alert("Profile Updated Successfully!");
            }
            return dispatch({
                type: UPDATE_USER,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error);
        });
}