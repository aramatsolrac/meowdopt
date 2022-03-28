import "./Cats.scss";
import "react-slideshow-image/dist/styles.css";
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
          filteredCats: cats,
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
    console.log(event.target.male.value);
    console.log(event.target.female.value);
    // console.log(event.target.kitty.value);
    // console.log(event.target.young.value);
    // console.log(event.target.adult.value);
    // console.log(event.target.senior.value);
    // console.log(event.target.city.value);

    // const male = event.target.male.value;
    // const female = event.target.female.value;
    // const kitty = event.target.kitty.value;
    // const young = event.target.young.value;
    // const adult = event.target.adult.value;
    // const senior = event.target.senior.value;
    // const city = event.target.city.value;

    const filteredCats = this.state.cats.filter((cat) => {
      console.log(
        "Filtered cats",
        cat.gender.toLowerCase().includes(event.target.male.value)
      );
      return cat.city.toLowerCase().includes(event.target.city.value);
    });
    console.log({ filteredCats });
    this.setState({
      filteredCats: filteredCats,
      filterInput: event.target.city.value,
    });
  };

  render() {
    document.title = "Home | meowadopt";
    return (
      <>
        <Search searchCats={this.searchCats} filterCats={this.filterCats} />
        {this.state.filteredCats.map((item, index) => {
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
