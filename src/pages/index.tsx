// ** React Core
import React from "react"

// ** MUI Imports
import { Box, Grid, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material"

// ** Component Import
import SliderTopModul from "src/components/sections/home/sliderTopModul"
import SideMenu from "src/components/sections/home/SideMenu"
import MainSlider from "src/components/sections/home/MainSlider"
import SingleCommentSlider from "src/components/sections/home/SingleCommentSlider"
import DiscountImages from "src/components/sections/home/DiscountImages"
import FeaturedProducts from "src/components/sections/home/FeaturedProducts"
import NewsSlider from "src/components/sections/home/NewsSlider"
import OurAdvantage from "src/components/sections/home/OurAdvantage"
import SubscribeBlock from "src/components/sections/home/Subscribe"

const index = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Grid
      container
      className="homePage"
      sx={{ maxWidth: "1250px", width: "100%" }}
      justifyContent="center"
      mx="auto"
      px={isSmall ? "0.5rem" : "1.5rem"}
    >
      <Grid item xs={12} mb="1.5rem">
        <Box border="0.5px solid #c9c9c9">
          <SliderTopModul />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container columnSpacing={2} alignItems="flex-start">
          <Grid item xs={12} md={3} sx={{ [theme.breakpoints.down("md")]: { order: 2 } }}>
            <Grid container rowSpacing={4}>
              <Grid item xs={12} maxHeight="30.625rem" height="100%" sx={{ display: "none", [theme.breakpoints.up("md")]: { display: "block" } }}>
                <SideMenu />
              </Grid>
              <Grid item xs={8} mt="1.25rem" mx="auto">
                <SingleCommentSlider />
              </Grid>
              <Grid item xs={12} md={12}>
                <NewsSlider />
              </Grid>
              <Grid item md={12} marginTop="1.25rem" border="0.5px solid black">
                <SubscribeBlock />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={9} sx={{ [theme.breakpoints.down("md")]: { order: 1 } }}>
            <Grid container rowSpacing={4}>
              <Grid item xs={12}>
                <MainSlider />
              </Grid>
              <Grid item xs={12} mt="1.25rem">
                <DiscountImages />
              </Grid>
              <Grid item xs={12} mt="2.5rem" className="featuredProducts">
                <FeaturedProducts />
              </Grid>
              <Grid item xs={12} mt="1.25rem">
                <OurAdvantage />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default index
