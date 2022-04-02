import axios from "axios";

export const baseURL = process.env.REACT_APP_API_URL;

const catsURL = `${baseURL}/cats`;
const favoriteCatsURL = `${baseURL}/users`;
const requestCatsURL = `${baseURL}/users`;
const requestURL = `${baseURL}/requests`;

export const fetchSelectedCat = (catID) => {
  return axios
    .get(`${catsURL}/${catID}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      alert("Error trying to fetch the API.");
    });
};

export const fetchFavoriteCats = (userID) => {
  return axios
    .get(`${favoriteCatsURL}/${userID}/favorites`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      alert("Error trying to fetch the API.");
    });
};

export const fetchRequestCats = (userID) => {
  return axios
    .get(`${requestCatsURL}/${userID}/requests`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      alert("Error trying to fetch the API.");
    });
};

export const likeCat = (catID, userID, handleSuccess) => {
  const data = {
    catID: catID,
    userID: userID,
  };

  axios
    .post(`${catsURL}/${catID}/like`, data)
    .then(() => handleSuccess())
    .catch((error) => {
      console.log(error);
      alert("Error trying to fetch the API.");
    });
};

export const removeLikeCat = (catID, handleSuccess) => {
  axios
    .delete(`${catsURL}/${catID}/remove-like`)
    .then(() => handleSuccess())
    .catch((error) => {
      console.log(error);
      alert("Error trying to fetch the API.");
    });
};

export const catRequest = (catID, user, status, handleSuccess) => {
  const data = {
    catID: catID,
    userID: user.id,
    name: user.name,
    email: user.email,
    status: status,
  };
  axios
    .post(`${requestURL}/${user.id}/form`, data)
    .then(() => handleSuccess())
    .catch((error) => {
      console.log(error);
      alert("Error trying to fetch the API.");
    });
};
