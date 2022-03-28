import "./SignUp.scss";
import axios from "axios";
import { Component } from "react";
// import { isLoggedIn, getLoggedUser } from "../../helpers/authHelper";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import formValidation from "../../helpers/formValidation";

const baseURL = process.env.REACT_APP_API_URL;
const signUpURL = `${baseURL}/users/signup`;

class SignUp extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  // get name value
  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
    formValidation(event.target);
  };

  // get username value
  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
    formValidation(event.target);
  };

  // get email value
  handleChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
    formValidation(event.target);
  };

  // get password value
  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
    formValidation(event.target);
  };

  // check if the form is valid
  isFormValid = () => {
    if (
      !this.state.name.trim() ||
      !this.state.username.trim() ||
      !this.state.email.trim() ||
      !this.state.password.trim()
    ) {
      return false;
    }
    return true;
  };

  // add new user and go to home
  handleSubmit = (event) => {
    event.preventDefault();
    const MySwal = withReactContent(Swal);
    const data = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    if (this.isFormValid()) {
      axios
        .post(`${signUpURL}`, data)
        .then((response) => {
          console.log(response.data);
          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Your login has been created",
            showConfirmButton: false,
            timer: 2000,
          });
          event.target.reset();
          this.props.history.push("/login");
        })
        .catch((error) => {
          console.log(error);
          alert("Error trying to fetch the API.");
        });
    } else {
      MySwal.fire({
        position: "center",
        icon: "error",
        title: "Please fill out all the fields",
        showConfirmButton: false,
        timer: 2000,
      });
      formValidation(event.target.name);
      formValidation(event.target.username);
      formValidation(event.target.email);
      formValidation(event.target.password);
    }
  };
  render() {
    console.log("SignUp");

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name </label>
            <input
              type="text"
              name="name"
              className="test"
              onChange={this.handleChangeName}
            />
          </div>
          <div>
            <label>Username </label>
            <input
              type="text"
              name="username"
              className="test"
              onChange={this.handleChangeUsername}
            />
          </div>
          <div>
            <label>Email </label>
            <input
              type="email"
              name="email"
              className="test"
              onChange={this.handleChangeEmail}
            />
          </div>
          <div>
            <label>Password </label>
            <input
              type="text"
              name="password"
              className="test"
              onChange={this.handleChangePassword}
            />
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}
export default SignUp;
