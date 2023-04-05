// ** Core
import Image from "next/image"
import Link from "next/link"

// ** MUI Imports
import { useTheme, Grid, Typography } from "@mui/material"

// ** Swiper imports
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import "swiper/css"
import "swiper/css/pagination"

const NewsSlider = () => {
  const theme = useTheme()
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="miniSlider2"
    >
      <SwiperSlide>
        <Grid container>
          <Grid item xs={12} sm={12} position="relative" minHeight="210px" border="0.5px solid black">
            <Image
              src="/images/news/shop1_post4-400x300.jpg"
              fill
              style={{ border: "0.5px solid black" }}
              className="imageStyle"
              alt="shop1_post4-400x300"
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container height="200px">
              <Grid item xs={12} sx={{ [theme.breakpoints.up("md")]: { maxWidth: "300px" } }}>
                <Link href="/">
                  <Typography
                    fontWeight="700"
                    fontSize="1.5rem"
                    color="black"
                    textAlign="center"
                    sx={{ "&:hover": { color: theme?.palette?.secondary?.main }, cursor: "pointer" }}
                  >
                    Fashion Trends
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Typography textAlign="center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, ab! asd</Typography>
              </Grid>
              <Grid item xs={12}>
                <Link href="/">
                  <Typography color="black" fontWeight="700" textAlign="end" sx={{ textDecoration: "none", cursor: "pointer" }}>
                    read more...
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SwiperSlide>

      <SwiperSlide>
        <Grid container>
          <Grid item xs={12} position="relative" minHeight="210px" border="0.5px solid black">
            <Image src="/images/news/shop4_post1.jpg" fill style={{ border: "0.5px solid black" }} className="imageStyle" alt="shop4_post1" />
          </Grid>
          <Grid item xs={12}>
            <Grid container height="200px">
              <Grid item xs={12}>
                <Link href="/">
                  <Typography
                    fontWeight="700"
                    fontSize="1.5rem"
                    color="black"
                    textAlign="center"
                    sx={{ "&:hover": { color: theme?.palette?.secondary?.main }, cursor: "pointer" }}
                  >
                    Fashion Trends
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, ab!</Typography>
              </Grid>
              <Grid item xs={12}>
                <Link href="/">
                  <Typography color="black" fontWeight="700" textAlign="end" sx={{ textDecoration: "none", cursor: "pointer" }}>
                    read more...
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SwiperSlide>
      <SwiperSlide>
        <Grid container>
          <Grid item xs={12} position="relative" minHeight="210px" width="100%">
            <Image src="/images/news/shop4_post3.jpg" fill style={{ border: "0.5px solid black" }} className="imageStyle" alt="shop4_post3" />
          </Grid>
          <Grid item xs={12}>
            <Grid container height="200px">
              <Grid item xs={12}>
                <Link href="/">
                  <Typography
                    fontWeight="700"
                    fontSize="1.5rem"
                    color="black"
                    textAlign="center"
                    sx={{ "&:hover": { color: theme?.palette?.secondary?.main }, cursor: "pointer" }}
                  >
                    Fashion Trends
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, ab!</Typography>
              </Grid>
              <Grid item xs={12}>
                <Link href="/">
                  <Typography color="black" fontWeight="700" textAlign="end" sx={{ textDecoration: "none", cursor: "pointer" }}>
                    read more...
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SwiperSlide>
    </Swiper>
  )
}

export default NewsSlider
