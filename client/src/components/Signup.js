import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userSignup } from "../actions/signupActions";
import { Redirect } from "react-router";

// import logo from "../images/logo.png";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    
    e.preventDefault();
    const data = {
      name: this.state.name,
        email: this.state.email,
        passwd: this.state.passwd,
    };

     this.props.userSignup(data);

    this.setState({
      signupFlag: 1,
    });
  };
  componentDidUpdate(){
    console.log(this.props.user)}

  render() {
    //redirect based on successful signup
  
    let redirectVar = null;
    let errorMessage = "";
    
   
    if (localStorage.getItem("user_id")) {
      redirectVar = <Redirect to="/dashboard" />;
    } 
    
    else if( this.state.signupFlag && this.props.user._id ) {
    
      console.log('hello',this.props.user )
      localStorage.setItem("email", this.state.email);
      localStorage.setItem("user_id", this.props.user._id);
      localStorage.setItem("name", this.state.name);
      alert("You have registered successfully");
      redirectVar = <Redirect to="/dashboard" />;
    } else if (this.props.user === "USER_EXISTS" && this.state.signupFlag) {
      errorMessage = "Email id is already registered";
    }
    return (
      <div>
        {redirectVar}

        <div  style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"}}>
          {

            // <img src={logo} style={{ height: "fit-content" }} alt="Splitwise" />
          }
        </div>

        <div className="container"  style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h4>INTRODUCE YOURSELF</h4>
                <h2>Hi there! My name is</h2>
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={this.onChange}
                    placeholder="Name"
                    pattern="^[A-Za-z0-9 ]+$"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={this.onChange}
                    placeholder="Email Id"
                    title="Please enter valid email address"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="passwd"
                    onChange={this.onChange}
                    placeholder="Password"
                    required
                  />
                </div>

                <div style={{ color: "#ff0000" }}>{errorMessage}</div>
                <br />
                <button type="submit" className="btn btn-primary">
                  Signup
                </button>
                <br />
                <br />

                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  userSignup: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.signup.user,
  };
};

export default connect(mapStateToProps,{ userSignup })(Signup);

// const Signup = (props) => {
  
//   const [signupFlag, setsignupFlag] = useState(0)
//   const [ item,setitem] = useState({})

//   const onChange = (e) => {
//     setitem({
//       [e.target.name]: e.target.value,
//     });
//   };

//   const onSubmit = (e) => {
    
//     e.preventDefault();
//     const data = {
//       name: item.name,
//         email: item.email,
//         passwd: item.passwd,
//     };
//     console.log(data)
//      props.userSignup(data);

//     setsignupFlag(1);
//   };
 

 
//     //redirect based on successful signup
  
//     let redirectVar = null;
//     let errorMessage = "";
//     if (localStorage.getItem("user_id")===1) {
//       redirectVar = <Redirect to="/dashboard" />;
//     } else if (props.user ==="NEW_USER" && signupFlag) {
    
//       console.log('hello',props.user.email)
//       localStorage.setItem("email", props.user.email);
//       localStorage.setItem("user_id", props.user.user_id);
//       localStorage.setItem("name", props.user.name);
//       alert("You have registered successfully");
//       redirectVar = <Redirect to="/dashboard" />;
//     } else if (props.user === "USER_EXISTS" && signupFlag) {
//       errorMessage = "Email id is already registered";
//     }
//     return (
//       <div>
//         {redirectVar}

//         <div  style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center"}}>
//           <img 
//           // src={logo}
//            style={{ height: "fit-content" }} alt="Splitwise" />
//         </div>

//         <div className="container"  style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center"
//         }}>
//           <div className="login-form">
//             <div className="main-div">
//               <div className="panel">
//                 <h4>INTRODUCE YOURSELF</h4>
//                 <h2>Hi there! My name is</h2>
//               </div>
//               <form onSubmit={onSubmit}>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="name"
//                     onChange={onChange}
//                     placeholder="Name"
//                     pattern="^[A-Za-z0-9 ]+$"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     onChange={onChange}
//                     placeholder="Email Id"
//                     title="Please enter valid email address"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="password"
//                     className="form-control"
//                     name="passwd"
//                     onChange={onChange}
//                     placeholder="Password"
//                     required
//                   />
//                 </div>

//                 <div style={{ color: "#ff0000" }}>{errorMessage}</div>
//                 <br />
//                 <button type="submit" className="btn btn-primary">
//                   Signup
//                 </button>
//                 <br />
//                 <br />

//                 <br />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }


// Signup.propTypes = {
//   userSignup: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => {
//   return {
//     user: state.signup.user,
//   };
// };

// export default connect(mapStateToProps,{ userSignup })(Signup);

