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
            this.state.requestsCats[`${index}`].cat_name
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
        MySwal.fire({
          position: "center",
          icon: "success",
          title: "Your request has been canceled.",
          confirmButtonColor: "#dea48f",
          timer: 3000,
        });
      }
    });
  };

  render() {
    return (
      <div className="request">
        {this.state.requestsCats.map((item, index) => {
          return (
            <div key={index} className="request__container">
              <CatsCard
                key={index}
                id={item.cat_id}
                image={item.image}
                catName={item.cat_name}
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
