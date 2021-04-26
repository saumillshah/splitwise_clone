import { GET_ALL_USER, ADD_GROUP } from '../actions/types';

 const initialState = {
     allUsers: {},
     addgroup: {},
   
 };

 // eslint-disable-next-line import/no-anonymous-default-export
 const createGroup= (state = initialState, action)=>{
    switch(action.type){
        case GET_ALL_USER:
            console.log(action.payload)
            return {
                ...state,
                allUsers: action.payload
            };
        case ADD_GROUP:
            return {
                ...state,
                addgroup: action.payload
            };
            // case GET_GROUP:
            //     return {
            //         ...state,
            //         allGroups: action.payload
            //     };
        default:
            return state;
    }
 };
 export default createGroup;