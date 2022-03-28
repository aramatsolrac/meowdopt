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
    console.log({ searchInput });
    const searchedCats = this.state.cats.filter((cat) => {
      return (
        cat.catName.toLowerCase().includes(searchInput) ||
        cat.shelterName.toLowerCase().includes(searchInput) ||
        cat.age.toLowerCase().includes(searchInput) ||
        cat.gender.toLowerCase().includes(searchInput) ||
        cat.description.toLowerCase().includes(searchInput)
      );
    });
    this.setState({
      searchedCats: searchedCats,
      searchInput: searchInput,
    });
  };

  // // function to filter cats
  filterCats = (event) => {
    event.preventDefault();
    // console.log(event.target.male.value);
    // console.log(event.target.female.value);
    // console.log(event.target.kitty.value);
    console.log(event.target.young.checked);
    // console.log(event.target.adult.value);
    // console.log(event.target.senior.value);
    // console.log(event.target.city.value);

    const male = event.target.male.checked;
    const female = event.target.female.checked;
    const kitty = event.target.kitty.checked;
    const young = event.target.young.checked;
    const adult = event.target.adult.checked;
    const senior = event.target.senior.checked;
    const city = event.target.city.value;

    let filteredCats = this.state.cats;

    if (kitty) {
      filteredCats = filteredCats.filter((cat) =>
        cat.age.toLowerCase().includes("kitty")
      );
      this.setState({
        filteredCats: filteredCats,
      });
    }

    if (young) {
      filteredCats = filteredCats.filter((cat) =>
        cat.age.toLowerCase().includes("young")
      );
      this.setState({
        filteredCats: filteredCats,
      });
    }

    if (adult) {
      filteredCats = filteredCats.filter((cat) =>
        cat.age.toLowerCase().includes("adult")
      );
      this.setState({
        filteredCats: filteredCats,
      });
    }

    if (senior) {
      filteredCats = filteredCats.filter((cat) =>
        cat.age.toLowerCase().includes("senior")
      );
      this.setState({
        filteredCats: filteredCats,
      });
    }

    console.log({ filteredCats });
  };

  render() {
    document.title = "Home | meowadopt";
    return (
      <>
        <Search searchCats={this.searchCats} />
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
