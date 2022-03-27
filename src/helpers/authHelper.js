import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
const loginURL = `${baseURL}/login`;

// check if the user data match with the backend
export function login(userName, password, onSuccess) {
  const data = {
    username: userName,
    password: password,
  };

  axios
    .post(loginURL, data)
    .then((response) => {
      // TODO: add expiration
      // TODO: encrypt data
      console.log(response.data);
      sessionStorage.setItem("userLoggedIn", response.data.user);
      onSuccess();
    })
    .catch((error) => {
      //console.log(error.response);
      alert("Username or password invalid");
    });
}

// check if the user is logged in
export function isLoggedIn() {
  const userLoggedIn = sessionStorage.getItem("userLoggedIn");
  return !!userLoggedIn;
}

// logout user
export function logout() {
  sessionStorage.removeItem("userLoggedIn");
}

// get all data from the logged user
export function getLoggedUser() {
  return JSON.parse(sessionStorage.getItem("userLoggedIn"));
}
