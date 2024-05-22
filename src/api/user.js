import Axios from 'axios';

const signupAPI = async (email, password, username) => {
  const response = await Axios.post(`http://localhost:4000/user/register`, {
    email,
    password,
    username,
  });
  return response;
};

const loginAPI = async (email, password) => {
  const response = await Axios.post(`http://localhost:4000/user/login`, {
    email,
    password,
  });
  return response;
};

module.exports = {
  signupAPI,
  loginAPI,
};
