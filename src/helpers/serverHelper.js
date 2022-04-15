import axios from "axios";

export const baseURL = process.env.REACT_APP_API_URL;

const catsURL = `${baseURL}/cats`;
const favoriteCatsURL = `${baseURL}/users`;
const requestCatsURL = `${baseURL}/users`;
const requestURL = `${baseURL}/requests`;
const sheltersURL = `${baseURL}/shelters`;
const signUpURL = `${baseURL}/users/signup`;

const handleErrorMessage = (error) => {
  console.log(error);
  alert("Error trying to fetch the API.");
};

export function fetchCats() {
  return axios
    .get(catsURL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      handleErrorMessage(error);
    });
}

export const fetchSelectedCat = (catID) => {
  return axios
    .get(`${catsURL}/${catID}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      handleErrorMessage(error);
    });
};

export const fetchFavoriteCats = (userID) => {
  return axios
    .get(`${favoriteCatsURL}/${userID}/favorites`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      handleErrorMessage(error);
    });
};

export const fetchRequestCats = (userID) => {
  return axios
    .get(`${requestCatsURL}/${userID}/requests`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      handleErrorMessage(error);
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
      handleErrorMessage(error);
    });
};

export const removeLikeCat = (catID, userID, handleSuccess) => {
  const data = {
    data: {
      catID: catID,
      userID: userID,
    },
  };

  axios
    .delete(`${catsURL}/${catID}/remove-like`, data)
    .then(() => handleSuccess())
    .catch((error) => {
      handleErrorMessage(error);
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
      handleErrorMessage(error);
    });
};

export const deleteRequest = (requestID, handleSuccess) => {
  axios
    .delete(`${requestURL}/${requestID}/delete`)
    .then(() => handleSuccess())
    .catch((error) => {
      handleErrorMessage(error);
    });
};

export const fetchShelterCats = (shelterID) => {
  return axios
    .get(`${sheltersURL}/${shelterID}/cats`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      handleErrorMessage(error);
    });
};

export const fetchSelectedShelter = (shelterID) => {
  return axios
    .get(`${sheltersURL}/${shelterID}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      handleErrorMessage(error);
    });
};

export const signUp = (name, username, email, password, handleSuccess) => {
  const data = {
    name: name,
    username: username,
    email: email,
    password: password,
  };
  return axios
    .post(`${signUpURL}`, data)
    .then(() => handleSuccess())
    .catch((error) => {
      handleErrorMessage(error);
    });
};
