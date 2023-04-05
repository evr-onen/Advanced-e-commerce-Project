// **  Core
import Image from "next/legacy/image"

// ** MUI Imports
import { Box, Button, Typography } from "@mui/material"

// ** Swiper imports
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

// ** Static Images... They will remove for dynamic images
import Slide01 from "public/images/shop1_home_slider1.webp"
import Slide02 from "public/images/shop1_home_slider2.jpg"
import Slide03 from "public/images/shop1_home_slider3.jpg"

const MainSlider = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }} className="sliderItem">
          <Image src={Slide01} quality={100} objectFit="cover" width={896} height={489} className="slideImage" />
          {/* <Typography variant="h4">Evren was Here!</Typography>
          <Button variant="contained">Bas Bana</Button> */}
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box sx={{ display: "flex", justifyContent: "center" }} className="sliderItem">
          <Image src={Slide02} quality={100} objectFit="cover" width={896} height={489} className="slideImage" />
          {/* <Typography variant="h4">Evren was Here!</Typography>
          <Button variant="contained">Bas Bana</Button> */}
        </Box>
      </SwiperSlide>
      <SwiperSlide>
        <Box sx={{ display: "flex", justifyContent: "center" }} className="sliderItem">
          <Image src={Slide03} quality={100} objectFit="cover" width={896} height={489} className="slideImage" />
          {/*  <Typography variant="h4">Evren was Here!</Typography>
          <Button variant="contained">Bas Bana</Button> */}
        </Box>
      </SwiperSlide>
    </Swiper>
  )
}

export default MainSlider
