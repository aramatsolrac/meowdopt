import "./CatDetails.scss";
import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CatsCard from "../../components/CatsCard/CatsCard";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { isLoggedIn, getLoggedUser } from "../../helpers/authHelper";

const baseURL = process.env.REACT_APP_API_URL;
const catsURL = `${baseURL}/cats`;
const requestURL = `${baseURL}/requests`;
const favoriteCatsURL = `${baseURL}/users`;
const requestCatsURL = `${baseURL}/users`;

class CatDetails extends Component {
  state = {
    selectedCat: null,
    isCatRequested: false,
    isLiked: false,
    favoritesCats: [],
    requestsCats: [],
  };

  componentDidMount() {
    this.fetchSelectedCat();
    this.fetchFavoriteCats();
    this.fetchRequestCats();
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
          <span className="alert__name">{this.state.selectedCat.catName}</span>?
        </p>
      ),
      html: `<img src='${baseURL}${this.state.selectedCat.image}' alt="cat" />`,
      showCancelButton: true,
      confirmButtonText: (
        <div className="alert__icon">
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
                <div className="alert">
                  <p>Submitted!</p>
                  <p>
                    <span className="alert__name">
                      {this.state.selectedCat.shelterName}{" "}
                    </span>{" "}
                    will contact you soon!
                  </p>
                  <p>
                    {" "}
                    <span className="alert__name">
                      {this.state.selectedCat.catName}
                    </span>{" "}
                    is looking forward to meet you!
                  </p>
                </div>
              ),
              showConfirmButton: true,
              confirmButtonText: (
                <div className="alert__icon">
                  <FontAwesomeIcon icon={faHeart} />
                  <p>Ok</p>
                </div>
              ),
              confirmButtonColor: "#dea48f",
              timer: 15000,
            });
            this.fetchRequestCats();
          })
          .catch((error) => {
            console.log(error);
            alert("Error trying to fetch the API.");
          });
      }
    });
  };

  fetchFavoriteCats = () => {
    if (isLoggedIn()) {
      axios
        .get(`${favoriteCatsURL}/${getLoggedUser().id}/favorites`)
        .then((response) => {
          let favoritesCats = response.data;
          console.log(favoritesCats);
          this.setState({
            favoritesCats: favoritesCats,
          });
          // if (isLoggedIn()) {
          const foundFavCat = this.state.favoritesCats.find(
            (cat) => cat.catID === this.state.selectedCat.id
          );
          this.setState({
            isLiked: !foundFavCat ? false : true,
          });
          // }
        })
        .catch((error) => {
          console.log(error);
          alert("Error trying to fetch the API.");
        });
    }
  };

  fetchRequestCats = () => {
    if (isLoggedIn()) {
      axios
        .get(`${requestCatsURL}/${getLoggedUser().id}/requests`)
        .then((response) => {
          let requestsCats = response.data;
          this.setState({
            requestsCats: requestsCats,
          });
          // if (isLoggedIn()) {
          const foundRequestCat = this.state.requestsCats.find(
            (cat) => cat.catID === this.state.selectedCat.id
          );
          this.setState({
            isCatRequested: !foundRequestCat ? false : true,
          });
          // }
        })
        .catch((error) => {
          console.log(error);
          alert("Error trying to fetch the API.");
        });
    }
  };

  handleLike = () => {
    //TODO when dislike is not able to like again without refresh the page
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
    const isCatRequestedClass = !this.state.isCatRequested
      ? `catDetails__adopt`
      : `catDetails__requested`;
    const isCatRequestedButton = !this.state.isCatRequested
      ? `Adopt Me`
      : `Requested`;
    const isCatRequestedButtonDisabled = !this.state.isCatRequested
      ? ""
      : `{true}`;
    const isLikedClass = !this.state.isLiked
      ? `catDetails__like`
      : `catDetails__liked`;

    return (
      <>
        <ArrowBackIcon
          onClick={this.handleBack}
          w={30}
          h={30}
          color={"#dea48f"}
          className="catDetails__back"
        />
        {this.state.selectedCat && (
          <>
            <CatsCard
              key={this.state.selectedCat.id}
              id={this.state.selectedCat.id}
              image={this.state.selectedCat.image}
              catName={this.state.selectedCat.catName}
            />
            <div className="catDetails">
              <div className="catDetails__info">
                <p>{this.state.selectedCat.age}</p>
                <p>{this.state.selectedCat.gender}</p>
              </div>
              <div className="catDetails__shelter">
                <Link
                  to={`/shelters/${this.state.selectedCat.shelterID}`}
                  className="catDetails__shelter-link"
                >
                  {this.state.selectedCat.shelterName}
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    size="lg"
                    className="catDetails__shelter-icon"
                  />
                </Link>
              </div>
              <div className="catDetails__description">
                <p>{this.state.selectedCat.description}</p>
              </div>
              <div className="catDetails__buttons">
                <div>
                  <button
                    type="submit"
                    onClick={this.handleSubmit}
                    className={isCatRequestedClass}
                    disabled={isCatRequestedButtonDisabled}
                  >
                    {isCatRequestedButton}
                  </button>
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faHeart}
                    onClick={this.handleLike}
                    className={isLikedClass}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
export default CatDetails;
