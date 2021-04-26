import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./images/logo.png";

import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="landing">
        {" "}
        <Navbar bg="light" expand="lg">
          <img className="landing-logo" src={logo} alt="Logo" width="20px" />
          <Navbar.Brand href="/" margin="5px ">
            Splitwise
          </Navbar.Brand>
          <Nav className="ms-auto" >
           
                <Link to ='/login'> <Button variant="outline-success">Login</Button> </Link>
                &nbsp;
                <Link to ='/signup'> <Button variant="success">Signup</Button> </Link>
           
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
