import { combineReducers } from 'redux';
// import customerProfileReducer from './customerProfileReducer'
// import ownerProfileReducer from './ownerProfileReducer'
import signupReducer from './signupReducer';
import loginReducer from './loginReducer';
import createGroup from './createGroupReducer';
import getAllGroups from './mygroupsReducer';
import userProfileReducer from "./userProfileReducer";
import getAllmyGroups from "./mygroupsReducer"
import recentActivityReducer from "./recentActivityReducer"

export default combineReducers({
    login: loginReducer,
    signup: signupReducer,
    userProfile: userProfileReducer,
    createGroup: createGroup,
    getAllGroups: getAllGroups,
    myGroups: getAllmyGroups,
    recentActivity:recentActivityReducer,
    // customerProfile: customerProfileReducer,
    // ownerProfile: ownerProfileReducer
});