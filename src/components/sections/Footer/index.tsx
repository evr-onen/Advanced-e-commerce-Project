// ** React Core
import React from "react"
import Image from "next/image"

// ** MUI imports
import { Box, Grid, Typography, IconButton, Stack, Button, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material"
// ** Images
import FooterImage from "public/images/footer/shop1_footer_logo.png"

// ** Icons
import { FaFacebookF } from "react-icons/fa"
import { BsTwitter, BsInstagram } from "react-icons/Bs"
import Link from "next/link"

const Index = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  return (
    <Grid container marginTop="50px">
      <Grid item xs={12} sx={{ background: "#222529" }}>
        <Grid container>
          <Grid item mx="auto" maxWidth="1250px" width="100%" minHeight="450px" alignItems="center" display="flex" py="1.5625rem">
            <Grid container rowGap={4} textAlign="center" flexDirection={isSmall ? "column-reverse" : "row"}>
              <Grid item xs={12} sm={3} px="20px">
                <Grid container alignContent="start">
                  <Grid item xs={12} height="40px">
                    <Typography fontSize="18px" textTransform="uppercase" color="#fff" fontWeight="700">
                      about us
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mb="20px">
                    <Box display="flex" position="relative" justifyContent="center">
                      <Image alt="asdasd" src={FooterImage} height={55} objectFit="contain" />
                    </Box>
                  </Grid>
                  <Grid item>
                    <Typography color="#796c7f">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec vestibulum magna, et dapibus lacus. Duis nec vestibulum magna,
                      et dapibus lacus.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} px="20px">
                <Grid container alignContent="start">
                  <Grid item xs={12} height="40px">
                    <Typography fontSize="18px" textTransform="uppercase" sx={{ color: "white" }} fontWeight="700">
                      contact info
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mb="20px">
                    <Typography fontSize="18px" textTransform="uppercase" sx={{ color: "white" }}>
                      address :
                    </Typography>
                    <Typography fontSize="18px" sx={{ color: "#796c7f" }}>
                      123 Street Name, City, England
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mb="20px">
                    <Typography fontSize="18px" textTransform="uppercase" sx={{ color: "white" }}>
                      PHONE :
                    </Typography>
                    <Typography fontSize="18px" sx={{ color: "#796c7f" }}>
                      (123) 456-7890
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mb="20px">
                    <Typography fontSize="18px" textTransform="uppercase" sx={{ color: "white" }}>
                      EMAIL :
                    </Typography>
                    <Typography fontSize="18px" sx={{ color: "#796c7f" }}>
                      mail@example.com
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mb="20px">
                    <Typography fontSize="18px" textTransform="uppercase" sx={{ color: "white" }}>
                      WORKING DAYS/HOURS :
                    </Typography>
                    <Typography fontSize="18px" sx={{ color: "#796c7f" }}>
                      Mon - Sun / 9:00 AM - 8:00 PM
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mb="20px">
                    <Stack direction="row" justifyContent="space-evenly">
                      <IconButton
                        size="medium"
                        sx={{ "&:hover": { border: "0.5px solid white" }, border: "0.5px solid gray", color: "white" }}
                        className="white-Link"
                      >
                        <FaFacebookF />
                      </IconButton>
                      <IconButton
                        size="medium"
                        sx={{ "&:hover": { border: "0.5px solid white" }, border: "0.5px solid gray", color: "white" }}
                        className="white-Link"
                      >
                        <BsTwitter />
                      </IconButton>
                      <IconButton
                        size="medium"
                        sx={{ "&:hover": { border: "0.5px solid white" }, border: "0.5px solid gray", color: "white" }}
                        className="white-Link"
                      >
                        <BsInstagram />
                      </IconButton>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} px="20px">
                <Grid container alignContent="start">
                  <Grid item xs={12} height="40px" mb="25px">
                    <Typography fontSize="18px" textTransform="uppercase" color="#fff" fontWeight="700">
                      CUSTOMER SERVICE
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mb="20px">
                    <Stack sx={{ textDecoration: "none" }}>
                      <Link href={"/"} className="white-Link">
                        Help & FAQs
                      </Link>
                      <Link href={"/"} color="white" className="white-Link">
                        Order Tracking
                      </Link>
                      <Link href={"/"} className="white-Link">
                        Shipping & Delivery
                      </Link>
                      <Link href={"/"} className="white-Link">
                        Orders History
                      </Link>
                      <Link href={"/"} className="white-Link">
                        Advanced Search
                      </Link>
                      <Link href={"/"} className="white-Link">
                        My Account
                      </Link>
                      <Link href={"/"} className="white-Link">
                        Careers
                      </Link>
                      <Link href={"/"} className="white-Link">
                        About Us
                      </Link>
                      <Link href={"/"} className="white-Link">
                        Corporate Sales
                      </Link>
                      <Link href={"/"} className="white-Link">
                        Privacy
                      </Link>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={3} px="20px">
                <Grid container alignContent="start" textAlign={isSmall ? "center" : "start"}>
                  <Grid item xs={12} height="40px">
                    <Typography fontSize="18px" textTransform="uppercase" color="#fff" fontWeight="700">
                      POPULAR TAGS
                    </Typography>
                  </Grid>
                  <Grid item xs={12} mb="20px">
                    <Stack direction="row" flexWrap="wrap">
                      <Button variant="outlined" size="small" sx={{ width: "max-content", m: "5px", color: "gray" }}>
                        Bag
                      </Button>
                      <Button variant="outlined" size="small" sx={{ width: "max-content", m: "5px", color: "gray" }}>
                        Bag
                      </Button>
                      <Button variant="outlined" size="small" sx={{ width: "max-content", m: "5px", color: "gray" }}>
                        Bag
                      </Button>
                      <Button variant="outlined" size="small" sx={{ width: "max-content", m: "5px", color: "gray" }}>
                        Bag
                      </Button>
                      <Button variant="outlined" size="small" sx={{ width: "max-content", m: "5px", color: "gray" }}>
                        Bag
                      </Button>
                      <Button variant="outlined" size="small" sx={{ width: "max-content", m: "5px", color: "gray" }}>
                        Bag
                      </Button>
                      <Button variant="outlined" size="small" sx={{ width: "max-content", m: "5px", color: "gray" }}>
                        Bag
                      </Button>
                      <Button variant="outlined" size="small" sx={{ width: "max-content", m: "5px", color: "gray" }}>
                        Bag
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Index
