import "./Login";
import "./Login.scss";
import { Component } from "react";
import { login } from "../../helpers/authHelper";

class Login extends Component {
  //   state = {};

  //   componentDidMount() {}

  handleBack = () => {
    this.props.history.goBack();
  };

  handleSubmit = (event) => {
    event.preventDefault();
    login(
      event.target.userName.value,
      event.target.password.value,
      this.handleBack
    );
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username </label>
            <input type="text" name="userName" required />
          </div>
          <div>
            <label>Password </label>
            <input type="password" name="password" required />
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
