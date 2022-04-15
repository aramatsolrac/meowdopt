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
      this.state.favoritesCats[0] && this.state.favoritesCats[0].user_name
    } Profile | meowadopt`;

    return (
      <div className="favoritesCats">
        {this.state.favoritesCats.map((item, index) => {
          return (
            <CatsCard
              key={index}
              id={item.cat_id}
              image={item.image}
              catName={item.cat_name}
              urlPath={"/cats"}
            />
          );
        })}
      </div>
    );
  }
}

export default FavoritesCats;
