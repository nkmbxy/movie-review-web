'use client';
import { Grid, TextField, Button, Box, Typography, Tooltip, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { axiosInstance } from '@/lib/axiosInstance';
import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";


const MovieTooltipContent = ({ detail }) => {
  if (!detail) {
    return null;
  }

  return (
    <Box sx={{ color: '#fff', padding: '10px', borderRadius: '4px', maxWidth: '400px' }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        {detail.title}
      </Typography>
      <Rating name="rating" value={detail.score} readOnly />
      <Typography variant="body2">นักแสดงนำ: {detail.actor}</Typography>
      <Typography variant="body2">ประเภท: {detail.genre_id.genre}</Typography>
      <Typography variant="body2">{detail.synopsis}</Typography>
  </Box>
  );
};

export default function HomePage() {
  
  const Router = useRouter();

  const [searchMovies, setSearchMovies] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [randomMovies, setRandomMovies] = useState([]);
  const [chineseMovies, setChineseMovies] = useState([]);
  const [englishMovies, setEnglishMovies] = useState([]);
  const [japaneseMovies, setJapaneseMovies] = useState([]);
  const [koreanMovies, setKoreanMovies] = useState([]);
  const [thaiMovies, setThaiMovies] = useState([]);

  const getRandomMovies = async () => {
    const response = await axiosInstance.get('/movie/random')
    setRandomMovies(response.data.data);
  }
  const getChineseMovies = async () => {
    const respond = await axiosInstance.get('/movie/country?country=Chinese')
    setChineseMovies(respond.data)
  }
  const getEnglishMovies = async () => {
    const respond = await axiosInstance.get('/movie/country?country=English')
    setEnglishMovies(respond.data)
  }
  const getJapaneseMovies = async () => {
    const respond = await axiosInstance.get('/movie/country?country=Japanese')
    setJapaneseMovies(respond.data)
  }
  const getKoreanMovies = async () => {
    const respond = await axiosInstance.get('/movie/country?country=Korean')
    setKoreanMovies(respond.data)
  }
  const getThaiMovies = async () => {
    const respond = await axiosInstance.get('/movie/country?country=Thai')
    setThaiMovies(respond.data)
  }

  useEffect(() => {
    getRandomMovies();
    getChineseMovies();
    getEnglishMovies();
    getJapaneseMovies();
    getKoreanMovies();
    getThaiMovies();
  }, [])

  const handleSearchMovies = async () => {
    const respond = await axiosInstance.get(`/movie/search?title=${searchMovies}`)
    console.log(respond.data)
    setSearchResult(respond.data)
  }

  // console.log(searchMovies);
  // console.log(randomMovies);
  console.log(chineseMovies);
  // console.log(englishMovies);
  // console.log(japaneseMovies);
  // console.log(koreanMovies);
  // console.log(thaiMovies);
  

  return (
    <>
      {
        searchResult.length>0 ? 
        <Grid
          container
          style={{
            backgroundColor: '#000000',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid item sx={{ marginTop: '20px' }}>
            <Typography
              variant="h4"
              sx={{
                ml: 5,
                fontWeight: 700,
                letterSpacing: '.1rem',
                textDecoration: 'none',
                color: '#ffffff',
              }}
              >
              Result
            </Typography>
            <Grid container sx={{ width: '100%', padding: 2 }}>
              <Grid
                container
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'start',
                }}
              >
                {searchResult?.map((item, index) => (
                  <Grid key={index} sx={{ margin: 1 }}>
                    <img
                      src={`${item.image}`}
                      style={{
                        width: '280px',
                        height: '180px',
                        objectFit: 'cover',
                      }}
                      onClick={() => (Router.push(`/movieReview/${item?.review_id}`))}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>:
          <Grid container style={{ backgroundColor: '#000000', minHeight: '91.5vh' }}>
          <Grid item sx={{ mb: 8, width: '100%' }}>
            <Grid
              item
              xs={12}
              sx={{
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                placeholder="Search for topics of interest"
                variant="outlined"
                value={searchMovies}
                onChange={
                  (e) => setSearchMovies(e.target.value)
                }
                sx={{
                  backgroundColor: '#ffffff',
                  display: 'flex',
                  borderRadius: '4px',
                  width: '40%',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#ffffff',
                    },
                  },
                }}
              />
              <Grid item sx={{ margin: '20px' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#f3edce',
                    color: '#0a0a0a',
                    '&:hover': {
                      backgroundColor: '#e0d4b3',
                    },
                  }}
                  onClick={handleSearchMovies}
                >
                  find
                </Button>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {randomMovies.map((item) => (
                <Tooltip key={item.image} title={<MovieTooltipContent detail={item} />} arrow>
                  <Box
                    sx={{
                      width: 400,
                      height: 300,
                      marginInline: 1,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={() => (Router.push(`/movieReview/${item?.review_id}`))}
                  >
                    <img src={`${item.image}`} 
                         style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />
                  </Box>
                </Tooltip>
              ))}
            </Box>
            <Typography
              variant="h6"
              sx={{
                ml: 5,
                marginTop: 4,
                fontWeight: 700,
                letterSpacing: '.1rem',
                textDecoration: 'none',
                color: '#ffffff',
              }}
            >
              Made in Chinese
            </Typography>
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
              {chineseMovies.map((item) => (
                <Tooltip key={item.image} title={<MovieTooltipContent detail={item} />} arrow>
                  <Box
                    sx={{
                      width: 200,
                      height: 150,
                      marginInline: '8px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={() => (Router.push(`/movieReview/${item?.review_id}`))}
                  >
                    <img
                      src={item.image}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                </Tooltip>
              ))}
            </Carousel>
            <Typography
              variant="h6" 
                sx={{
                    ml: 5,
                    marginTop:4,
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    textDecoration: "none",
                  }}>
                Made in England 
            </Typography>
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
              {englishMovies.map((item) => (
                <Tooltip key={item.image} title={<MovieTooltipContent detail={item} />} arrow>
                  <Box
                    sx={{
                      width: 200,
                      height: 150,
                      marginInline: '8px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={() => (Router.push(`/movieReview/${item?.review_id}`))}
                  >
                    <img
                      src={item.image}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                </Tooltip>
              ))}
            </Carousel>
            <Typography
              variant="h6" 
                sx={{
                    ml: 5,
                    marginTop:4,
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    textDecoration: "none",
                  }}>
                Made in Japan 
            </Typography>
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
              {japaneseMovies.map((item) => (
                <Tooltip key={item.image} title={<MovieTooltipContent detail={item} />} arrow>
                  <Box
                    sx={{
                      width: 200,
                      height: 150,
                      marginInline: '8px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={() => (Router.push(`/movieReview/${item?.review_id}`))}
                  >
                    <img
                      src={item.image}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                </Tooltip>
              ))}
            </Carousel>
            <Typography
              variant="h6" 
                sx={{
                    ml: 5,
                    marginTop:4,
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    textDecoration: "none",
                  }}>
                Made in Korea 
            </Typography>
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
              {koreanMovies.map((item) => (
                <Tooltip key={item.image} title={<MovieTooltipContent detail={item} />} arrow>
                  <Box
                    sx={{
                      width: 200,
                      height: 150,
                      marginInline: '8px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={() => (Router.push(`/movieReview/${item?.review_id}`))}
                  >
                    <img
                      src={item.image}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                </Tooltip>
              ))}
            </Carousel>
            <Typography
              variant="h6" 
                sx={{
                    ml: 5,
                    marginTop:4,
                    fontWeight: 700,
                    letterSpacing: ".1rem",
                    textDecoration: "none",
                  }}>
                Made in Thai 
            </Typography>
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
              {thaiMovies.map((item) => (
                <Tooltip key={item.image} title={<MovieTooltipContent detail={item} />} arrow>
                  <Box
                    sx={{
                      width: 200,
                      height: 150,
                      marginInline: '8px',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                    onClick={() => (Router.push(`/movieReview/${item?.review_id}`))}
                  >
                    <img
                      src={item.image}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                </Tooltip>
              ))}
            </Carousel>
          </Grid>
      </Grid>
      }
    </>
  );
}

// 'Chinese', 'England', 'Japan', 'Korea', 'Thai'
