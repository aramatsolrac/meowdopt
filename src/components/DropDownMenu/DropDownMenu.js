import React, { Component } from "react";
import "./DropDownMenu.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { logout, isLoggedIn, getLoggedUser } from "../../helpers/authHelper";

class DropDownMenu extends Component {
  state = {
    dropdownVisible: false,
  };

  toggleDropdown = (event) => {
    if (!this.state.dropdownVisible) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.setState((prevState) => ({
      dropdownVisible: !prevState.dropdownVisible,
    }));
  };

  handleOutsideClick = (event) => {
    if (!this.node.contains(event.target)) this.toggleDropdown();
  };

  renderDropDownMenu = () => {
    const signInSignUp = !isLoggedIn()
      ? "Sign In / Sign Up"
      : getLoggedUser().name;

    const logoutDisplay = !isLoggedIn() ? "none" : "flex";
    const handleLinkTo = !isLoggedIn() ? `/login` : `/profile`;

    return (
      <form onSubmit={this.props.filterCats}>
        <div className="dropdown__box">
          <div className="dropdown__link">
            <Link to={handleLinkTo} className="dropdown__link-profile">
              <FontAwesomeIcon
                icon={faUser}
                className="dropdown__icon"
                size="lg"
              />
              {signInSignUp}
            </Link>
          </div>
          <div className="dropdown__link">
            <Link
              to={"/"}
              onClick={() => logout()}
              className="dropdown__link-logout"
              style={{ display: logoutDisplay }}
            >
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="dropdown__icon-logout"
                size="lg"
              />
              Log Out
            </Link>
          </div>
        </div>
      </form>
    );
  };

  render() {
    return (
      <div
        className="dropdown__container"
        ref={(node) => {
          this.node = node;
        }}
      >
        <div className="dropdown__trigger">
          <FontAwesomeIcon
            icon={faBars}
            onClick={this.toggleDropdown}
            className="dropdown__icon-bar"
            size="lg"
          />
        </div>
        {this.state.dropdownVisible && this.renderDropDownMenu()}
      </div>
    );
  }
}

export default DropDownMenu;
