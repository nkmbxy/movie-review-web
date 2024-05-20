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
import { getReviewByIDAPI } from '../../../api/review';
import { useParams } from 'next/navigation';
import AlertDialogConfirm from '../../../components/alertDialog/alertConfirm';
import AlertDialogError from '../../../components/alertDialog/alertError';

export default function HomePage() {
  const [value, setValue] = useState(5);
  const [open, setOpen] = useState(false);
  const [showSpoil, setShowSpoil] = useState(false);
  const [ReviewByIDAPI, setReviewByIDAPI] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAlertDialogError, setOpenAlertDialogError] = useState(false);
  const [messageDialogError, setMessageDialogError] = useState('');
  const [titleDialogError, setTitleDialogError] = useState('');
  const params = useParams();

  const handleClickOpen = () => {
    setOpen(true);
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

  const handleGetReviewByIDAPI = useCallback(async () => {
    try {
      const movie_Id = params?.id;
      const res = await getReviewByIDAPI(movie_Id);
      setReviewByIDAPI(res);
    } catch (error) {
      console.log(error);
      setOpenAlertDialogError(true);
      setMessageDialogError('Failed to fetch the review');
      setTitleDialogError('Error');
      return;
    }
  }, [params?.id]);

  useEffect(() => {
    handleGetReviewByIDAPI();
  }, [handleGetReviewByIDAPI]);

  return (
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
                  padding: 3,
                  width: 400,
                  height: 230,
                  marginLeft: '320px',
                  borderRadius: '15px',
                }}
              >
                <Stack
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Divider style={{ marginTop: '158px', backgroundColor: '#dadada', width: '400px' }}></Divider>
                  <Box
                    sx={{
                      display: 'flex',marginTop: '-7px'
                    }}
                  >
                    <Avatar src="/broken-image.jpg" sx={{ margin: '15px', width: 30, height: 30 }} />
                    <TextField
                      placeholder="แสดงความคิดเห็นของคุณ"
                      className="w-full"
                      variant="standard"
                      type="text"
                      name="comment"
                      sx={{
                        width: 250,
                        marginTop: '13px',
                        '& .MuiInputBase-input::placeholder': {
                          fontSize: '13.5px',
                        },
                      }}
                    />
                    <Button type="submit" sx={{ width: 30, height: 30, marginTop: '20px' }}>
                      <SendIcon />
                    </Button>
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

        <Grid item style={{ width: '17.5%'}}>
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
              <Button >
                <BookmarkBorderOutlinedIcon
                  style={{
                    fontSize: '2rem',
                    color: '#ffffff',
                  }}
                />
              </Button>
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
              <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item>
                  <CardMedia
                    component="img"
                    image="https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg"
                    alt="Nineteen to Twenty"
                    sx={{ width: 240, height: 140, margin: '3px' }}
                  />
                </Grid>
                <Grid item>
                  <CardMedia
                    component="img"
                    image="https://puui.wetvinfo.com/vcover_hz_pic/0/gnwjazjgmg997xg1607677060480/0"
                    alt="The Fire Queen"
                    sx={{ width: 240, height: 140, margin: '3px' }}
                  />
                </Grid>
                <Grid item>
                  <CardMedia
                    component="img"
                    image="https://image.tmdb.org/t/p/original/jOpb4ZMF9WyE1YPJfMfhonKGJzH.jpg"
                    alt="Hidden Love"
                    sx={{ width: 240, height: 140, margin: '3px' }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}
              >
                <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid item>
                    <CardMedia
                      component="img"
                      image="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5naPhbzeax2cKcZdIl82juMzR0xsHhs179QkFPuhEAIfH1hZqQ0.jpg"
                      alt="Hidden Love"
                      sx={{ width: 240, height: 140, margin: '3px' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Carousel>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
