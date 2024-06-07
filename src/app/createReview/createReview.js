'use client';
import { Box, Typography, TextField, Select, Button, MenuItem, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { axiosInstance } from '@/lib/axiosInstance';

export default function createReview() {
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

  const rates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
      await axiosInstance.post('/review/createReview', formData).then(res => {
        console.log(res);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#000000' }} onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '75%',
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
              เรื่องที่คุณต้องการรีวิว
            </Typography>
            <TextField
              id="title"
              name="title"
              label="ชื่อเรื่อง"
              variant="standard"
              value={reviewData.title}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '2rem',
              }}
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '18px',
                },
              }}
            />
            <TextField
              id="writer"
              name="writer"
              label="นามปากกา"
              variant="standard"
              value={reviewData.writer}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '2rem',
              }}
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '18px',
                },
              }}
            />
            <TextField
              id="plot"
              name="plot"
              label="เรื่องย่อ"
              multiline
              rows={4}
              variant="standard"
              value={reviewData.plot}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '2rem',
              }}
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '18px',
                },
              }}
            />
            <TextField
              id="spoiler"
              name="spoiler"
              label="สปอย"
              multiline
              rows={4}
              variant="standard"
              value={reviewData.spoiler}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '2rem',
              }}
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '18px',
                },
              }}
            />
            <TextField
              id="leadActor"
              name="leadActor"
              label="นักแสดงนำ"
              variant="standard"
              value={reviewData.leadActor}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '2rem',
              }}
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '18px',
                },
              }}
            />
            <TextField
              id="director"
              name="director"
              label="ผู้กำกับ"
              variant="standard"
              value={reviewData.director}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '2rem',
              }}
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '18px',
                },
              }}
            />
          </Box>
          <Box sx={{ width: '40%', margin: '2rem' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #CCCCCC',
                width: '90%',
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
                width: '90%',
                textWrap: 'nowrap',
                backgroundColor: '#848484',
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
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '18px',
                },
              }}
            >
              ความสนุก :
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
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '18px',
                },
              }}
            >
              ความฟิน :
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
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '18px',
                },
              }}
            >
              ความเศร้า :
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
              InputProps={{
                style: {
                  fontSize: '16px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '18px',
                },
              }}
            >
              ความตลก :
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
                fontSize: '18px',
              }}
            >
              ประเภท
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
              ประเทศ
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
          </Box>
        </Box>
      </form>
    </>
  );
}
