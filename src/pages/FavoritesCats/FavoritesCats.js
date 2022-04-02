import "./FavoritesCats.scss";
import { Component } from "react";
import { getLoggedUser } from "../../helpers/authHelper";
import { fetchFavoriteCats } from "../../helpers/serverHelper";
import CatsCard from "../../components/CatsCard/CatsCard";

class FavoritesCats extends Component {
  state = {
    favoritesCats: [],
  };

  async componentDidMount() {
    const favoritesCats = await fetchFavoriteCats(getLoggedUser().id);
    this.setState({
      favoritesCats: favoritesCats,
    });
  }

  render() {
    document.title = `${
      this.state.favoritesCats[0] && this.state.favoritesCats[0].userName
    } Favorites Cats | meowadopt`;

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
