import Axios from 'axios';

const signupAPI = async (email, password, username) => {
  const response = await Axios.post(`http://localhost:4000/register`, {
    email,
    password,
    username,
  });
  return response.data;
};

const loginAPI = async (email, password) => {
  const response = await Axios.post(`http://localhost:4000/login`, {
    email,
    password,
  });
  return response.data;
};

module.exports = {
  signupAPI,
  loginAPI,
};
