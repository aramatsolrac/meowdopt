import "./FavoritesCats.scss";
import axios from "axios";
import { Component } from "react";
import { getLoggedUser } from "../../helpers/authHelper";
import CatsCard from "../../components/CatsCard/CatsCard";

const baseURL = process.env.REACT_APP_API_URL;
const favoriteCatsURL = `${baseURL}/users`;

class FavoritesCats extends Component {
  state = {
    favoritesCats: [],
  };

  componentDidMount() {
    this.fetchFavoriteCats();
  }

  fetchFavoriteCats = () => {
    axios
      .get(`${favoriteCatsURL}/${getLoggedUser().id}/favorites`)
      .then((response) => {
        let favoritesCats = response.data;
        console.log(favoritesCats);
        this.setState({
          favoritesCats: favoritesCats,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error trying to fetch the API.");
      });
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    document.title = `${
      this.state.favoritesCats[0] && this.state.favoritesCats[0].userName
    } Favorites Cats | meowadopt`;

    console.log("Favorites");

    return (
      <div className="favoritesCats">
        {this.state.favoritesCats.map((item, index) => {
          return (
            <CatsCard
              key={index}
              id={item.catID}
              image={item.image}
              catName={item.catName}
              urlPath={"/cats"}
            />
          );
        })}
      </div>
    );
  }
}

export default FavoritesCats;
