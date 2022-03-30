import "./CatDetails.scss";
import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import CatsCard from "../../components/CatsCard/CatsCard";
import Button from "../../components/Button/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { isLoggedIn, getLoggedUser } from "../../helpers/authHelper";

const baseURL = process.env.REACT_APP_API_URL;
const catsURL = `${baseURL}/cats`;
const requestURL = `${baseURL}/requests`;
const favoriteCatsURL = `${baseURL}/users`;

class CatDetails extends Component {
  state = {
    selectedCat: null,
    isCatRequested: false,
    isLiked: false,
    favoritesCats: [],
  };

  componentDidMount() {
    this.fetchSelectedCat();
    this.fetchFavoriteCats();
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

  handleSubmit = (event) => {
    event.preventDefault();

    if (!isLoggedIn()) {
      this.props.history.push("/login");
      return;
    }

    const MySwal = withReactContent(Swal);
    const data = {
      catID: this.state.selectedCat.id,
      userID: getLoggedUser().id,
      name: getLoggedUser().name,
      email: getLoggedUser().email,
      status: "Received",
    };
    MySwal.fire({
      title: (
        <p>
          Do you want to send an adoption request to{" "}
          <span className="test">{this.state.selectedCat.catName}</span>?
        </p>
      ),
      html: `<img src='${baseURL}${this.state.selectedCat.image}' alt="cat"/>`,
      showCancelButton: true,
      confirmButtonText: (
        <div className="test2">
          <FontAwesomeIcon icon={faHeart} />
          <p>Yes</p>
        </div>
      ),
      confirmButtonColor: "#dea48f",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`${requestURL}/${this.props.match.params.id}/form`, data)
          .then((response) => {
            console.log(response.data);
            MySwal.fire({
              position: "center",
              icon: "success",
              title: (
                <div className="test3">
                  <p>Submitted!</p>
                  <p>
                    <span className="test">
                      {this.state.selectedCat.shelterName}{" "}
                    </span>{" "}
                    will contact you soon!
                  </p>
                  <p>
                    {" "}
                    <span className="test">
                      {this.state.selectedCat.catName}
                    </span>{" "}
                    is looking forward to meet you!
                  </p>
                </div>
              ),
              showConfirmButton: true,
              confirmButtonText: (
                <div className="test2">
                  <FontAwesomeIcon icon={faHeart} />
                  <p>Ok</p>
                </div>
              ),
              confirmButtonColor: "#dea48f",
              timer: 15000,
            });
          })
          .catch((error) => {
            console.log(error);
            alert("Error trying to fetch the API.");
          });
      }
    });
  };

  fetchFavoriteCats = () => {
    axios
      .get(`${favoriteCatsURL}/${getLoggedUser().id}/favorites`)
      .then((response) => {
        let favoritesCats = response.data;
        console.log(favoritesCats);
        this.setState({
          favoritesCats: favoritesCats,
        });
        const foundFavCat = this.state.favoritesCats.find(
          (cat) => cat.catID === this.state.selectedCat.id
        );
        this.setState({
          isLiked: !foundFavCat ? false : true,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error trying to fetch the API.");
      });
  };

  handleLike = () => {
    if (!isLoggedIn()) {
      this.props.history.push("/login");
      return;
    }

    const data = {
      catID: this.state.selectedCat.id,
      userID: getLoggedUser().id,
    };

    const foundFavCat = this.state.favoritesCats.find(
      (cat) => cat.catID === this.state.selectedCat.id
    );

    if (!foundFavCat) {
      axios
        .post(`${catsURL}/${this.state.selectedCat.id}/like`, data)
        .catch((error) => {
          console.log(error);
          alert("Error trying to fetch the API.");
        });
      this.setState({
        isLiked: true,
      });
    } else {
      axios
        .delete(`${catsURL}/${this.state.selectedCat.id}/remove-like`)
        .catch((error) => {
          console.log(error);
          alert("Error trying to fetch the API.");
        });
      this.setState({
        isLiked: false,
      });
    }
  };

  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    document.title = `${
      this.state.selectedCat && this.state.selectedCat.catName
    } | meowadopt`;

    return (
      <>
        <ArrowBackIcon onClick={this.handleBack} w={30} h={30} />
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
              <div>
                <Button children="Adopt me" onClick={this.handleSubmit} />
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={this.handleLike}
                  className={`${!this.state.isLiked ? `like` : `liked`}`}
                  size="lg"
                />
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
export default CatDetails;
