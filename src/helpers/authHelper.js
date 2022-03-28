import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const baseURL = process.env.REACT_APP_API_URL;
const loginURL = `${baseURL}/login`;

// check if the user data match with the backend
export function login(userName, password, onSuccess) {
  const MySwal = withReactContent(Swal);

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
      MySwal.fire({
        position: "center",
        icon: "success",
        title: "You are successfully logged in",
        showConfirmButton: false,
        timer: 2000,
      });
    })
    .catch((error) => {
      //console.log(error.response);
      MySwal.fire({
        position: "center",
        icon: "error",
        title: "Username or Password invalid!",
        showConfirmButton: false,
        timer: 3000,
      });
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
