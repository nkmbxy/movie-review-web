'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Typography,
  Rating,
  Card,
  Stack,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CardMedia,
  IconButton,
  Divider,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'next/navigation';
import AlertDialogConfirm from '../../../components/alertDialog/alertConfirm';
import AlertDialogError from '../../../components/alertDialog/alertError';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { makeStyles } from '@mui/styles';
import { axiosInstance } from '@/lib/axiosInstance';
import { useRouter } from 'next/navigation';
import ToastSuccess from '../../../components/toast';

const useStyles = makeStyles({
  boxComment: {
    height: '70%',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 5,
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  },
});

export default function movieReviewPage() {
  const params = useParams();
  const classes = useStyles();
  const Router = useRouter();
  const [open, setOpen] = useState(false);
  const [showSpoil, setShowSpoil] = useState(false);
  const [ReviewByIdAPI, setReviewByIdAPI] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAlertDialogError, setOpenAlertDialogError] = useState(false);
  const [messageDialogError, setMessageDialogError] = useState('');
  const [titleDialogError, setTitleDialogError] = useState('');
  const [moviesGenre, setMoviesGenre] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [checkFavorite, setCheckFavorite] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const getReviewByIdAPI = async review_id => {
    try {
      const response = await axiosInstance.get(`/review/getReviewByID/${review_id}`);

      return response;
    } catch (error) {
      console.error('Error fetching review by ID:', error);
    }
  };

  const keepGenre = ReviewByIdAPI?.movie_id?.genre_id?.genre
  const getMoviesGenre = async () => {
    const respond = await axiosInstance.get(`/genre/movieSortByGenre?genre=${keepGenre}`)
    setMoviesGenre(respond?.data?.data?.movie_id)
  }

  // console.log(ReviewByIdAPI?.movie_id?.genre_id?.genre);

  const handleCheckFavorite = async () => {
    try {
      const response = await axiosInstance.get(`/favorite/favColor/${ReviewByIdAPI?.movie_id?._id}`);
      setCheckFavorite(response.data.status);
    } catch (error) {
      console.log('Error checking favorite:', error);
    }
  };

  const handleFavorite = async () => {
    try {
      if (checkFavorite === false) {
        const response = await axiosInstance.post(`/favorite/add/${ReviewByIdAPI?.movie_id?._id}`);
        if (response.status === 200) {
          setCheckFavorite(true);
        }
      } else {
        const response = await axiosInstance.delete(`/favorite/delete/${ReviewByIdAPI?.movie_id?._id}`);
        if (response.status === 200) {
          setCheckFavorite(false);
        }
      }
    } catch (error) {
      console.log('Error checking favorite:', error);
    }
  };

  const createCommentAPI = async (review_id, comment_text) => {
    try {
      const response = await axiosInstance.post(`/comment/createComment`, {
        review_id,
        comment_text,
      });
      return response;
    } catch (error) {}
  };

  const handleCommentSubmit = async e => {
    e.preventDefault();
    try {
      const response = await createCommentAPI(params.id, commentText);
      if (response !== 'Comment created successfully!') {
        setOpenToast(true);
      }
      setReviewByIdAPI(prev => ({
        ...prev,
        comments: [{ comment_text: commentText, like_counter: 0 }, ...prev.comments],
      }));
      setCommentText('');
    } catch (error) {
      setOpenAlertDialogError(true);
      setMessageDialogError('Error creating comment:');
      setTitleDialogError('Error');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmSpoil = () => {
    setShowSpoil(true);
    setOpen(true);
    setOpenConfirmDialog(false);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setShowSpoil(false);
  };

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  // const chunkMoviesGenre = (moviews, chunkSize) => {
  //   const chunks = [];
  //   for (let i = 0; i < moviews.length; i += chunkSize) {
  //     chunks.push(moviews.slice(i, i + chunkSize));
  //   }
  //   return chunks;
  // };

  const handleGetReviewByIdAPI = async () => {
    try {
      const movie_Id = params?.id;
      const res = await getReviewByIdAPI(movie_Id);
      // const chunkMovies = chunkMoviesGenre(res.moviesGenre, 3);
      setReviewByIdAPI(res.data.review);
      // setMoviesGenre(chunkMovies);
    } catch (error) {
      console.log(error);
      setOpenAlertDialogError(true);
      setMessageDialogError('Failed to fetch the review');
      setTitleDialogError('Error');
      return;
    }
  };

  useEffect(() => {
    getMoviesGenre();
    handleGetReviewByIdAPI();
    handleCheckFavorite();
  }, [getMoviesGenre, handleGetReviewByIdAPI, handleCheckFavorite]);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const response = await createCommentAPI(e.target[0].value, e.target[1].value);
    } catch (err) {
      setOpenAlertDialogError(true);
      setMessageDialogError('Failed to login');
      setTitleDialogError('Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        style={{
          backgroundColor: '#000000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <img src={ReviewByIdAPI?.movie_id?.image || ''} alt="Movie Image" style={{ width: 710, height: 400 }} />
        </Grid>

        <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
          <Grid item style={{ width: '60%' }}>
            <Grid
              container
              spacing={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Grid item xs={8} sx={{ marginLeft: '390px' }}>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color: '#ffffff',
                    marginTop: '20px',
                  }}
                >
                  {ReviewByIdAPI?.movie_id?.title || ''}
                </Typography>

                <Typography component="legend" sx={{ color: '#ffffff', marginTop: '10px', fontWeight: 'bold' }}>
                  Score
                </Typography>

                <Rating name="simple-controlled" value={ReviewByIdAPI?.score || ''} readOnly />

                <Typography variant="body1" sx={{ color: '#ffffff', marginTop: '10px', fontWeight: 'bold' }}>
                  Genre : {ReviewByIdAPI?.movie_id?.genre_id?.genre || ''}
                </Typography>

                <Typography variant="body1" sx={{ color: '#ffffff', marginTop: '10px', fontWeight: 'bold' }}>
                  Plot
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: '#ffffff',
                    marginBottom: '20px',
                  }}
                >
                  {ReviewByIdAPI?.movie_id?.synopsis || ''}
                </Typography>
              </Grid>

              <Grid
                container
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Card
                  sx={{
                    paddingTop: 2,
                    paddingLeft: 2,
                    paddingRight: 2,
                    width: 400,
                    height: 230,
                    marginLeft: '320px',
                    borderRadius: '15px',
                  }}
                >
                  <Stack
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box className={classes.boxComment}>
                      {ReviewByIdAPI?.comments?.map((comment, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            marginTop: '-15px',
                          }}
                        >
                          <Avatar sx={{ margin: '15px', width: 30, height: 30 }} />
                          <TextField
                            placeholder={comment?.comment_text}
                            className="w-full"
                            variant="standard"
                            type="text"
                            InputProps={{
                              readOnly: true,
                              disableUnderline: true,
                            }}
                            InputLabelProps={{
                              style: { color: 'grey' },
                              shrink: true,
                            }}
                            sx={{
                              width: 250,
                              marginTop: '13px',
                              '& .MuiInputBase-input::placeholder': {
                                fontSize: '13.5px',
                              },
                            }}
                          />
                          <Button sx={{ width: 0, height: 25, marginTop: '15px' }}></Button>
                        </Box>
                      ))}
                    </Box>

                    <Box sx={{ height: '30%' }}>
                      <Divider style={{ backgroundColor: '#dadada', width: '400px' }}></Divider>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar sx={{ margin: '15px', width: 30, height: 30 }} />
                        <TextField
                          placeholder="Write a comment.."
                          className="w-full"
                          variant="standard"
                          type="text"
                          name="comment"
                          value={commentText}
                          onChange={e => setCommentText(e.target.value)}
                          sx={{
                            width: 250,

                            '& .MuiInputBase-input::placeholder': {
                              fontSize: '14.5px',
                            },
                          }}
                        />

                        <IconButton
                          color="primary"
                          onClick={handleCommentSubmit}
                          sx={{
                            '&:hover': {
                              backgroundColor: 'transparent',
                            },
                          }}
                        >
                          <SendIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Stack>
                </Card>
              </Grid>

              <Grid item>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#ffffff',
                    marginBottom: '10px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                >
                  Similar Reviews
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item style={{ width: '17.5%' }}>
            <Grid
              container
              spacing={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Grid item xs={8}>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#ffffff',
                    marginTop: '20px',
                    marginLeft: '9px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                  }}
                >
                  Writer : {ReviewByIdAPI?.pseudonym || ''}
                </Typography>
                <IconButton onClick={handleFavorite}>
                  {checkFavorite ? (
                    <BookmarkIcon style={{ fontSize: '2rem', color: '#ff0000' }} />
                  ) : (
                    <BookmarkBorderOutlinedIcon style={{ fontSize: '2rem', color: '#ffffff' }} />
                  )}
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#ffffff',
                    marginTop: '10px',
                    marginLeft: '9px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                  }}
                >
                  Leading Role : {ReviewByIdAPI?.actor || ''}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#ffffff',
                    marginTop: '8px',
                    marginLeft: '9px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                  }}
                >
                  Director : {ReviewByIdAPI?.director || ''}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#ffffff',
                    marginTop: '8px',
                    marginLeft: '9px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                  }}
                >
                  Satisfaction : {ReviewByIdAPI?.happy || ''}/10
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#ffffff',
                    marginTop: '8px',
                    marginLeft: '9px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                  }}
                >
                  Sadness : {ReviewByIdAPI?.drama || ''}/10
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#ffffff',
                    marginTop: '8px',
                    marginLeft: '9px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                  }}
                >
                  Funny : {ReviewByIdAPI?.joke || ''}/10
                </Typography>

                <Grid item sx={{ marginLeft: '40px' }}>
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: '15px',
                      backgroundColor: 'red',
                      width: '22px',
                      height: '25px',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'red',
                      },
                    }}
                    onClick={() => setOpenConfirmDialog(true)}
                  >
                    spoil!
                  </Button>

                  <Grid>
                    <AlertDialogConfirm
                      onConfirm={handleConfirmSpoil}
                      openAlertDialog={openConfirmDialog}
                      handleOnCloseDialog={handleCloseConfirmDialog}
                      message="Are you sure you want to read spoilers?"
                    />

                    <AlertDialogError
                      openAlertDialog={openAlertDialogError}
                      handleOnCloseDialog={handleOnCloseDialog}
                      message={messageDialogError}
                      title={titleDialogError}
                    />
                    <Dialog open={open} onClose={handleClose}>
                      <IconButton onClick={handleClose} sx={{ marginLeft: '545px', marginTop: '5px' }}>
                        <CloseIcon />
                      </IconButton>
                      <DialogTitle
                        sx={{
                          marginTop: '-30px',
                          fontSize: '22px',
                          fontWeight: 'bold',
                        }}
                      >
                        Spoiler
                      </DialogTitle>
                      <DialogContent>
                        {showSpoil ? (
                          <Typography>{ReviewByIdAPI?.spoil_text || ''}</Typography>
                        ) : (
                          <Typography>Spoilers have not yet been revealed.</Typography>
                        )}
                      </DialogContent>
                    </Dialog>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <style>
            {`
              .carousel .control-arrow.control-prev {
                left: 350px; 
              }
              .carousel .control-arrow.control-next {
                right: 350px;
              }
            `}
          </style> */}

          <Carousel
              infiniteLoop={false}
              showThumbs={false}
              centerMode={true}
              centerSlidePercentage={16}
              showArrows={true}
              stopOnHover={true}
              showStatus={false}
              showIndicators={false}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                '& .control-dots': {
                  bottom: '-40px',
                },
                '& .dot': {
                  margin: '0 5px',
                },
              }}
            >
              {moviesGenre?.map((item) => (
                  <Box
                    sx={{
                      width: 200,
                      height: 150,
                      marginInline: '8px',
                    }}
                    onClick={() => (Router.push(`/movieReview/${item?.review_id}`))}
                  >
                    <img
                      src={item.image}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                ))}
            </Carousel>
        </Grid>
      </Grid>
      <ToastSuccess openToast={openToast} handleCloseToast={handleCloseToast} text="Post Success" showClose={true} />
    </form>
  );
}
