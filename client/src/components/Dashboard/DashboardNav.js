import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/logo.png";
import "./simple-sidebar.css"
import "../styles/dashstyle.css"
import {userLogout} from "../../actions/loginAction"
import {  Dropdown } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link,NavLink } from "react-router-dom";

class DashboardNav extends Component {
    constructor(){
        super();
        this.state = {
          name: localStorage.getItem("name")
        }
    }
    handleLogout = () => {
        window.localStorage.clear();
        this.props.userLogout();
        
      };
  render() {
    
    
    return (
      <div className="landing">
      <nav className="DashboardNav fixed-top">
      <NavLink to="/Dashboard">
        <h2 className="landing-name">
         <img className="landing-logo" src={logo} alt="Logo" width="20px" />&nbsp;&nbsp;
          <b>Splitwise</b>
        </h2>
      </NavLink>

      <div className="Dashfloat"><Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {this.state.name}
      </Dropdown.Toggle>
    
      <Dropdown.Menu>
      <Dropdown.Item>
      <Link to="/profile" class="nav-link">
        &nbsp;&nbsp;Your Account
      </Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <Link to="/creategroup" class="nav-link">
        &nbsp;&nbsp;Create Group
      </Link>
    </Dropdown.Item>
    <Dropdown.Item>
      <Link to="/mygroup" class="nav-link">
        &nbsp;&nbsp; My Group
      </Link>
    </Dropdown.Item>
    <Dropdown.Item> <Link to="/" class="nav-link" onClick={this.handleLogout}>
    &nbsp;&nbsp;Logout
  </Link></Dropdown.Item>
   
       
      </Dropdown.Menu>
    </Dropdown></div>
    </nav>
      
       
        
      </div>
    );
  }
}

export default connect(null, { userLogout })(DashboardNav);
