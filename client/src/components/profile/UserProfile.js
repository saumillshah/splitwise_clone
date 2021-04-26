/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import {Image} from "cloudinary-react"
import { 
  Button,
} from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { getUser, updateUser } from "../../actions/userProfileActions";
import DashboardNav from "../Dashboard/DashboardNav"
//import "../styles/userProfile.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:localStorage.getItem("user_id"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      phone_number : localStorage.getItem("phone_number"),
      public_url : localStorage.getItem("public_url"),
      file:"",
      currency:localStorage.getItem("currency"),
    };

    this.onChange = this.onChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  componentWillMount() {
    this.props.getUser();
    // localStorage.setItem("phone_number", this.props.user.phone_number)
    if(this.props.user !== null){
    localStorage.setItem("name", this.props.user.name)
    localStorage.setItem("email", this.props.user.email)
    localStorage.setItem("phone_number", this.props.user.phone_number)
    localStorage.setItem("currency", this.props.user.currency)
    localStorage.setItem("user_language", this.props.user.language)
    localStorage.setItem("timezone", this.props.user.timezone)
    }
    console.log(this.props.user)
  }

  

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.user) {
  //     var { user } = nextProps;

  //     var userData = {
  //       user_id: localStorage.getItem("user_id")  || user._id,
  //       name: user.username || this.state.name,
  //       email: user.email || this.state.email,
  //       phone_number: user.phone_number || this.state.phone_number,
        
  //       currency: user.currency || this.state.currency,
  //       user_language: user.language || this.state.user_language,
  //       timezone: user.timezone || this.state.timezone,
  //     };

  //     this.setState(userData);
  //   }
  // }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onImageChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileText: e.target.files[0].name,
    });
  };

  onUpload = (e) => {
    console.log("inside upload");
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("upload_preset", "wzlxd0cp")
    axios
      .post(
        "https://api.cloudinary.com/v1_1/dzhghe4p4/image/upload",
        formData,
      )
      .then((response) => {
        alert("Image uploaded successfully!");
        console.log(response)
        this.setState({
          public_url: response.data.secure_url,
        });
        localStorage.setItem("public_url", response.data.secure_url)
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  onUpdate = (e) => {
    //prevent page from refresh
    e.preventDefault();

    let data = Object.assign({}, this.state);
    console.log("data" + this.state);
    this.props.updateUser(data);
    this.props.getUser();
  };

  render() {

    return (
      <div>
      <DashboardNav></DashboardNav>
      <br/>
      <br/>
      <div className="container signup">
     
        <div className="">
         <Image
         style={{width:400, height:300}}
         cloudName="dzhghe4p4"
         publicId = {this.state.public_url}
         />

          <form onSubmit={this.onUpload}>
            <div class="form-group">
              <label for="image">Change your avatar</label>
              <input
                type="file"
                class="form-control-file"
                name="image"
                accept="image/*"
                onChange={this.onImageChange}
                required
              />
            </div>
            <Button type="submit" variant="primary">
              Upload
            </Button>
          </form>
        </div>
        <div class="signup-form">
          <form onSubmit={this.onUpdate}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    defaultValue={this.state.name}
                    onChange={this.onChange}
                    value={this.state.name}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your email address</label>
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={this.onChange}
                    defaultValue={this.state.email}
                    value={this.state.email}
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="phone_number
                  "
                  >
                    Your phone number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    className="form-control"
                    defaultValue={this.state.phone_number}
                    onChange={this.onChange}
                    value={this.state.phone_number}
                  />
                </div>
              </div>

              <div className="col">
                <div className="signup-block">
                  <div className="form-group">
                    <label htmlFor="">Your Default currency</label>
                    <br />
                    <label htmlFor="">
                      <small>(for new expenses)</small>
                    </label>
                    <select
                      name="currency"
                      className="form-control"
                      value={this.state.currency}
                      onChange={this.onChange}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="HUF">HUF</option>
                      <option value="HUF">INR</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">You timezone</label>
                    <select
                      name="timezone"
                      className="form-control"
                      value={this.state.timezone}
                      onChange={this.onChange}
                    >
                      <option value="(GMT-08:00) Pacific Time">
                        (GMT-08:00) Pacific Time
                      </option>
                      <option value="(GMT-06:00) Central America">
                        (GMT-06:00) Central America
                      </option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Language</label>
                    <select
                      name="user_language"
                      className="form-control"
                      value={this.state.user_language}
                      onChange={this.onChange}
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Deutch">Deutch</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    );
  }
}

UserProfile.propTypes = {
  getUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.userProfile.user,
});

export default connect(mapStateToProps, { getUser, updateUser })(UserProfile);
