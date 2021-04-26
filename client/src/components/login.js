import React, { useState } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { userLogin } from "../actions/loginAction";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../styles/signup.css";
// import logo from "../images/logo.png";

const Login = (props) => {

     const [Email, setEmail] = useState('')
     const [Passwd, setPasswd] = useState('')
     const [loginFlag, setloginFlag] = useState(0)
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   onChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

  
 const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: Email,
      passwd: Passwd,
    };
    console.log(data)
    props.userLogin(data);

    
      setloginFlag(1);
    
  };
  
    // console.log(this.props.user);
    let redirectVar = null;
    let errorMessage = "";
    console.log(localStorage.getItem("email"))
    if(localStorage.getItem("user_id")!==null){
      redirectVar = <Redirect to="/dashboard" />;
    }
    // console.log("this.props.user id is", props.user._id);
    if (props.user && props.user._id) {
      localStorage.setItem("email", props.user.email);
      localStorage.setItem("user_id", props.user._id);
      localStorage.setItem("name", props.user.name);
      // redirectVar = <Redirect to="/dashboard" />;
    } else if (props.user === "noUser" && loginFlag) {
      errorMessage = "Incorrect information";
    } else if (
     props.user === "incorrectPassword" &&
      loginFlag
    ) {
      errorMessage = "Incorrect Information";
    }

    console.log("Props value is:", props);
    
    
    return (
      <div>
        
        {redirectVar}


        <div  className="container signup">
        
          <div className="signup-logo">
            <img
              className="landing-logo"
              style={{ height: "fit-content" }}
              // src={logo}
              alt="Splitwise"
            />
          </div>
          <div className="signup-form">
            <h2>WELCOME TO SPLITWISE</h2>
          </div>
          <br />
         
          <form onSubmit={onSubmit}>
            <div style={{ color: "#ff0000" }}>{errorMessage}</div>
            <br />
            <div  className="form-group">
              <input
                type="email"
                className="form-control"
                onChange={(event) => {
                    event.preventDefault();
                    setEmail(event.target.value);
                  }}
                name="email"
                placeholder="Email Id"
                title="Please enter valid email address"
                required
              />
            </div>
            <br />

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                onChange={(event) => {
                    event.preventDefault();
                    setPasswd(event.target.value);
                  }}
                name="password"
                placeholder="Password"
                required
              /><br />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
        
        
      </div>
    );
  }

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
  };
};
export default connect(mapStateToProps, { userLogin })(Login);
