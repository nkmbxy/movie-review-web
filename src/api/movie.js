import Axios from 'axios';

const getRandomMoviesAPI = async address_wallet => {
  const response = await Axios.get(`${Config.apiBaseURL}/owner-nft/get-owner-nft/${address_wallet}`);
  return response.data;
};

const getMoviesByCountryAPI = async address_wallet => {
  const response = await Axios.get(`${Config.apiBaseURL}/owner-nft/get-owner-nft/${address_wallet}`);
  return response.data;
};

module.exports = {
  getRandomMoviesAPI,
  getMoviesByCountryAPI,
};
