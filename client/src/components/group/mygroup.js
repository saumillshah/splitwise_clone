import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllmyGroups } from "../../actions/mygroupsAction";
import PropTypes from "prop-types";
// import DashboardNavbar from "../components/Dashboard/DashboardNavbar";
// import "../styles/dashboard.css";
import { connect } from "react-redux";
// import "../styles/signup.css";
import ApiRequest from "../../backendRequestAPI";
import axios from "axios";
import DashboardNav from "../Dashboard/DashboardNav";

export class MyGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      email: localStorage.getItem("email"),
      user_id: localStorage.getItem("user_id"),
    };
  }
  //To get the all  groups where user is member of those groups
  componentDidMount() {
    document.title = "My Group";
    const user_data = { user_id: this.state.user_id };
    console.log("Members data", user_data);

    this.props.getAllmyGroups(user_data);

    console.log(this.props.allGroups)
    // this.setState({
    //   groups: this.props.allGroups,
    // })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("prev", prevState.groups);
    console.log("new", this.state.groups);

    if (prevState.groups !== this.props.allGroups) {
      console.log("Updated", this.props.allGroups);
      this.setState({
        groups: this.props.allGroups,
      });
      console.log("groupdata", this.state.groups);
    }
  }
  //to change the isAccepted status true
  onJoinClick = (group_id) => {
    console.log(group_id);
    const groupData = { group_id: group_id, currentUser: this.state.user_id, status:"Accept" };
    console.log("groupData", groupData);
    axios.defaults.withCredentials = true;
    axios
      .post(`${ApiRequest}/group/acceptinvite`, groupData)
      .then((response) => {
        console.log("Response after Axios call", response);
        if (response.data === "Accepted") {
          alert("Joined group successfully!");
          const user_data = { user_id: this.state.user_id };
          this.props.getAllmyGroups(user_data);
        }
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });
  };
  onDeclineClick = (group_id) => {
    console.log(group_id);
    const groupData = { group_id: group_id, currentUser: this.state.user_id, status:"Decline" };
    console.log("groupData", groupData);
    axios.defaults.withCredentials = true;
    axios
      .post(`${ApiRequest}/group/acceptinvite`, groupData)
      .then((response) => {
        console.log("Response after Axios call", response);
        if (response.data === "Accepted") {
          alert("Request rejected!");
          const user_data = { user_id: this.state.user_id };
          this.props.getAllmyGroups(user_data);
        }
      })
      .catch((error) => {
        console.log("error occured while connecting to backend:", error);
      });


  };


  render() {
    let groupList = this.state.groups;
    console.log(groupList)
    groupList.map((group) => console.log(group.groupMembers[0].invite))
    return (
     
      <div lassName="">
      <DashboardNav></DashboardNav>
      <br/>
      <br/>
        <div >
          <div className="MidDash">
            <div className="row">
              <div className="col-sm-2"></div>
              <div className="col">
                <div className="container">
                  <div className="row ">
                    <div className="col ">
                      <h3>My Groups</h3>
                    </div>
                    <div className="col">
                      <form className="form-inline my-2 my-lg-0">
                        <input
                          className="form-control mr-sm-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          className="btn btn-outline-success my-2 my-sm-0"
                          type="submit"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                   
                  </div>
                  <br/>
                  {}
                      {groupList.map((group) =>(
                        group.groupMembers[0].invite === 1 ?(
                        <div
                          className="list-group list-group-horizontal"
                          key={group._id}
                        >
                          <Link
                            className="list-group-item list-group-item-action"
                            style={{ width: "80%", marginRight: "10px" }}
                            to={`/groups/${group._id}`}
                          >
                            {group.groupName}
                          </Link>
                        </div>
                        ) : (<div> </div>) )
                      )}
                      <br/>
                      <h4>Pending Requests</h4>
                      <div>
                      {groupList.map((group) =>
                         
           group.groupMembers[0].invite === 0 ? (
             <div
               className="list-group list-group-horizontal"
               key={group.groupName}
             >
              
             <Link
             className="list-group-item list-group-item-action"
             style={{ width: "80%", marginRight: "10px" }}
             
           >
             {group.groupName}
           </Link>
           
                 <button
                   className="btn btn-outline-success my-2 my-sm-0"
                   onClick={() => this.onJoinClick(group._id)}
                 >
                   Join Group
                 </button>
                 <button
                 className="btn btn-outline-success my-2 my-sm-0"
                 onClick={() => this.onDeclineClick(group._id)}
               >
                 Decline
               </button>
          
             </div>
           ) : <div> </div>  )}
                  </div>
                </div>
              </div>
              <div className="col-sm-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({});

// const mapDispatchToProps = {};
MyGroup.propTypes = {
  getAllmyGroups: PropTypes.func.isRequired,
  // joinGroup: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  allGroups: state.myGroups.allGroups,
  // JoinStatus: state.myGroups.JoinStatus,
});
export default connect(mapStateToProps, { getAllmyGroups })(MyGroup);
//connect(mapStateToProps, mapDispatchToProps)(Add);
