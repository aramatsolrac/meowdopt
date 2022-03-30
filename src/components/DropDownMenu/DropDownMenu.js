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

  toggleDropdown = (e) => {
    this.setState((prevState) => ({
      dropdownVisible: !prevState.dropdownVisible,
    }));
  };

  renderDropDownMenu = () => {
    return (
      <form onSubmit={this.props.filterCats}>
        <div className="dropdown__box">
          <div className="dropdown__link">
            <Link
              // to={`/profile`}
              to={!isLoggedIn() ? `/login` : `/profile`}
              className="dropdown__link-profile"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="dropdown__icon"
                size="lg"
              />
              {!isLoggedIn() ? "User" : getLoggedUser().name} Profile
            </Link>
          </div>
          <div className="dropdown__link">
            <Link
              to={"/"}
              onClick={() => logout()}
              className="dropdown__link-logout"
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
    console.log("DropMenu");
    return (
      <div className="dropdown__container">
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
