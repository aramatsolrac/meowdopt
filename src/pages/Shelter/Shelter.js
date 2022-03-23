import "./Shelter.scss";
import axios from "axios";
import { Component } from "react";
import CatsCard from "./../../components/CatsCard/CatsCard";

const baseURL = process.env.REACT_APP_API_URL;
const sheltersURL = `${baseURL}/shelters`;

class Shelter extends Component {
  state = {
    shelterCats: null,
    selectedCat: null,
  };

  componentDidMount() {
    this.fetchShelterCats();
  }

  fetchShelterCats = () => {
    axios
      .get(`${sheltersURL}/${this.props.match.params.id}/cats`)
      .then((response) => {
        let shelterCats = response.data;
        console.log({ shelterCats });
        this.setState({
          shelterCats: shelterCats,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error trying to fetch the API.");
      });
  };

  render() {
    document.title = `${
      this.state.shelter && this.state.shelterCats[0].shelterName
    } | meowadopt`;
    return (
      <>
        <div>
          <p>{this.state.shelter && this.state.shelterCats[0].shelterName}</p>
        </div>
        {this.state.shelterCats &&
          this.state.shelterCats.map((item, index) => {
            return (
              <CatsCard
                key={index}
                id={item.id}
                image={item.image}
                catName={item.catName}
              />
            );
          })}
      </>
    );
  }
}
export default Shelter;
