import "./RequestsCats.scss";
import axios from "axios";
import { Component } from "react";
import { getLoggedUser } from "../../helpers/authHelper";
import CatsCard from "../../components/CatsCard/CatsCard";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const baseURL = process.env.REACT_APP_API_URL;
const requestCatsURL = `${baseURL}/users`;

class RequestsCats extends Component {
  state = {
    requestsCats: [],
  };

  componentDidMount() {
    this.fetchRequestCats();
  }

  fetchRequestCats = () => {
    axios
      .get(`${requestCatsURL}/${getLoggedUser().id}/requests`)
      .then((response) => {
        let requestsCats = response.data;
        this.setState({
          requestsCats: requestsCats,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Error trying to fetch the API.");
      });
  };
  handleDelete = (id, index) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: (
        <p>
          Are you sure you want to cancel the adoption request of{" "}
          <span className="test">{`${
            this.state.requestsCats[`${index}`].catName
          }`}</span>
          ?
        </p>
      ),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d22d2d",
      confirmButtonText: "Yes, cancel it",
      cancelButtonColor: "#dea48f",
      cancelButtonText: "No, I'm not sure",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${baseURL}/requests/${id}/delete`)
          .then(() => {
            this.fetchRequestCats();
          })
          .catch((error) => {
            console.log(error);
            alert("Error trying to fetch the API.");
          });
      }
    });
  };
  handleBack = () => {
    this.props.history.goBack();
  };

  render() {
    document.title = `${
      this.state.requestsCats[0] && this.state.requestsCats[0].name
    } Requests | meowadopt`;

    return (
      <>
        {this.state.requestsCats.map((item, index) => {
          return (
            <div key={index}>
              <CatsCard
                key={index}
                id={item.catID}
                image={item.image}
                catName={item.catName}
                urlPath={"/cats"}
              />
              <p>
                Status: <span>{item.status}</span>
              </p>
              <button
                type="submit"
                onClick={() => this.handleDelete(item.id, index)}
              >
                Cancel
              </button>
            </div>
          );
        })}
      </>
    );
  }
}

export default RequestsCats;
