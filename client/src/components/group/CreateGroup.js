import React, { Component } from "react";
import ApiRequest from "../../backendRequestAPI";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import { getAllUsers, addGroup } from "../../actions/createGroupAction";
import DashboardNav from "../Dashboard/DashboardNav";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "../styles/signup.css";

class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: localStorage.getItem("email"),
      user_id: localStorage.getItem("user_id"),
      groupname: "",
      userData: [],
      flag: false,
      selected: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  onSelect = (data) => {
    this.setState({
      selected: data,
    });
    console.log("selected", this.state.selected);
  };

  componentWillMount() {
    const data = {
      email: this.state.email,
    };
    this.props.getAllUsers(data);
    console.log(this.props.allUser);
    
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("prev", prevState.userData);
    console.log("new", this.state.userData);

    if (prevState.userData !== this.props.allUser) {
      console.log("Updated", this.props.allUser);
      this.setState({
        userData: this.props.allUser,
      });
      console.log("userdata", this.state.userData);
    }
    if (this.props.addgroup === "Success") {
      this.setState({
        flag: true,
      });
    }
  }

  // componentWillReceiveProps(nextProps){
  //   console.log("next",nextProps.allUser)
  //   this.setState({
  //     userData: nextProps.allUser
  //   })
  // }

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
    formData.append("image", this.state.file);
    const uploadConfig = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(
        `${ApiRequest}/uploads/${this.state.user_id}`,
        formData,
        uploadConfig
      )
      .then((response) => {
        alert("Image uploaded successfully!");
        this.setState({
          fileText: "Choose file",
          user_image: response.data,
        });
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log("hey", this.state.selected);
    let members = [];
    let data = {};

    for (var i = 0; i < this.state.selected.length; i++) {
      data = {
        email: this.state.selected[i].email,
        _id : this.state.selected[i]._id,
        invite: 0,
      };
      members.push(data);
    }
    let data1 = {
      email: localStorage.getItem("email"),
      _id : localStorage.getItem("user_id"),
      invite: 1,
    }
    members.push(data1);

    const groupData = {
      email: this.state.email,
      groupname: this.state.groupname,
      user_id: this.state.user_id,
      members: members,
    };
    console.log("groupData is :", groupData);
    this.props.addGroup(groupData);
    
    console.log(this.props.addgroup);
  
  };
  

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    let redirectVar = null;
    let { flag } = this.state;
    if(flag){
      redirectVar = <Redirect to="/mygroup" />;
    }
    // if (this.state.flag) {
    //   this.props.history.push("/mygroup");
    // }
    var imageSrc;
    console.log(this.props);
    if (this.state) {
      imageSrc = `${ApiRequest}/images/${this.state.user_image}`;
    }
    return (
      <div>{redirectVar}
        <DashboardNav></DashboardNav>
        <br/>
        <br/>
        <div className="container signup">
          <div className="">
            <img className="" src={imageSrc} alt="profile_picture" />

            <form onSubmit={this.onUpload}>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control-file"
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
          <div className="signup-form">
            <form>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="name">START A NEW GROUP</label>
                    <br></br>
                    <label htmlFor="name">My group shall be called...</label>
                    <input
                      type="text"
                      className="form-control"
                      name="groupname"
                      onChange={this.onChange}
                      value={this.state.groupname}
                      placeholder="Group Name"
                      required
                    />
                  </div>
                  <br></br>
                  <label>GROUP MEMBERS</label>

                  <Multiselect
                    options={this.state.userData} // Options to display in the dropdown
                    selectedValues={this.state.selectedValues} // Preselected value to persist in dropdown
                    onSelect={this.onSelect}
                    displayValue="email" // Property name to display in the dropdown options
                  />

                  <br></br>

                  <div className="form-group">
                    <br></br>
                    <Button variant="primary" onClick={this.onSubmit}>
                      Save
                    </Button>
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
CreateGroup.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  addGroup: PropTypes.func.isRequired,
  allUser: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  allUser: state.createGroup.allUsers,
  addgroup: state.createGroup.addgroup,
});

export default connect(mapStateToProps, { getAllUsers, addGroup })(CreateGroup);
