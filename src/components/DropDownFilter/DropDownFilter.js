import React, { Component } from "react";
import "./DropDownFilter.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

class DropdownFilter extends Component {
  state = {
    dropdownVisible: false,
  };

  toggleDropdown = (e) => {
    this.setState((prevState) => ({
      dropdownVisible: !prevState.dropdownVisible,
    }));
  };

  renderDropdownFilter = () => {
    return (
      <div className="dropdown__body">
        <div className="dropdown__content">
          <label htmlFor="male" />
          <input type="checkbox" value="Male" id="male" placeholder="Male" />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="dropdown__container">
        <div className="dropdown__trigger">
          <FontAwesomeIcon
            icon={faFilter}
            onClick={this.toggleDropdown}
            className="dropdown__icon-filter"
          />
        </div>
        {this.state.dropdownVisible && this.renderDropdownFilter()}
      </div>
    );
  }
}

export default DropdownFilter;
