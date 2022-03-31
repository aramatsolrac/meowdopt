import "./Shelter.scss";
import axios from "axios";
import { Component } from "react";
import CatsCard from "./../../components/CatsCard/CatsCard";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

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
    console.log("Shelter");

    document.title = `${
      this.state.selectedShelter && this.state.selectedShelter.name
    } | meowadopt`;
    return (
      <>
        <ArrowBackIcon
          onClick={this.handleBack}
          w={30}
          h={30}
          color={"#dea48f"}
          className="shelter__back"
        />
        {this.state.selectedShelter && (
          <div className="shelter">
            <div className="shelter__content">
              <FontAwesomeIcon
                icon={faPaw}
                size="lg"
                className="shelter__icon"
              />
              <p className="shelter__name">{this.state.selectedShelter.name}</p>
            </div>
            <div className="shelter__content">
              <FontAwesomeIcon
                icon={faLocationDot}
                size="lg"
                className="shelter__icon"
              />
              <p>
                {this.state.selectedShelter.address}
                {", "}
                {this.state.selectedShelter.city}
              </p>
            </div>
            <div className="shelter__content">
              <FontAwesomeIcon
                icon={faEnvelope}
                size="lg"
                className="shelter__icon"
              />
              <p
                onClick={() =>
                  window.open(
                    `mailto:${this.state.selectedShelter.email}`,
                    `_blank`
                  )
                }
              >
                {this.state.selectedShelter.email}
              </p>
            </div>
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
