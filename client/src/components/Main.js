import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Landing } from "./landing";
import Login from "./login";
import Signup from './Signup';
import Dashboard from './Dashboard/Dashboard';
import Profile from './profile/UserProfile';
// import New from './group/new'
import Group from './group/group'
import CreateGroup from './group/CreateGroup'
import Comment from './group/comment'
import RecentActivity from './Dashboard/RecentActivity'
// import Recentactivity from './Recentactivity';

import MyGroup from './group/mygroup';

const Main = ()=> {
   
        return (
            <div>
            <Switch>
            

            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/dashboard" component={Dashboard} />
          

                <Route exact path="/" component={Landing}></Route>
                <Route exact path="/profile" component={Profile} />

            
            
           
            
                <Route exact path="/recentactivity" component={RecentActivity} />
          
            <Route exact path="/createGroup" component={CreateGroup} />
            <Route exact path="/groups/:id" component={Group}/>
            <Route exact path="/comment/:id/:id" component={Comment}/>
            <Route exact path="/mygroup" component={MyGroup}/>
            {
                // <Route exact path="/recentactivity" component={Recentactivity}/>
               
                // <Route exact path="/group/new" component={New} />
            }
           
            </Switch>
            </div>
        )
    }

export default Main;