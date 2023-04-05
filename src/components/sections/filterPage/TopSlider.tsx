// ** Core React
import React from "react"
import Image from "next/image"

// ** Swiper imports
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

// ** MUI Imports
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material"
const TopSlider = () => {
  // ** Calls
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Grid item xs={12}>
      <Swiper loop={true} spaceBetween={10} className="ProductSwiper">
        <SwiperSlide>
          <Box position="relative" height={isSm ? "200px" : "350px"} width="100%">
            <Image src="/images/archPage/shop1_shop_slider1.jpg" fill className="imageStyle" alt="shop1_shop_slider1" />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box position="relative" height={isSm ? "200px" : "350px"} width="100%">
            <Image src="/images/archPage/shop1_shop_slider1.jpg" fill className="imageStyle" alt="shop1_shop_slider1" />
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box position="relative" height={isSm ? "200px" : "350px"} width="100%">
            <Image src="/images/archPage/shop1_shop_slider1.jpg" fill className="imageStyle" alt="shop1_shop_slider1" />
          </Box>
        </SwiperSlide>
      </Swiper>
    </Grid>
  )
}

export default TopSlider
