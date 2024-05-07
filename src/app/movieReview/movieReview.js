"use client";
import * as React from "react";
import {
  Grid,
  Typography,
  Rating,
  Card,
  Stack,
  Box,
  TextField,
  Button,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import SendIcon from "@mui/icons-material/Send";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function HomePage() {
  const [value, setValue] = React.useState(5);

  return (
    <Grid
      container
      style={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          image="https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABUozDRXHk_H3Ez8yiP31YH_QdodNStMvE5PqoP1XYFpjIuUhqaKw6XZsLcApDwccKyP7AFIQQ__FF9j1-ThspAz_-YjJuuFFncTT.jpg?r=9a3"
          alt="Put your head on my shoulder"
          sx={{ width: 710, height: 400 }}
        />
      </Grid>

      <Grid container style={{ display: "flex", flexDirection: "row" }}>
        <Grid item style={{ width: "60%", backgroundColor: "pink" }}>
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={8} sx={{ marginLeft: "390px" }}>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "#ffffff",
                  marginTop: "10px",
                }}
              >
                PUT YOUR HEAD ON MY SHOULDER
              </Typography>

              <Typography
                component="legend"
                sx={{ color: "#ffffff", marginTop: "10px", fontWeight: "bold" }}
              >
                Funny
              </Typography>

              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />

              <Typography
                variant="body1"
                sx={{ color: "#ffffff", marginTop: "10px", fontWeight: "bold" }}
              >
                ประเภท : Romantic
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "#ffffff", marginTop: "10px", fontWeight: "bold" }}
              >
                เรื่องย่อ
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#ffffff",
                  marginBottom: "20px",
                }}
              >
                เป็นซีรีส์ที่อยู่ในช่วงการเรียนมหาลัย นางเอกเรียนเกี่ยวกับบัญชีและใกล้จะจบ ส่วนพระเอกเป็นคนที่ฉลาดและอัจฉริยะมาก ๆ ในด้านเกี่ยวกับฟิสิกส์ เขาทั้งสองคนรู้จักกันเพราะอุบัติเหตุ และความบังเอิญก็เกิดขึ้นเมื่อแม่ของนางเอกพระเอกเป็นเพื่อนกันและมีเหตุที่ทำให้นางเอกต้องมาอาศัยอยู่ที่บ้านของพระเอกและเรื่องราววุ่น ๆ จะเป็นอย่างไร ต้องติดตามต่อได้ในเรื่องเลย
              </Typography>
            </Grid>

            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                sx={{
                  padding: 3,
                  width: 400,
                  height: 230,
                  marginLeft: "320px",
                  borderRadius: "15px",
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "140px",
                    }}
                  >
                    <Avatar
                      src="/broken-image.jpg"
                      sx={{ margin: "15px", width: 35, height: 35 }}
                    />
                    <TextField
                      placeholder="แสดงความคิดเห็นของคุณ"
                      className="w-full"
                      variant="standard"
                      type="text"
                      name="comment"
                      sx={{
                        marginTop: "20px",
                        "& .MuiInputBase-input::placeholder": {
                          fontSize: "14px",
                        },
                      }}
                    />
                    <Button
                      type="submit"
                      sx={{ width: 35, height: 35, marginTop: "20px" }}
                    >
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
                  color: "#ffffff",
                  marginBottom: "10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                ดูรีวิวที่คล้ายกัน
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item style={{ width: "20%", backgroundColor: "green" }}>
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid item xs={8}>
              <Typography
                variant="body1"
                sx={{
                  color: "#ffffff",
                  marginTop: "8px",
                  marginLeft: "9px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                นามปากกา : สวยเริ่ด
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#ffffff",
                  marginTop: "70px",
                  marginLeft: "9px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                นักแสดงนำ : หลินอี, ฉิงเฟย
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#ffffff",
                  marginTop: "8px",
                  marginLeft: "9px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                ผู้กำกับ : จู้ตงหนิง
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#ffffff",
                  marginTop: "8px",
                  marginLeft: "9px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                ความฟิน : 10/10
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#ffffff",
                  marginTop: "8px",
                  marginLeft: "9px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                ความเศร้า : 6/10
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#ffffff",
                  marginTop: "8px",
                  marginLeft: "9px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                ความตลก : 7.5/10
              </Typography>
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
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <Carousel
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                marginBottom: "40px",
              }}
              interval={1000}
              stopOnHover={true}
              infiniteLoop={true}
              showStatus={false}
              showIndicators={true}
              showThumbs={false}
            >
              <Grid
                container
                spacing={1}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item>
                  <CardMedia
                    component="img"
                    image="https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg"
                    alt="Nineteen to Twenty"
                    sx={{ width: 240, height: 140, margin: "3px" }}
                  />
                </Grid>
                <Grid item>
                  <CardMedia
                    component="img"
                    image="https://puui.wetvinfo.com/vcover_hz_pic/0/gnwjazjgmg997xg1607677060480/0"
                    alt="The Fire Queen"
                    sx={{ width: 240, height: 140, margin: "3px" }}
                  />
                </Grid>
                <Grid item>
                  <CardMedia
                    component="img"
                    image="https://image.tmdb.org/t/p/original/jOpb4ZMF9WyE1YPJfMfhonKGJzH.jpg"
                    alt="Hidden Love"
                    sx={{ width: 240, height: 140, margin: "3px" }}
                  />
                </Grid>
              </Grid>

              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  spacing={1}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Grid item>
                    <CardMedia
                      component="img"
                      image="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5naPhbzeax2cKcZdIl82juMzR0xsHhs179QkFPuhEAIfH1hZqQ0.jpg"
                      alt="Hidden Love"
                      sx={{ width: 240, height: 140, margin: "3px" }}
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
