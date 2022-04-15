import "./CatDetails.scss";
import { Component } from "react";
import { Link } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  fetchSelectedCat,
  fetchFavoriteCats,
  fetchRequestCats,
  likeCat,
  removeLikeCat,
  catRequest,
  baseURL,
} from "../../helpers/serverHelper";
import { isLoggedIn, getLoggedUser } from "../../helpers/authHelper";
import CatsCard from "../../components/CatsCard/CatsCard";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class CatDetails extends Component {
  state = {
    selectedCat: null,
    isCatRequested: false,
    isCatLiked: false,
  };

  async componentDidMount() {
    const selectedCat = await fetchSelectedCat(this.props.match.params.id);

    this.setState({
      selectedCat: selectedCat,
    });

    this.updateLikeAndRequest();
  }

  async updateLikeAndRequest() {
    if (!isLoggedIn()) {
      return;
    }

    const favoritesCats = await fetchFavoriteCats(getLoggedUser().id);
    const requestsCats = await fetchRequestCats(getLoggedUser().id);

    const foundFavCat = favoritesCats.find(
      (cat) => cat.cat_id === this.state.selectedCat.id
    );

    const foundRequestCat = requestsCats.find(
      (cat) => cat.cat_id === this.state.selectedCat.id
    );

    this.setState({
      isCatRequested: !foundRequestCat ? false : true,
      isCatLiked: !foundFavCat ? false : true,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!isLoggedIn()) {
      this.props.history.push("/login");
      return;
    }

    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: (
        <p>
          Do you want to send an adoption request to{" "}
          <span className="alert__name">{this.state.selectedCat.name}</span>?
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
        catRequest(
          this.state.selectedCat.id,
          getLoggedUser(),
          "Received",
          () => {
            MySwal.fire({
              position: "center",
              icon: "success",
              title: (
                <div className="alert">
                  <p>Submitted!</p>
                  <p>
                    <span className="alert__name">
                      {this.state.selectedCat.shelter_name}{" "}
                    </span>{" "}
                    will contact you soon!
                  </p>
                  <p>
                    {" "}
                    <span className="alert__name">
                      {this.state.selectedCat.name}
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
            this.updateLikeAndRequest();
          }
        );
      }
    });
  };

  handleLike = () => {
    if (!isLoggedIn()) {
      this.props.history.push("/login");
      return;
    }

    if (!this.state.isCatLiked) {
      likeCat(this.state.selectedCat.id, getLoggedUser().id, () =>
        this.updateLikeAndRequest()
      );
    } else {
      removeLikeCat(this.state.selectedCat.id, getLoggedUser().id, () =>
        this.updateLikeAndRequest()
      );
    }
  };

  render() {
    document.title = `${
      this.state.selectedCat && this.state.selectedCat.name
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
    const isCatLikedClass = !this.state.isCatLiked
      ? `catDetails__like`
      : `catDetails__liked`;

    return (
      <div
        className="catDetails"
        style={{ minHeight: window.screen.height + 10 }}
      >
        <ArrowBackIcon
          onClick={this.props.history.goBack}
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
              catName={this.state.selectedCat.name}
            />
            <div className="catDetails__container">
              <div className="catDetails__info">
                <p>{this.state.selectedCat.age}</p>
                <p>{this.state.selectedCat.gender}</p>
              </div>
              <div className="catDetails__shelter">
                <Link
                  to={`/shelters/${this.state.selectedCat.shelter_id}`}
                  className="catDetails__shelter-link"
                >
                  {this.state.selectedCat.shelter_name}
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
                    className={isCatLikedClass}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default CatDetails;
