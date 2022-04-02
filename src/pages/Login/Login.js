import "./Login.scss";
import { Component } from "react";
import { login } from "../../helpers/authHelper";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";

class Login extends Component {
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
    const tabStyle = {
      _selected: { color: "#dea48f", bg: "#fff2ed" },
      color: "#dea48f",
      _focus: { outlineColor: "#fff2ed" },
      borderBottomColor: "#fff2ed",
    };

    return (
      <div className="login" style={{ minHeight: window.screen.height + 10 }}>
        <div className="login__wrapper">
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab sx={tabStyle}>
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="profile__icon"
                  size="lg"
                />
                Sign In
              </Tab>
              <Tab sx={tabStyle}>
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="profile__icon"
                  size="lg"
                />
                Sign Up
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SignIn history={this.props.history} />
              </TabPanel>
              <TabPanel>
                <SignUp history={this.props.history} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    );
  }
}
export default Login;
