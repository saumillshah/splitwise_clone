import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./simple-sidebar.css"

class SideNavPage extends Component {
 



render() {
    return (
      <div class="d-flex" id="wrapper">
      <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="list-group list-group-flush">
        <Link 
        to={{
          pathname: "/mygroup",
          search: "?sort=name",
          hash: "#the-hash",
          state: { fromDashboard: true }
        }}
      >Groups</Link>
      <Link 
      to={{
        pathname: "/recentactivity",
        search: "?sort=name",
        hash: "#the-hash",
        state: { fromDashboard: true }
      }}
    >Recent Activity</Link>
        </div>
      </div> 
    
    
    </div>
    );
  }
}

export default SideNavPage;