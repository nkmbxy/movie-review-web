'use client';
import { Grid, TextField, Button, Box, Typography, Tooltip } from "@mui/material";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const threeTopMovie = [
  //mock data
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
  },
  {
    img: 'https://puui.wetvinfo.com/vcover_hz_pic/0/gnwjazjgmg997xg1607677060480/0',
  },
  {
    img: 'https://image.tmdb.org/t/p/original/jOpb4ZMF9WyE1YPJfMfhonKGJzH.jpg',
  },
];

const moviesList = [
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
  },
  {
    img: 'https://puui.wetvinfo.com/vcover_hz_pic/0/gnwjazjgmg997xg1607677060480/0',
  },
  {
    img: 'https://image.tmdb.org/t/p/original/jOpb4ZMF9WyE1YPJfMfhonKGJzH.jpg',
  },
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
  },
  {
    img: 'https://puui.wetvinfo.com/vcover_hz_pic/0/gnwjazjgmg997xg1607677060480/0',
  },
  {
    img: 'https://image.tmdb.org/t/p/original/jOpb4ZMF9WyE1YPJfMfhonKGJzH.jpg',
  },
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
  },
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
  },
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
  },
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
  }
];

const movieDetails = [
  {
    img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
    title: "Queenmaker",
    cast: "Kim Heeae / Moon So-ri",
    genre: "Drama",
    plot: "ซีรีส์ที่จะเล่าเรื่องราวของผู้หญิง 2 คนที่ใช้ชีวิตแตกต่างกันอย่างสิ้นเชิง จับมือกันและละทิ้งทุกวิถีทางที่เคยมีมาทั้งหมด เพื่อสร้างโลกที่คงไว้ซึ่งความยุติธรรมและความจริง"
  },
  {
    img: 'https://puui.wetvinfo.com/vcover_hz_pic/0/gnwjazjgmg997xg1607677060480/0',
    title: "The Untamed",
    cast: "Xiao Zhan / Wang Yibo",
    genre: "Fantasy",
    plot: "เว่ยอู๋เซี่ยน(เซียวจ้าน)หนุ่มน้อยศิษย์ตระกูลเจียงผู้มีจิตใจเมตตาที่ภายหลังฝึกวิชามารและได้รับการขนานนามว่า ปรมาจารย์อี๋หลิง ได้ทำการล้มล้างตระกูลเวินจะได้รับความสำเร็จ แต่เพราะวิชาอันแกร่งกล้าของเขาต่างทำให้ผู้คนมากมายหวาดกลัว ยอดฝีมือจากทั่วทุกหนแห่งต่างพยายามทำลายล้างเว่ยอู๋เซี่ยน จนในที่สุดเขาหายสาบสูญไปอย่างไร้ร่องรอย...16 ปีต่อมา เว่ยอู๋เซี่ยนปรากฏตัวขึ้นอีกครั้งในคราบชายสวมหน้ากากนามโม่เสวียนอวี่(เซียวจ้าน) ทุกคนต่างจำเขาไม่ได้ เขาได้กลับมาพบกับคู่หูหลานวั่งจี(หวังอี้ป๋อ)จากตระกูลหลานแห่งกูซู เจียงเฉิง(วังจั๋วเฉิง)ศิษย์ผู้น้องจากตระกูลเจียงแห่งอวิ๋นเมิ่ง รวมถึงบุคคลอื่นในอดีต การกลับมาของเว่ยอู่เซี่ยนในครั้งนี้จะมาเพื่อคลี่คลายปมปริศนาในอดีตและความจริงที่ทุกคนต่างคาดไม่ถึง"
  },
  {
    img: 'https://image.tmdb.org/t/p/original/jOpb4ZMF9WyE1YPJfMfhonKGJzH.jpg',
    title: "Tomorrow I Will Date With Yesterday’s You",
    cast: "Sota Fukushi / Nana Komatsu",
    genre: "Romance",
    plot: "ทาคาโตชิ นักศึกษามหาวิทยาลัย ตกหลุมรักสาวสวยลึกลับบนรถไฟ เขาตามจีบเธอ จนรู้ว่าเธอชื่อ เอมิ พวกเขาตกลงจะเดทกัน 30 วัน และ ในวันสุดท้าย เมื่อ ทาคาโตชิ สารภาพรัก กับ เธอ เขาถึงรู้ว่า ความรักของพวกเขาไม่มีวันเป็นไปได้ เพราะ โลกของพวกเขาคือโลกคู่ขนานที่ทุก ๆ 5 ปี เวลาจะมาบรรจบกัน"
  }
];

const MovieTooltipContent = ({ detail }) => {
  if (!detail) {
    return null;
  }

  return (
    <Box sx={{ color: '#fff', padding: '10px', borderRadius: '4px', maxWidth: '400px' }}>
      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
        {detail.title}
      </Typography>
      <Typography variant="body2">นักแสดงนำ: {detail.cast}</Typography>
      <Typography variant="body2">ประเภท: {detail.genre}</Typography>
      <Typography variant="body2">{detail.plot}</Typography>
    </Box>
  );
};

export default function HomePage() {
  const getMovieDetailByImg = img => movieDetails.find(detail => detail.img === img) || null;
  return (
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
            sx={{
              backgroundColor: '#ffffff',
              display: 'flex',
              // alignItems: 'center',
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
            >
              find
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {threeTopMovie.map(item => (
            <Tooltip key={item.img} title={<MovieTooltipContent detail={getMovieDetailByImg(item.img)} />} arrow>
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
              >
                <img src={`${item.img}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
              bottom: '-40px', // Adjust the position of the dot control
            },
            '& .dot': {
              margin: '0 5px', // Adjust the spacing between dots
            },
          }}
        >
          {moviesList.map((item) => (
            <Tooltip key={item.img} title={<MovieTooltipContent detail={getMovieDetailByImg(item.img)} />} arrow>
              <Box
                sx={{
                  width: 200, 
                  height: 150, 
                  marginInline: '8px',
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  }
                }}
              >
                <img
                  src={`${item.img}`}
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
              bottom: '-40px', // Adjust the position of the dot control
            },
            '& .dot': {
              margin: '0 5px', // Adjust the spacing between dots
            },
          }}
        >
          {moviesList.map((item) => (
            <Tooltip key={item.img} title={<MovieTooltipContent detail={getMovieDetailByImg(item.img)} />} arrow>
              <Box
                sx={{
                  width: 200, 
                  height: 150, 
                  marginInline: '8px',
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  }
                }}
              >
                <img
                  src={`${item.img}`}
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
              bottom: '-40px', // Adjust the position of the dot control
            },
            '& .dot': {
              margin: '0 5px', // Adjust the spacing between dots
            },
          }}
        >
          {moviesList.map((item) => (
            <Tooltip key={item.img} title={<MovieTooltipContent detail={getMovieDetailByImg(item.img)} />} arrow>
              <Box
                sx={{
                  width: 200, 
                  height: 150, 
                  marginInline: '8px',
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  }
                }}
              >
                <img
                  src={`${item.img}`}
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
              bottom: '-40px', // Adjust the position of the dot control
            },
            '& .dot': {
              margin: '0 5px', // Adjust the spacing between dots
            },
          }}
        >
          {moviesList.map((item) => (
            <Tooltip key={item.img} title={<MovieTooltipContent detail={getMovieDetailByImg(item.img)} />} arrow>
              <Box
                sx={{
                  width: 200, 
                  height: 150, 
                  marginInline: '8px',
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  }
                }}
              >
                <img
                  src={`${item.img}`}
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
              bottom: '-40px', // Adjust the position of the dot control
            },
            '& .dot': {
              margin: '0 5px', // Adjust the spacing between dots
            },
          }}
        >
          {moviesList.map((item) => (
            <Tooltip key={item.img} title={<MovieTooltipContent detail={getMovieDetailByImg(item.img)} />} arrow>
              <Box
                sx={{
                  width: 200, 
                  height: 150, 
                  marginInline: '8px',
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  }
                }}
              >
                <img
                  src={`${item.img}`}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
            </Tooltip>
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
}

// 'Chinese', 'England', 'Japan', 'Korea', 'Thai'
