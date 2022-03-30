import React, { Component } from "react";
import "./DropDownMenu.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHeart,
  faFile,
  faUser,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { isLoggedIn, getLoggedUser } from "../../helpers/authHelper";

// import Button from "./../Button/Button";

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
            <Link to={`/profile`} className="dropdown__link-favorites">
              <FontAwesomeIcon
                icon={faUser}
                className="dropdown__icon"
                size="lg"
              />
              Profile
            </Link>
            {/* <Link
              to={`/${getLoggedUser().id}/favorites`}
              className="dropdown__link-favorites"
            >
              <FontAwesomeIcon
                icon={faHeart}
                className="dropdown__icon"
                size="lg"
              />
              Favorites
            </Link>
            <Link
              to={`/${getLoggedUser().id}/requests`}
              className="dropdown__link-requests"
            >
              <FontAwesomeIcon
                icon={faFile}
                className="dropdown__icon-requests"
                size="lg"
              />
              Requests
            </Link> */}
          </div>
          <div className="dropdown__link">
            <Link to="/logout" className="dropdown__link-logout">
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
