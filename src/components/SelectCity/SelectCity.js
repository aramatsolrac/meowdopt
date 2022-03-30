import { Component } from "react";
import Select from "react-select";

const options = [
  { value: "calgary", label: "Calgary" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const SelectCity = () => <Select options={options} />;

export default SelectCity;
