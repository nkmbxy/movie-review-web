import axios from 'axios';

const getReviewByIdAPI = async review_id => {
  const response = await axios.get(`http://localhost:4000/review/getReviewByID/${review_id}`);
  return response.data;
};

const createCommentAPI = async (review_id, comment_text) => {
  try {
    const response = await axios.post(
      'http://localhost:4000/comment/createComment',
      {
        review_id,
        comment_text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

module.exports = {
  getReviewByIdAPI,
  createCommentAPI,
};
