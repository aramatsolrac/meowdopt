import React, { Component } from "react";
import "./DropDownMenu.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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
        <div className="dropdown__body">
          <div>
            <Link to={`/${getLoggedUser().id}/favorites`}>Favorites </Link>
            <Link to={`/${getLoggedUser().id}/requests`}>Requests</Link>
          </div>
          <div>{/* <Link to="/logout">Log Out</Link> */}</div>
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
