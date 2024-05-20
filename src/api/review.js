import Axios from 'axios';
const getReviewByIDAPI = async review_id => {
  const response = await Axios.get(`http://localhost:4000/review/getReviewByID/${review_id}`);
  return response.data;
};

module.exports = {
  getReviewByIDAPI,
};
