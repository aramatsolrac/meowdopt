import "./Cats.scss";
import { Component } from "react";
import axios from "axios";
import CatsCard from "../../components/CatsCard/CatsCard";
const baseURL = process.env.REACT_APP_API_URL;
const catsURL = `${baseURL}/cats`;

class Cats extends Component {
  state = {
    cats: [],
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
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error trying to fetch the API.");
      });
  };
  render() {
    document.title = "Home | meowadopt";
    return this.state.cats.map((item, index) => {
      return (
        <CatsCard
          key={index}
          id={item.id}
          image={item.image}
          catName={item.catName}
        />
      );
    });
  }
}
export default Cats;
