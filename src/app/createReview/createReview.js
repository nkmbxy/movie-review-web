'use client';
import { Box, Typography, TextField, Select, Button, MenuItem, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

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
    image: null,
  });

  const rates = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const genreItems = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Investigation', 'Romance', 'Sci-fi', 'Thriller'];
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

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setReviewData(prevData => ({
        ...prevData,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(reviewData);
  };

  return (
    <>
      <form className="reviewForm" style={{ display: 'flex', justifyContent: 'center' }} onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '80%',
            borderRadius: '10px',
            background: '#FFFFFF',
          }}
        >
          <Box className="left-side" sx={{ width: '60%' }}>
            <Typography
              variant="h4"
              sx={{
                paddingTop: '1rem',
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
            />
            <TextField
              id="plot"
              name="plot"
              label="เรื่องย่อ"
              variant="standard"
              value={reviewData.plot}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '2rem',
              }}
            />
            <TextField
              id="spoiler"
              name="spoiler"
              label="สปอย"
              variant="standard"
              value={reviewData.spoiler}
              onChange={handleInputChange}
              sx={{
                marginLeft: '2rem',
                width: '90%',
                marginBottom: '2rem',
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
            />
          </Box>
          <Box className="right-side" sx={{ width: '40%', margin: '2rem' }}>
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
              {reviewData.image ? (
                <img
                  src={reviewData.image}
                  alt="Uploaded"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              ) : (
                <Typography sx={{ color: '#ccc' }}>No image uploaded</Typography>
              )}
            </Box>
            <Button
              className="image-upload"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{
                width: '90%',
                textWrap: 'nowrap',
              }}
            >
              Upload image
              <VisuallyHiddenInput type="file" onChange={handleImageChange} />
            </Button>
            <InputLabel
              id="funRates"
              sx={{
                paddingTop: '10px',
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
              }}
            >
              ประเภท
            </Typography>
            <Box className="genre-button">
              {genreItems.map((genreItem, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: '#606060',
                    color: reviewData.genre === genreItem ? '#FFFFFF' : '#606060',
                    backgroundColor: reviewData.genre === genreItem ? '#606060' : 'transparent',
                    borderColor: '#606060',
                    borderRadius: '20px',
                    display: 'inline-block',
                    margin: '2px',
                    textAlign: 'center',
                    fontSize: '10px',
                    '&:hover': {
                      backgroundColor: reviewData.genre === genreItem ? '#606060' : 'transparent',
                    },
                  }}
                  onClick={() => handleSelectChange({ target: { name: 'genre', value: genreItem } })}
                >
                  {genreItem}
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
            <Box className="countries-button">
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
                className="post-button"
                type="submit"
                sx={{
                  backgroundColor: '#606060',
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
