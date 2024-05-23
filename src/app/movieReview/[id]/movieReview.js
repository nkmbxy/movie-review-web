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
import { getReviewByIdAPI, createCommentAPI } from '../../../api/review';
import { useParams } from 'next/navigation';
import AlertDialogConfirm from '../../../components/alertDialog/alertConfirm';
import AlertDialogError from '../../../components/alertDialog/alertError';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { makeStyles } from '@mui/styles';

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
  const [open, setOpen] = useState(false);
  const [showSpoil, setShowSpoil] = useState(false);
  const [ReviewByIDAPI, setReviewByIDAPI] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAlertDialogError, setOpenAlertDialogError] = useState(false);
  const [messageDialogError, setMessageDialogError] = useState('');
  const [titleDialogError, setTitleDialogError] = useState('');
  const [moviesGenre, setMoviesGenre] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = useCallback(
    async e => {
      e.preventDefault();
      try {
        const response = await createCommentAPI(params.id, commentText);
        if (response !== 'Comment created successfully!') {
          setOpenAlertDialogError(true);
          setMessageDialogError('Failed to create comment');
          setTitleDialogError('Error');
        }
        setReviewByIDAPI(prev => ({
          ...prev,
          comments: [{ comment_text: commentText, like_counter: 0 }, ...prev.comments],
        }));
        setCommentText('');
      } catch (error) {
        setOpenAlertDialogError(true);
        setMessageDialogError('Error creating comment:');
        setTitleDialogError('Error');
      }
    },
    [commentText, params.id]
  );

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

  const chunkMoviesGenre = (moviews, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < moviews.length; i += chunkSize) {
      chunks.push(moviews.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const handleGetReviewByIdAPI = useCallback(async () => {
    try {
      const movie_Id = params?.id;
      const res = await getReviewByIdAPI(movie_Id);
      const chunkMovies = chunkMoviesGenre(res.moviesGenre, 3);
      setReviewByIDAPI(res.review);
      setMoviesGenre(chunkMovies);
    } catch (error) {
      console.log(error);
      setOpenAlertDialogError(true);
      setMessageDialogError('Failed to fetch the review');
      setTitleDialogError('Error');
      return;
    }
  }, [params?.id]);

  useEffect(() => {
    handleGetReviewByIdAPI();
  }, [handleGetReviewByIdAPI]);

  const handleSubmit = useCallback(async e => {
    try {
      e.preventDefault();
      const response = await createCommentAPI(e.target[0].value, e.target[1].value);
      localStorage.setItem('x-auth-token', response.headers['x-auth-token']);
      setAuth(response.headers['x-auth-token']);
    } catch (err) {
      console.error('Error login:', err);
      setOpenAlertDialogError(true);
      setMessageDialogError('Failed to login');
      setTitleDialogError('Error');
    }
  }, []);

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
          <img src={ReviewByIDAPI?.movie_id?.image || ''} alt="Movie Image" style={{ width: 710, height: 400 }} />
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
                  {ReviewByIDAPI?.movie_id?.title || ''}
                </Typography>

                <Typography component="legend" sx={{ color: '#ffffff', marginTop: '10px', fontWeight: 'bold' }}>
                  Score
                </Typography>

                <Rating name="simple-controlled" value={ReviewByIDAPI?.score || ''} readOnly />

                <Typography variant="body1" sx={{ color: '#ffffff', marginTop: '10px', fontWeight: 'bold' }}>
                  ประเภท : {ReviewByIDAPI?.movie_id?.genre_id?.genre || ''}
                </Typography>

                <Typography variant="body1" sx={{ color: '#ffffff', marginTop: '10px', fontWeight: 'bold' }}>
                  เรื่องย่อ
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: '#ffffff',
                    marginBottom: '20px',
                  }}
                >
                  {ReviewByIDAPI?.movie_id?.synopsis || ''}
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
                      {ReviewByIDAPI?.comments?.map((comment, index) => (
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
                          <Button sx={{ width: 0, height: 25, marginTop: '15px' }}>
                            <FavoriteBorderIcon sx={{ width: 20, height: 20 }} />
                          </Button>
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
                          placeholder="แสดงความคิดเห็นของคุณ"
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
                  ดูรีวิวที่คล้ายกัน
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
                  นามปากกา : {ReviewByIDAPI?.pseudonym || ''}
                </Typography>
                <IconButton>
                  <BookmarkBorderOutlinedIcon
                    style={{
                      fontSize: '2rem',
                      color: '#ffffff',
                    }}
                  />
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
                  นักแสดงนำ : {ReviewByIDAPI?.actor || ''}
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
                  ผู้กำกับ : {ReviewByIDAPI?.director || ''}
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
                  ความฟิน : {ReviewByIDAPI?.happy || ''}/10
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
                  ความเศร้า : {ReviewByIDAPI?.drama || ''}/10
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
                  ความตลก : {ReviewByIDAPI?.joke || ''}/10
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
                        สปอย
                      </DialogTitle>
                      <DialogContent>
                        {showSpoil ? (
                          <Typography>{ReviewByIDAPI?.spoil_text || ''}</Typography>
                        ) : (
                          <Typography>สปอยยังไม่ถูกเปิดเผย</Typography>
                        )}
                      </DialogContent>
                    </Dialog>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <style>
            {`
          .carousel .control-arrow.control-prev {
            left: 350px; 
          }
          .carousel .control-arrow.control-next {
            right: 350px;
          }
        `}
          </style>

          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '8px',
              }}
            >
              <Carousel
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginBottom: '40px',
                }}
                interval={1000}
                stopOnHover={true}
                infiniteLoop={true}
                showStatus={false}
                showIndicators={true}
                showThumbs={false}
              >
                {moviesGenre.map((chunk, index) => (
                  <Grid container spacing={1} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {chunk.map((image, idx) => (
                      <Grid item key={idx}>
                        <CardMedia
                          component="img"
                          image={image}
                          alt={`Movie Genre ${index * 3 + idx + 1}`}
                          sx={{ width: 240, height: 140, margin: '3px' }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Carousel>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}