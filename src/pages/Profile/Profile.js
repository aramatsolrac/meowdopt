import "./Profile.scss";
import axios from "axios";
import { Component } from "react";
// import { isLoggedIn, getLoggedUser } from "../../helpers/authHelper";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const baseURL = process.env.REACT_APP_API_URL;
const usersURL = `${baseURL}/users`;

class Profile extends Component {
  state = {};

  render() {
    return;
  }
}

export default Profile;
