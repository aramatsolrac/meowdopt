import "./Cats.scss";
import { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const apiURL = `http://localhost:8080/cats`;
class Cats extends Component {
  state = {
    cats: [],
  };

  componentDidMount() {
    return this.fetchCats();
  }

  fetchCats = () => {
    axios
      .get(apiURL)
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
    return this.state.cats.map((item) => {
      return (
        <Link key={item.id} to="">
          <img
            src={`${process.env.REACT_APP_API_URL}${item.image}`}
            alt="cat"
          />
          <p>{item.catName}</p>
        </Link>
      );
    });
  }
}
export default Cats;
