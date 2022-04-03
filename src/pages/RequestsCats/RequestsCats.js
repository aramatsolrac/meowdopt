import "./RequestsCats.scss";
import { Component } from "react";
import { getLoggedUser } from "../../helpers/authHelper";
import { styleStatus } from "../../helpers/styleStatus";
import { fetchRequestCats, deleteRequest } from "../../helpers/serverHelper";
import CatsCard from "../../components/CatsCard/CatsCard";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

class RequestsCats extends Component {
  state = {
    requestsCats: [],
  };

  componentDidMount() {
    this.requestsCats();
  }

  requestsCats = async () => {
    const requestsCats = await fetchRequestCats(getLoggedUser().id);
    this.setState({
      requestsCats: requestsCats,
    });
  };

  handleDelete = (id, index) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: (
        <p>
          Are you sure you want to cancel the adoption request of{" "}
          <span className="alert__name">{`${
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
        deleteRequest(id, () => this.requestsCats());
      }
    });
  };

  render() {
    document.title = `${
      this.state.requestsCats[0] && this.state.requestsCats[0].name
    } Requests | meowadopt`;

    return (
      <div className="request">
        {this.state.requestsCats.map((item, index) => {
          return (
            <div key={index} className="request__container">
              <CatsCard
                key={index}
                id={item.catID}
                image={item.image}
                catName={item.catName}
                urlPath={"/cats"}
              />
              <div className="request__buttons">
                <p className="request__status">
                  <span
                    className={`request__status ${styleStatus(item.status)}`}
                  >
                    {item.status}
                  </span>
                </p>

                <button
                  className="request__cancel"
                  type="submit"
                  onClick={() => this.handleDelete(item.id, index)}
                >
                  Cancel
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default RequestsCats;
