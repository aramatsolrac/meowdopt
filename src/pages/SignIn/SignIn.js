// import "./Login";
import "./SignIn.scss";
import { Component } from "react";
import { login } from "../../helpers/authHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLock } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";

class SignIn extends Component {
  state = {
    show: false,
  };

  handleHome = () => {
    this.props.history.push("/");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    login(
      event.target.username.value,
      event.target.password.value,
      this.handleHome
    );
  };

  handleClick = () => this.setState({ show: !this.state.show });

  render() {
    const showHideText = this.state.show ? "text" : "password";
    const showHideIcon = this.state.show ? (
      <FontAwesomeIcon
        icon={faLock}
        size="lg"
        onClick={this.handleClick}
        className="signIn__icon"
      />
    ) : (
      <FontAwesomeIcon
        icon={faEye}
        size="lg"
        onClick={this.handleClick}
        className="signIn__icon"
      />
    );

    return (
      <div>
        <form onSubmit={this.handleSubmit} className="signIn__form">
          <div className="signIn__content">
            <label className="signIn__label">Username</label>
            <input
              placeholder="Enter your username"
              type="text"
              name="username"
              className="signIn__input"
            />
          </div>
          <div className="signIn__content">
            <label className="signIn__label">Password</label>
            <input
              placeholder="Enter your password"
              name="password"
              className="signIn__input"
              type={showHideText}
            />
            <div>
              <p>{showHideIcon}</p>
            </div>
          </div>
          <div className="signIn__content">
            <Button children={"Sign In"} className="signIn__button" />
          </div>
        </form>
      </div>
    );
  }
}
export default SignIn;
