// ** Core
import Image from "next/legacy/image"
import Link from "next/link"

// ** MUI Imports
import { Grid, Typography, Rating, useTheme, Box, useMediaQuery, Card, CardContent } from "@mui/material"

// ** Swiper imports
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

const FeaturedProducts = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Grid container rowSpacing={4}>
      <Grid item borderBottom="0.5px solid" color="black" xs={12} pb="0.625rem">
        <Typography color="black" fontWeight="700" fontSize="1.25rem">
          FEATURED PRODUCTS
        </Typography>
      </Grid>
      <Grid item xs={12} className="featuredItems" display="flex" justifyContent="center">
        <Swiper slidesPerView={isSmall ? 1 : 4} spaceBetween={isSmall ? 5 : 30} className="mySwiper">
          <SwiperSlide style={{ padding: "5px" }}>
            <Link href="/home">
              <Grid
                container
                width="200"
                minHeight="300px"
                alignItems="flex-start"
                className="link"
                padding={1}
                style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
              >
                <Grid item position="relative" width="100%" display="flex" justifyContent="center">
                  <Image src="/images/products/product-4-300x300.jpg" width={200} height={200} objectFit="contain" />
                  <Box className="imageOverlay">
                    <Box className="imageOverlay-Btn" display="flex">
                      <Typography textAlign="center" textTransform="uppercase" color="#fefefe" m="auto">
                        Quick View
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Grid container textAlign={isSmall ? "center" : "start"}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight={700} color="error">
                        Clothes, Watches
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" fontWeight={700}>
                        Porto Extanted Camera
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Rating name="disabled" value={5} precision={0.5} readOnly />
                    </Grid>
                    <Grid item xs={12} fontSize="1.5rem" fontWeight={700} textAlign="center">
                      $599.00
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Link>
          </SwiperSlide>
          <SwiperSlide style={{ padding: "5px" }}>
            <Link href="/home">
              <Grid
                container
                width="200"
                minHeight="300px"
                alignItems="flex-start"
                className="link"
                padding={1}
                style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
              >
                <Grid item position="relative" width="100%" display="flex" justifyContent="center">
                  <Image src="/images/products/product-7-300x300.jpg" width={200} height={200} objectFit="contain" />
                  <Box className="imageOverlay">
                    <Box className="imageOverlay-Btn" display="flex">
                      <Typography textAlign="center" textTransform="uppercase" color="#fefefe" m="auto">
                        Quick View
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Grid container textAlign={isSmall ? "center" : "start"}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight={700} color="error">
                        Com, HeadPhone
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" fontWeight={700}>
                        Battery Charger
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Rating name="disabled" value={0} precision={0.5} readOnly />
                    </Grid>
                    <Grid item xs={12} textAlign="center" display="flex" justifyContent="center">
                      <Typography fontSize="1.25rem" fontWeight={700} color="gray" sx={{ textDecoration: "line-through" }}>
                        $299
                      </Typography>
                      <Typography ml="0.3125rem" fontSize="1.5rem" fontWeight={700}>
                        $259.00
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Link>
          </SwiperSlide>
          <SwiperSlide style={{ padding: "5px" }}>
            <Link href="/home">
              <Grid
                container
                width="200"
                minHeight="300px"
                alignItems="flex-start"
                className="link"
                padding={1}
                style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
              >
                <Grid item position="relative" width="100%" display="flex" justifyContent="center">
                  <Image src="/images/products/product-20-300x300.jpg" width={200} height={200} objectFit="contain" />
                  <Box className="imageOverlay">
                    <Box className="imageOverlay-Btn" display="flex">
                      <Typography textAlign="center" textTransform="uppercase" color="#fefefe" m="auto">
                        Quick View
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Grid container textAlign={isSmall ? "center" : "start"}>
                    <Grid item xs={12} justifyContent="center">
                      <Typography variant="subtitle1" fontWeight={700} color="error">
                        HeadPhone, Watches
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" fontWeight={700}>
                        Black Gray Headset
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Rating name="disabled" value={3.5} precision={0.5} readOnly />
                    </Grid>
                    <Grid item xs={12} fontSize="1.5rem" fontWeight={700} textAlign="center">
                      $39.00
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Link>
          </SwiperSlide>
          <SwiperSlide style={{ padding: "5px" }}>
            <Link href="/home">
              <Grid
                container
                width="200"
                minHeight="300px"
                alignItems="flex-start"
                className="link"
                padding={1}
                style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
              >
                <Grid item position="relative" width="100%" display="flex" justifyContent="center">
                  <Image src="/images/products/product-23-300x300.jpg" width={200} height={200} objectFit="contain" />
                  <Box className="imageOverlay">
                    <Box className="imageOverlay-Btn" display="flex">
                      <Typography textAlign="center" textTransform="uppercase" color="#fefefe" m="auto">
                        Quick View
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Grid container textAlign={isSmall ? "center" : "start"}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight={700} color="error">
                        Com, Tshirt
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" fontWeight={700}>
                        Brown Bag
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Rating name="disabled" value={0} precision={0.5} readOnly />
                    </Grid>
                    <Grid item xs={12} fontSize="1.5rem" fontWeight={700} textAlign="center" justifyContent="center" display="flex">
                      <Typography fontSize="1.25rem" fontWeight={700} color="gray" sx={{ textDecoration: "line-through" }}>
                        $299.00
                      </Typography>
                      <Typography ml="0.3125rem" fontSize="1.5rem" fontWeight={700}>
                        $199.00
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Link>
          </SwiperSlide>
          <SwiperSlide style={{ padding: "5px" }}>
            <Link href="/home">
              <Grid
                container
                width="200"
                minHeight="300px"
                alignItems="flex-start"
                className="link"
                padding={1}
                style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}
              >
                <Grid item position="relative" width="100%" display="flex" justifyContent="center">
                  <Image src="/images/products/product-55-300x300.jpg" width={200} height={200} objectFit="contain" />
                  <Box className="imageOverlay">
                    <Box className="imageOverlay-Btn" display="flex">
                      <Typography textAlign="center" textTransform="uppercase" color="#fefefe" m="auto">
                        Quick View
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Grid container textAlign={isSmall ? "center" : "start"}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight={700} color="error">
                        Com, T-Shirt
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" fontWeight={700}>
                        Casual Note Bag
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Rating name="disabled" value={4} precision={0.5} readOnly />
                    </Grid>
                    <Grid item xs={12} fontSize="1.5rem" fontWeight={700} textAlign="center">
                      <Typography ml="0.3125rem" fontSize="1.5rem" fontWeight={700}>
                        $299.00
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Link>
          </SwiperSlide>
        </Swiper>
      </Grid>
    </Grid>
  )
}

export default FeaturedProducts
