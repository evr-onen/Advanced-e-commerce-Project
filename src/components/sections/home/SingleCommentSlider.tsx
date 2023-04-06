// ** Core

// ** MUI Imports
import { useTheme, Grid, Typography } from "@mui/material"

// ** Swiper imports
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"

const SingleCommentSlider = () => {
  const theme = useTheme()
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="miniSlider"
    >
      <SwiperSlide>
        <Grid container border={`5px solid ${theme.palette.primary?.main}`} minHeight={200} p="1rem">
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Typography textAlign="center" fontWeight="600" fontSize="1.5rem" color={theme.palette.customColors?.altText}>
                  John Smith
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography textAlign="center" fontWeight="600">
                  Simple User
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container height="9.375rem" position="relative">
              <Grid item>
                <Typography fontSize="2rem" fontWeight="700" position="absolute" left="5%" top="0.625rem">
                  ``
                </Typography>
              </Grid>
              <Grid item>
                <Typography textAlign="center" fontWeight="600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, quas?
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SwiperSlide>
      <SwiperSlide>
        <Grid container border={`5px solid ${theme.palette.primary?.main}`} minHeight={200} p="0.625rem">
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Typography textAlign="center" fontWeight="600" fontSize="1.5rem" color={theme.palette.customColors?.altText}>
                  John Smith
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography textAlign="center" fontWeight="600">
                  Simple User
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container height="9.375rem" position="relative">
              <Grid item>
                <Typography fontSize="2rem" fontWeight="700" position="absolute" left="5%" top="10px">
                  ``
                </Typography>
              </Grid>
              <Grid item>
                <Typography textAlign="center" fontWeight="600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, quas?
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SwiperSlide>
      <SwiperSlide>
        <Grid container border={`5px solid ${theme.palette.primary?.main}`} minHeight={200} p="1rem">
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <Typography textAlign="center" fontWeight="600" fontSize="1.5rem">
                  John Smith
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography textAlign="center" fontWeight="600">
                  Simple User
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container height="9.375rem" position="relative">
              <Grid item>
                <Typography fontSize="2rem" fontWeight="700" position="absolute" left="5%" top="10px">
                  ``
                </Typography>
              </Grid>
              <Grid item>
                <Typography textAlign="center" fontWeight="600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, quas?
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SwiperSlide>
    </Swiper>
  )
}

export default SingleCommentSlider
