import axios from "axios";

// url
const apiURL = "http://localhost:4000/user-api/";

const register = async (user) => {
  // post user
  let res = await axios.post(apiURL + "create-user", user);
  // send the response from api (server)
  return res.data;
};

const login = async (user) => {
  let res = await axios.post(apiURL + "login", user);

  if (res.data.message === "success") {
    // store the creds to local storage
    localStorage.setItem("user", JSON.stringify(res.data.user));
  }

  return res.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
