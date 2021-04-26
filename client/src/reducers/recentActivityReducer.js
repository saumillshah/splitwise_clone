import { RECENT_DATA } from "../actions/types";

const initialState = {
    recentData: {}
};

// eslint-disable-next-line import/no-anonymous-default-export
 const recentActivityReducer = (state = initialState, action)=> {
  switch (action.type) {
    case RECENT_DATA:
      console.log(action.payload)
      return {
        ...state,
        recentData: action.payload
      };
   
    default:
      return state;
  }
}
export default recentActivityReducer;