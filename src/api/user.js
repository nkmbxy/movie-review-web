import { axiosInstance } from '@/lib/axiosInstance';

const signupAPI = async (email, password, username) => {
  const response = await AxaxiosInstanceios.post(`/user/register`, {
    email,
    password,
    username,
  });
  return response;
};

const loginAPI = async (email, password) => {
  const response = await axiosInstance.post(`/user/login`, {
    email,
    password,
  });
  return response;
};

module.exports = {
  signupAPI,
  loginAPI,
};
