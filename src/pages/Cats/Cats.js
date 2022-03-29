import "./Cats.scss";
import { Component } from "react";
import axios from "axios";
import CatsCard from "../../components/CatsCard/CatsCard";
import Search from "../../components/Search/Search";
const baseURL = process.env.REACT_APP_API_URL;
const catsURL = `${baseURL}/cats`;

class Cats extends Component {
  state = {
    cats: [],
    searchedCats: [],
    searchInput: "",
    filteredCats: [],
    filterInput: "",
  };

  componentDidMount() {
    return this.fetchCats();
  }

  fetchCats = () => {
    axios
      .get(catsURL)
      .then((response) => {
        let cats = response.data;
        console.log(cats);
        this.setState({
          cats: cats,
          searchedCats: cats,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error trying to fetch the API.");
      });
  };

  // function to search cats
  searchCats = (event) => {
    const searchInput = event.target.value.toLowerCase();
    const searchedCats = this.state.cats.filter((cat) => {
      return (
        cat.catName.toLowerCase().includes(searchInput) ||
        cat.shelterName.toLowerCase().includes(searchInput) ||
        cat.age.toLowerCase().includes(searchInput) ||
        cat.gender.toLowerCase().includes(searchInput) ||
        cat.description.toLowerCase().includes(searchInput) ||
        cat.city.toLowerCase().includes(searchInput)
      );
    });
    this.setState({
      searchedCats: searchedCats,
      searchInput: searchInput,
    });
  };

  // function to filter cats
  filterCats = (event) => {
    event.preventDefault();

    const male = event.target.male.checked;
    const female = event.target.female.checked;
    const kitty = event.target.kitty.checked;
    const young = event.target.young.checked;
    const adult = event.target.adult.checked;
    const senior = event.target.senior.checked;
    const city = event.target.city.value;
    console.log(event.target.inputValue);

    let filteredCats = this.state.cats;
    let selectedAges = [];
    let selectedGender = [];

    male && selectedGender.push("male");
    female && selectedGender.push("female");

    if (selectedGender.length > 0) {
      filteredCats = filteredCats.filter((cat) =>
        selectedGender.includes(cat.gender.toLowerCase())
      );
    }

    kitty && selectedAges.push("kitty");
    young && selectedAges.push("young");
    adult && selectedAges.push("adult");
    senior && selectedAges.push("senior");

    if (selectedAges.length > 0) {
      filteredCats = filteredCats.filter((cat) =>
        selectedAges.includes(cat.age.toLowerCase())
      );
    }

    console.log({ city });
    if (city !== "Select a City" && city !== "") {
      filteredCats = filteredCats.filter((cat) => {
        return cat.city.toLowerCase().includes(city.toLowerCase());
      });
    }

    this.setState({
      searchedCats: filteredCats,
    });
  };

  // function to clear filter
  handleClear = (event) => {
    this.fetchCats();
    const form = event.target.parentNode.parentNode.parentNode;
    form.reset();
  };

  render() {
    document.title = "Home | meowadopt";
    console.log("Cats");

    return (
      <>
        <Search
          searchCats={this.searchCats}
          filterCats={this.filterCats}
          handleClear={this.handleClear}
        />
        {this.state.searchedCats.map((item, index) => {
          return (
            <CatsCard
              key={index}
              id={item.id}
              image={item.image}
              catName={item.catName}
              urlPath={"cats"}
            />
          );
        })}
      </>
    );
  }
}
export default Cats;
