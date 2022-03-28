import React, { Component } from "react";
import "./DropDownFilter.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Button from "./../Button/Button";

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
      <form onSubmit={this.props.filterCats}>
        <div className="dropdown__body">
          <div>
            <label htmlFor="gender">
              Gender
              <div>
                <label htmlFor="male">
                  Male
                  <input type="checkbox" value="male" name="male" />
                </label>
                <label htmlFor="female">
                  Female
                  <input type="checkbox" value="female" name="female" />
                </label>
              </div>
            </label>
          </div>
          <div>
            <label htmlFor="age">
              Age
              <div>
                <label htmlFor="kitty">
                  Kitty
                  <input type="checkbox" value="kitty" name="kitty" />
                </label>
                <label htmlFor="young">
                  Young
                  <input type="checkbox" value="young" name="young" />
                </label>{" "}
                <label htmlFor="adult">
                  Adult
                  <input type="checkbox" value="adult" name="adult" />
                </label>
                <label htmlFor="senior">
                  Senior
                  <input type="checkbox" value="senior" name="senior" />
                </label>
              </div>
            </label>
          </div>
          <div className="dropdown__city">
            <label htmlFor="city">City</label>
            <select name="city" id="city">
              <option hidden value="">
                {""}
              </option>
              <option value="airdrie" name="airdrie">
                Airdrie
              </option>
              <option value="calgary" name="calgary">
                Calgary
              </option>
              <option value="edmonton" name="edmonton">
                Edmonton
              </option>
              <option value="Grande Prairie" name="Grande Prairie">
                Grande Prairie
              </option>
              <option value="Red Deer" name="Red Deer">
                Red Deer
              </option>
              <option value="leduc" name="leduc">
                Leduc
              </option>
              <option value="lethbridge" name="lethbridge">
                Lethbridge
              </option>
              <option value="Medicine Hat" name="Medicine Hat">
                Medicine Hat
              </option>
              <option value="Saint Albert" name="Saint Albert">
                Saint Albert
              </option>
              <option value="Spruce Grove" name="Spruce Grove">
                Spruce Grove
              </option>
            </select>
          </div>
          <Button children={"View Matches"} />
          <Button children={"Clear"} onClick={this.props.handleClear} />
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
