import "./Shelter.scss";
import axios from "axios";
import { Component } from "react";
import CatsCard from "./../../components/CatsCard/CatsCard";
import { ArrowBackIcon } from "@chakra-ui/icons";

const baseURL = process.env.REACT_APP_API_URL;
const sheltersURL = `${baseURL}/shelters`;

class Shelter extends Component {
  state = {
    shelterCats: null,
    selectedShelter: null,
  };

  componentDidMount() {
    this.fetchShelterCats();
    this.fetchSelectedShelter();
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

  fetchSelectedShelter = () => {
    axios
      .get(`${sheltersURL}/${this.props.match.params.id}`)
      .then((response) => {
        let selectedShelter = response.data;
        console.log({ selectedShelter });
        this.setState({
          selectedShelter: selectedShelter,
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
      this.state.selectedShelter && this.state.selectedShelter.name
    } | meowadopt`;
    return (
      <>
        <ArrowBackIcon onClick={this.handleBack} w={30} h={30} />
        {this.state.selectedShelter && (
          <div>
            <p>{this.state.selectedShelter.name}</p>
            <p>{this.state.selectedShelter.address}</p>
            <p>{this.state.selectedShelter.city}</p>
            <p>{this.state.selectedShelter.country}</p>
            <p>{this.state.selectedShelter.email}</p>
          </div>
        )}
        {this.state.shelterCats &&
          this.state.shelterCats.map((item, index) => {
            return (
              <CatsCard
                key={index}
                id={item.id}
                image={item.image}
                catName={item.catName}
                urlPath={"/cats"}
              />
            );
          })}
      </>
    );
  }
}
export default Shelter;
