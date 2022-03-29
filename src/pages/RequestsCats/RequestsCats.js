import "./RequestsCats.scss";
import axios from "axios";
import { Component } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getLoggedUser } from "../../helpers/authHelper";
import CatsCard from "../../components/CatsCard/CatsCard";
import { Button } from "@mui/material";

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
  handleDelete = (id) => {
    axios
      .delete(`${baseURL}/requests/${id}/delete`)
      .then(() => {
        this.fetchRequestCats();
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
      this.state.requestsCats[0] && this.state.requestsCats[0].name
    } Requests | meowadopt`;

    return (
      <>
        <div>
          <h3>Requested Cats</h3>
          <ArrowBackIcon onClick={this.handleBack} w={30} h={30} />
        </div>
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
              <button type="submit" onClick={() => this.handleDelete(item.id)}>
                Delete
              </button>
              {/* <Button children={"Delete"} /> */}
            </div>
          );
        })}
      </>
    );
  }
}

export default RequestsCats;
