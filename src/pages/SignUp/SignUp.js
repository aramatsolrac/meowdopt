import "./SignUp.scss";
import { Component } from "react";
import Button from "../../components/Button/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import formValidation from "../../helpers/formValidation";
import { signUp } from "../../helpers/serverHelper";

class SignUp extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  handleChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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

    if (this.isFormValid()) {
      signUp(
        this.state.name,
        this.state.username,
        this.state.email,
        this.state.password,
        () => {
          MySwal.fire({
            position: "center",
            icon: "success",
            title: "Your login has been created",
            showConfirmButton: false,
            timer: 2000,
          });
          event.target.reset();
          this.props.history.push("/login");
        }
      );
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
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="signUp__form">
          <div className="signUp__content">
            <label className="signUp__label">Name</label>
            <input
              type="text"
              name="name"
              className="signUp__input"
              onChange={this.handleChangeInput}
            />
          </div>
          <div className="signUp__content">
            <label className="signUp__label">Username</label>
            <input
              type="text"
              name="username"
              className="signUp__input"
              onChange={this.handleChangeInput}
            />
          </div>
          <div className="signUp__content">
            <label className="signUp__label">Email</label>
            <input
              type="email"
              name="email"
              className="signUp__input"
              onChange={this.handleChangeInput}
            />
          </div>
          <div className="signUp__content">
            <label className="signUp__label">Password</label>
            <input
              type="text"
              name="password"
              className="signUp__input"
              onChange={this.handleChangeInput}
            />
          </div>
          <div className="signUp__content">
            <Button children={"Sign Up"} className="signUp__button" />
          </div>
        </form>
      </div>
    );
  }
}
export default SignUp;
