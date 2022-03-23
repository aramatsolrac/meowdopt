import "./CatDetails.scss";
import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import CatsCard from "../../components/CatsCard/CatsCard";
import Button from "../../components/Button/Button";

const baseURL = process.env.REACT_APP_API_URL;
const catsURL = `${baseURL}/cats`;

class CatDetails extends Component {
  state = {
    selectedCat: null,
  };

  componentDidMount() {
    this.fetchSelectedCat();
  }

  fetchSelectedCat = () => {
    axios
      .get(`${catsURL}/${this.props.match.params.id}`)
      .then((response) => {
        let selectedCat = response.data;
        console.log(selectedCat);
        this.setState({
          selectedCat: selectedCat,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error trying to fetch the API.");
      });
  };

  render() {
    document.title = `${
      this.state.selectedCat && this.state.selectedCat.catName
    } | meowadopt`;
    return (
      <>
        {this.state.selectedCat && (
          <>
            <CatsCard
              key={this.state.selectedCat.id}
              id={this.state.selectedCat.id}
              image={this.state.selectedCat.image}
              catName={this.state.selectedCat.catName}
            />
            <div>
              <div>
                <p>{this.state.selectedCat.age}</p>
              </div>
              <div>
                <p>{this.state.selectedCat.gender}</p>
              </div>
              <div>
                <Link to={`/shelters/${this.state.selectedCat.shelterID}`}>
                  {this.state.selectedCat.shelterName}
                </Link>
              </div>
              <div>
                <p>{this.state.selectedCat.description}</p>
              </div>
              <Button children={"Adopt me"} />
            </div>
          </>
        )}
      </>
    );
  }
}
export default CatDetails;
