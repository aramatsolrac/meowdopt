import "./Login";
import "./Login.scss";
import { Component } from "react";
import { login } from "../../helpers/authHelper";

class Login extends Component {
  state = {
    show: false,
  };

  handleHome = () => {
    this.props.history.push("/");
  };

  //TODO: add validation
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
    console.log("Login");

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username </label>
            <input
              placeholder="Enter your username"
              type="text"
              name="username"
              className="test"
            />
          </div>
          <div>
            <label>Password </label>
            <input
              name="password"
              className="test"
              type={this.state.show ? "text" : "password"}
            />
            <button type="button" onClick={this.handleClick}>
              {" "}
              {this.state.show ? "Hide" : "Show"}
            </button>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}
export default Login;
