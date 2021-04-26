import { GET_ALL_GROUP } from '../actions/types';

 const initialState = {
     allGroups: {},
 };

 // eslint-disable-next-line import/no-anonymous-default-export
 const getAllmyGroups = (state = initialState, action)=>{
    switch(action.type){
        case GET_ALL_GROUP:
            console.log(action.payload)
            return {
                ...state,
                allGroups: action.payload
            };
        default:
            return state;
    }
 };
 export default getAllmyGroups;