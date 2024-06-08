'use client';
import { Box, Typography, TextField, Select, Button, MenuItem, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { axiosInstance } from '@/lib/axiosInstance';
import AlertDialogError from '../../components/alertDialog/alertError';
import ToastSuccess from '../../components/toast';
import { useRouter } from 'next/navigation';

export default function createReview() {
  const router = useRouter();
  const [reviewData, setReviewData] = useState({
    title: '',
    writer: '',
    plot: '',
    spoiler: '',
    leadActor: '',
    director: '',
    genre: '',
    country: '',
    funRates: '',
    finRates: '',
    sadRates: '',
    funnyRates: '',
  });

  const [genre, setGenre] = useState([]);
  const [image, setImage] = useState();
  const [openAlertDialogError, setOpenAlertDialogError] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const rates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const scoreRates = [0, 1, 2, 3, 4, 5];
  const countriesItems = ['Chinese', 'English', 'Japanese', 'Korean', 'Thai'];

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleOnCloseDialog = () => {
    setOpenAlertDialogError(false);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };

  const getGenre = async () => {
    const respond = await axiosInstance.get('/genre/getGenre');
    setGenre(respond.data);
  };

  useEffect(() => {
    getGenre();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setReviewData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = e => {
    const { name, value } = e.target;
    setReviewData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImage = e => {
    const { files } = e.target;
    setImage(files[0]);
  };

  const formData = new FormData();
  formData.append('title', reviewData.title);
  formData.append('synopsis', reviewData.plot);
  formData.append('pseudonym', reviewData.writer);
  formData.append('spoil_text', reviewData.spoiler);
  formData.append('actor', reviewData.leadActor);
  formData.append('director', reviewData.director);
  formData.append('score', reviewData.funRates);
  formData.append('happy', reviewData.finRates);
  formData.append('drama', reviewData.sadRates);
  formData.append('joke', reviewData.funnyRates);
  formData.append('genre_id', reviewData.genre);
  formData.append('country', reviewData.country);
  if (image) {
    formData.append('file', image);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/review/createReview', formData);
      if (res?.status === 200) {
        setOpenToast(true);
        setTimeout(() => {
          router.push(`/movieReview/${res.data.data}`);
        }, 2000);
      } else {
        setOpenAlertDialogError(true);
      }
    } catch (error) {
      setOpenAlertDialogError(true);
    }
  };

  return (
    <>
      <form style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#000000' }} onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '65%',
            minHeight: '70vh',
            borderRadius: '10px',
            background: '#FFFFFF',
            marginTop: '20px',
            padding: '3px',
          }}
        >
          <Box sx={{ width: '60%' }}>
            <Typography
              variant="h4"
              sx={{
                paddingTop: '2px',
                margin: '2rem',
                fontWeight: 700,
                textDecoration: 'none',
                color: '#606060',
              }}
            >
              What movie do you want to review?
            </Typography>
            <TextField
              id="title"
              name="title"
              label="Title"
              variant="standard"
              value={reviewData.title}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '1rem',
              }}
            />
            <TextField
              id="writer"
              name="writer"
              label="Writer"
              variant="standard"
              value={reviewData.writer}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '1rem',
              }}
            />
            <TextField
              id="plot"
              name="plot"
              label="Plot"
              multiline
              rows={4}
              variant="standard"
              value={reviewData.plot}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '1rem',
              }}
            />
            <TextField
              id="spoiler"
              name="spoiler"
              label="Spoiler"
              multiline
              rows={4}
              variant="standard"
              value={reviewData.spoiler}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '1rem',
              }}
            />
            <TextField
              id="leadActor"
              name="leadActor"
              label="Leading Role"
              variant="standard"
              value={reviewData.leadActor}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '1rem',
              }}
            />
            <TextField
              id="director"
              name="director"
              label="Director"
              variant="standard"
              value={reviewData.director}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '1rem',
              }}
            />
          </Box>
          <Box sx={{ width: '40%', margin: '1rem' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #CCCCCC',
                width: '80%',
                height: '180px',
                marginBottom: '.5rem',
              }}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <Typography sx={{ color: '#ccc' }}>No image uploaded</Typography>
              )}
            </Box>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{
                width: '310px',
                height: '23.5px',
                textWrap: 'nowrap',
                backgroundColor: '#848484',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: '#404040',
                },
              }}
            >
              Upload image
              <VisuallyHiddenInput type="file" onChange={handleImage} />
            </Button>
            <InputLabel
              id="funRates"
              sx={{
                paddingTop: '10px',
              }}
            >
              Fun :
            </InputLabel>
            <Select
              id="funRates"
              sx={{ width: '50%', marginLeft: '.5rem' }}
              label="ความสนุก"
              variant="standard"
              value={reviewData.funRates}
              name="funRates"
              onChange={handleSelectChange}
            >
              {scoreRates.map(scoreRate => (
                <MenuItem key={scoreRate} value={scoreRate}>
                  {scoreRate}
                </MenuItem>
              ))}
            </Select>
            <InputLabel
              id="funRates"
              sx={{
                paddingTop: '10px',
              }}
            >
              Satisfaction :
            </InputLabel>
            <Select
              id="finRates"
              sx={{ width: '50%', marginLeft: '.5rem' }}
              label="ความฟิน"
              variant="standard"
              value={reviewData.finRates}
              name="finRates"
              onChange={handleSelectChange}
            >
              {rates.map(rate => (
                <MenuItem key={rate} value={rate}>
                  {rate}
                </MenuItem>
              ))}
            </Select>
            <InputLabel
              id="funRates"
              sx={{
                paddingTop: '10px',
              }}
            >
              Sadness :
            </InputLabel>
            <Select
              id="sadRates"
              sx={{ width: '50%', marginLeft: '.5rem' }}
              label="ความเศร้า"
              variant="standard"
              value={reviewData.sadRates}
              name="sadRates"
              onChange={handleSelectChange}
            >
              {rates.map(rate => (
                <MenuItem key={rate} value={rate}>
                  {rate}
                </MenuItem>
              ))}
            </Select>
            <InputLabel
              id="funRates"
              sx={{
                paddingTop: '10px',
              }}
            >
              Funny :
            </InputLabel>
            <Select
              id="funnyRates"
              sx={{ width: '50%', marginLeft: '.5rem' }}
              label="ความตลก"
              variant="standard"
              value={reviewData.funnyRates}
              name="funnyRates"
              onChange={handleSelectChange}
            >
              {rates.map(rate => (
                <MenuItem key={rate} value={rate}>
                  {rate}
                </MenuItem>
              ))}
            </Select>
            <Typography
              sx={{
                color: '#606060',
                margin: '15px 0px 5px 0px',
                maxWidth: '300px',
              }}
            >
              Genre
            </Typography>

            <Box>
              {genre.map((genre, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: '#606060',
                    color: reviewData.genre === genre._id ? '#FFFFFF' : '#606060',
                    backgroundColor: reviewData.genre === genre._id ? '#606060' : 'transparent',
                    borderColor: '#606060',
                    borderRadius: '20px',
                    display: 'inline-block',
                    margin: '2px',
                    textAlign: 'center',
                    fontSize: '10px',
                    '&:hover': {
                      backgroundColor: reviewData.genre === genre._id ? '#606060' : 'transparent',
                    },
                  }}
                  onClick={() => handleSelectChange({ target: { name: 'genre', value: genre._id } })}
                >
                  {genre.genre}
                </Button>
              ))}
            </Box>
            <Typography
              sx={{
                color: '#606060',
                margin: '15px 0px 5px 0px',
                maxWidth: '300px',
              }}
            >
              Country
            </Typography>
            <Box>
              {countriesItems.map((countriesItems, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: '#606060',
                    color: reviewData.country === countriesItems ? '#FFFFFF' : '#606060',
                    backgroundColor: reviewData.country === countriesItems ? '#606060' : 'transparent',
                    borderColor: '#606060',
                    borderRadius: '20px',
                    display: 'inline-block',
                    margin: '2px',
                    textAlign: 'center',
                    fontSize: '10px',
                    '&:hover': {
                      backgroundColor: reviewData.country === countriesItems ? '#606060' : 'transparent',
                    },
                  }}
                  onClick={() => handleSelectChange({ target: { name: 'country', value: countriesItems } })}
                >
                  {countriesItems}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                margin: '1rem 1rem 0rem 1rem',
              }}
            >
              <Button
                type="submit"
                sx={{
                  backgroundColor: '#848484',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '500px',
                  '&:hover': {
                    backgroundColor: '#404040',
                  },
                }}
              >
                Post
              </Button>
            </Box>
            <ToastSuccess
              openToast={openToast}
              handleCloseToast={handleCloseToast}
              text="Post Success"
              showClose={true}
            />
            <AlertDialogError openAlertDialog={openAlertDialogError} handleOnCloseDialog={handleOnCloseDialog} />
          </Box>
        </Box>
      </form>
    </>
  );
}
