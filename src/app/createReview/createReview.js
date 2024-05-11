"use client"
import { Box, Typography, TextField, Autocomplete, Button } from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

export default function createReview() {
    const [reviewData, setReviewData] = useState({
        title: "",
        plot: "",
        spoiler: "",
        leadActor:"",
        director:"",
        genre: ""
      });

      const rates = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      const genreItems = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Investigation', 'Romance', 'Sci-fi', 'Thriller'];
    
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

    return (
        <>
         <form className='reviewForm' style={{display: "flex", justifyContent: "center"}}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                width: "70%",
                borderRadius: "10px",
                background: "#FFFFFF",
                }}>
                <Box className='left-side' sx={{width: "60%"}}>
                    <Typography
                        variant="h4"
                        sx={{
                            paddingTop: "1rem",
                            margin: "2rem",  
                            fontWeight: 700,
                            textDecoration: "none",
                            color: "#404040"
                        }}>
                        เรื่องที่คุณต้องการรีวิว
                    </Typography>
                    <TextField id="standard-basic" label="ชื่อเรื่อง" variant="standard" value={reviewData.title}
                        sx={{
                            marginLeft: "2rem",
                            width: "90%",
                            marginBottom: "1rem" 
                        }}
                    />
                    <TextField id="standard-basic" label="เรื่องย่อ" variant="standard" value={reviewData.plot}
                        sx={{
                            marginLeft: "2rem",
                            width: "90%",
                            marginBottom: "1rem" 
                        }}
                    />
                    <TextField id="standard-basic" label="สปอย" variant="standard" value={reviewData.spoiler}
                        sx={{
                            marginLeft: "2rem",
                            width: "90%",
                            marginBottom: "1rem"
                        }}
                    />
                    <TextField id="standard-basic" label="นักแสดงนำ" variant="standard" value={reviewData.leadActor}
                        sx={{
                            marginLeft: "2rem",
                            width: "90%",
                            marginBottom: "1rem"
                        }}
                    />
                    <TextField id="standard-basic" label="ผู้กำกับ" variant="standard" value={reviewData.director}
                        sx={{
                            marginLeft: "2rem",
                            width: "90%",
                            marginBottom: "1rem" 
                        }}
                    />
                </Box>
                <Box className="right-side" sx={{width: "40%", marginTop: "100px", marginLeft: "2rem"}} >
                    <Button className='image-upload'
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{
                            width: "70%",
                            textWrap: "nowrap",
                        }}>
                        Upload image
                        <VisuallyHiddenInput type="file" />
                    </Button>
                    <Autocomplete
                        id="clear-on-escape"
                        options={rates}
                        sx={{ width: "50%",
                            margin: ".5rem"
                        }}
                        renderInput={(params) => <TextField {...params} label="ความสนุก" variant='standard' />}
                    />
                    <Autocomplete
                        id="clear-on-escape"
                        options={rates}
                        sx={{ width: "50%",
                            margin: ".5rem"
                        }}
                        renderInput={(params) => <TextField {...params} label="ความฟิน" variant='standard' />}
                    />
                    <Autocomplete
                        id="clear-on-escape"
                        options={rates}
                        sx={{ width: "50%",
                            margin: ".5rem"
                        }}
                        renderInput={(params) => <TextField {...params} label="ความเศร้า" variant='standard' />}
                    />
                    <Autocomplete
                        id="clear-on-escape"
                        options={rates}
                        sx={{ width: "50%",
                            margin: ".5rem"
                        }}
                        renderInput={(params) => <TextField {...params} label="ความตลก" variant='standard' />}
                    />
                    <Typography
                        sx={{
                            color: "#606060",
                            margin: "20px 0px 5px 0px",
                            maxWidth: "300px"
                        }}
                    >
                        ประเภท
                    </Typography>
                    <Box className='genre-button'>
                        {genreItems.map((genreItem, index) => (
                            <Button 
                                variant="outlined" 
                                size="small"
                                sx={{
                                    borderColor: "#606060",
                                    color: "#404040",
                                    borderRadius: "20px",
                                    display: "inline-block",
                                    margin: "2px",
                                    textAlign: "center",
                                    fontSize: "10px",
                                }}
                                key={index}>{genreItem}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        margin: "15px 50px"
                        }}>
                        <Button className='post-button'
                        type="submit"
                        sx={{
                            backgroundColor: "#606060",
                            color: "#FFFFFF",
                            fontSize: "14px",
                            fontWeight: "500px",
                            "&:hover": {
                                backgroundColor: "#404040", // Darker color on hover
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