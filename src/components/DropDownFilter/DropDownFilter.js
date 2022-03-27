import React, { Component } from "react";
import "./DropDownFilter.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Button from "./../Button/Button";

class DropdownFilter extends Component {
  state = {
    dropdownVisible: false,
    // filterInputs: "",
  };

  toggleDropdown = (e) => {
    this.setState((prevState) => ({
      dropdownVisible: !prevState.dropdownVisible,
    }));
  };

  // // function to filter cats
  // filterCats = (event) => {
  //   const filterInputs = event.target.value.toLowerCase();
  //   console.log({ filterInputs });
  //   const filteredCats = this.state.cats.filter((cat) => {
  //     return (
  //       cat.gender.toLowerCase().includes(filterInputs) &&
  //       cat.age.toLowerCase().includes(filterInputs) &&
  //       cat.city.toLowerCase().includes(filterInputs)
  //     );
  //   });
  //   this.setState({
  //     filteredCats: filteredCats,
  //     filterInputs: filterInputs,
  //   });
  // };

  renderDropdownFilter = () => {
    return (
      <div className="dropdown__body">
        <div className="dropdown__gender">
          <h3>Gender</h3>
          <label htmlFor="male">Male</label>
          <input type="checkbox" value="Male" id="male" placeholder="Male" />
          <label htmlFor="female">Female</label>
          <input type="checkbox" value="Male" id="male" placeholder="Male" />
        </div>
        <div className="dropdown__age">
          <h3>Age</h3>
          <label htmlFor="kitty">Kitty</label>
          <input type="checkbox" value="kitty" id="kitty" placeholder="Kitty" />
          <label htmlFor="young">Female</label>
          <input type="checkbox" value="Male" id="male" placeholder="Male" />
          <label htmlFor="female">Young</label>
          <input type="checkbox" value="young" id="young" placeholder="young" />
          <label htmlFor="adult">Adult</label>
          <input type="checkbox" value="adult" id="adult" placeholder="adult" />
          <label htmlFor="senior">Senior</label>
          <input
            type="checkbox"
            value="senior"
            id="senior"
            placeholder="senior"
          />
        </div>
        <div className="dropdown__city">
          <label htmlFor="city">City</label>
          <select name="city" id="city">
            <option hidden value="">
              {""}
            </option>
            <option value="airdrie">Airdrie</option>
            <option value="calgary">Calgary</option>
            <option value="edmonton">Edmonton</option>
            <option value="grandePrairie">Grande Prairie</option>
            <option value="redDeer">Red Deer</option>
            <option value="leduc">Leduc</option>
            <option value="lethbridge">Lethbridge</option>
            <option value="medicineHat">Medicine Hat</option>
            <option value="saintAlbert">Saint Albert</option>
            <option value="spruceGrove">Spruce Grove</option>
          </select>
        </div>
        <Button children={"View Matches"} filterCats={this.props.filterCats} />
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
