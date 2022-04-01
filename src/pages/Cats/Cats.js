import "./Cats.scss";
import { Component } from "react";
import axios from "axios";
import CatsCard from "../../components/CatsCard/CatsCard";
import Search from "../../components/Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";

const baseURL = process.env.REACT_APP_API_URL;
const catsURL = `${baseURL}/cats`;

class Cats extends Component {
  state = {
    cats: [],
    searchedCats: [],
    searchInput: "",
    filteredCats: [],
    filterInput: "",
    showScroll: false,
  };

  componentDidMount() {
    return this.fetchCats();
  }

  checkScrollTop = () => {
    if (!this.state.showScroll && window.pageYOffset > 400) {
      this.setState({ showScroll: true });
    } else if (this.state.showScroll && window.pageYOffset <= 400) {
      this.setState({ showScroll: false });
    }
  };

  scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
    window.addEventListener("scroll", this.checkScrollTop);

    return (
      <div className="cats" style={{ minHeight: window.screen.height + 10 }}>
        <Search
          searchCats={this.searchCats}
          filterCats={this.filterCats}
          handleClear={this.handleClear}
        />
        <div className="cats__container">
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
        </div>
        <div className="scrollTop">
          <FontAwesomeIcon
            icon={faCircleUp}
            size="2xl"
            className="scrollTop__icon"
            onClick={this.scrollTop}
            style={{
              height: 70,
              display: this.state.showScroll ? "flex" : "none",
            }}
          />
        </div>
      </div>
    );
  }
}
export default Cats;
