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
    filteredCats: [],
    searchInput: "",
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

  //function to search a specific video
  searchCats = (event) => {
    const searchInput = event.target.value.toLowerCase();
    console.log({ searchInput });
    const filteredCats = this.state.cats.filter((cat) => {
      return (
        cat.catName.toLowerCase().includes(searchInput) ||
        cat.shelterName.toLowerCase().includes(searchInput) ||
        cat.age.toLowerCase().includes(searchInput) ||
        cat.gender.toLowerCase().includes(searchInput) ||
        cat.description.toLowerCase().includes(searchInput)
      );
    });
    this.setState({
      filteredCats: filteredCats,
      searchInput: searchInput,
    });
  };

  render() {
    document.title = "Home | meowadopt";
    return (
      <>
        <Search searchCats={this.searchCats} />
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
