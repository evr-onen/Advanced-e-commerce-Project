// ** React Core
import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"

// ** Theme Imports
import { useTheme as themeOptions } from "@mui/material/styles"

// ** MUI Imports
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Badge,
  Fab,
  useMediaQuery,
  InputAdornment,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"

// ** Icons
const UIWeatherSunny = dynamic(() => import("mdi-material-ui/WeatherSunny"), { ssr: false })
const UIWeatherNight = dynamic(() => import("mdi-material-ui/WeatherNight"), { ssr: false })
import { GiHamburgerMenu } from "react-icons/gi"
import { ImFacebook, ImTwitter, ImInstagram } from "react-icons/im"
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai"
import { BsHandbag, BsTrash } from "react-icons/bs"

// ** Components
import LangDropdown from "../LangDropdown"
import Search from "./Search"
import Drawer from "./Drawer"

// Images
import Logo from "/public/images/shop1_logo.png"
import { Stack } from "@mui/material"
import { useGlobalContext } from "@/contexts"
import { MdCompareArrows } from "react-icons/md"
import { ProductType } from "@/types/createProduct"

// ** Theme Imports
import { useTheme } from "next-themes"

// ** External Funcs
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const Header = () => {
  // ** States
  const [chartBadgeCount, setChartBadgeCount] = useState(1)
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  // ** Calls
  const theme = themeOptions()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"))
  const { wishlist, cartProducts, compareProducts, setCompareProducts } = useGlobalContext()
  const { resolvedTheme, setTheme } = useTheme()

  // ** Handlers
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return
    }

    setIsOpenDrawer(open)
  }
  // ** for Compare Modal
  const modalToggleHandle = () => {
    setOpen((prev) => !prev)
  }

  const resetCompareProducts = () => {
    setOpen(false)
    setCompareProducts([])
  }
  const removeCompareProduct = (id: number) => {
    let tmpCompareProducts = [...compareProducts]!
    tmpCompareProducts = tmpCompareProducts.filter((item) => item.id !== id)
    setCompareProducts(tmpCompareProducts)
    tmpCompareProducts.length === 0 && setOpen(false)
  }
  // ** Render Funcs
  const renderCompareModal = () => {
    return (
      <Grid container>
        {compareProducts.map((compareProduct) => {
          return (
            <Grid item xs={12} md={4} position="relative" p={4} key={compareProduct.id}>
              <Box position="absolute" right="1rem" top="1rem">
                <IconButton onClick={() => removeCompareProduct(compareProduct.id!)}>
                  <BsTrash color="black" />
                </IconButton>
              </Box>
              <Grid container>
                <Grid item className="productHeader" xs={12}>
                  <Grid container justifyContent="center" columnSpacing={4}>
                    <Grid item className="image" xs={12}>
                      <Box position="relative" height="130px" m="auto" width="130px">
                        <Image
                          src={`/images/productImages/${compareProduct.imageFiles[0]}`}
                          fill
                          className="imageStyle"
                          alt={compareProduct.imageFiles[0]}
                        />
                      </Box>
                    </Grid>
                    <Grid item className="category" xs={12}>
                      <Typography variant="subtitle1" color="red" textTransform="capitalize" textAlign="center">
                        {compareProduct.sub_cat.label}
                      </Typography>
                    </Grid>
                    <Grid item className="title" xs={12}>
                      <Typography variant="body1" color="black" textTransform="capitalize" textAlign="center" fontWeight={700}>
                        {compareProduct.product_name}
                      </Typography>
                    </Grid>
                    <Grid item className="price" xs={12}>
                      <Typography variant="h6" color="black" textTransform="capitalize" textAlign="center" fontWeight={700}>
                        {compareProduct.price} &#8378;
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  {compareProduct.selected_properties?.values.map((section, sectionIndex) => {
                    return (
                      <Grid item xs={12} key={sectionIndex}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography variant="h6" textTransform="capitalize" fontWeight={700} color={theme.palette.customColors?.altText}>
                              {section.value}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container>
                              {section.values.map((property, index) => {
                                return (
                                  <Grid item ml={5} xs={12} key={index}>
                                    <Grid container>
                                      <Grid item xs={6}>
                                        <Typography variant="body1" textTransform="capitalize" fontWeight={700}>
                                          {property.value} :
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <Typography
                                          variant="body2"
                                          textTransform="capitalize"
                                          fontWeight={500}
                                          color={theme.palette.customColors?.altText}
                                        >
                                          {compareProduct?.productProperties![sectionIndex][index]!}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                )
                              })}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    )
  }

  return (
    <Grid container className="header-main" justifyContent="center" marginBottom="5px" alignItems="center">
      <Grid item xs={12} sx={{ background: theme.palette.background.paper }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item sx={{ maxWidth: "1250px", width: "100%", py: "10px" }} mx="auto" px="1.5rem">
            <Grid container justifyContent="space-between" alignItems="center" spacing={1}>
              <Grid item>
                <LangDropdown />
              </Grid>
              <Grid item>
                <IconButton color="inherit" aria-label="themeBtn" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
                  {resolvedTheme === "light" ? (
                    <UIWeatherNight sx={{ color: theme.palette.text.primary }} />
                  ) : (
                    <UIWeatherSunny sx={{ color: theme.palette.text.primary }} />
                  )}
                </IconButton>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={4} sx={{ color: "aliceblue" }}>
                  <Link href="/admin-panel/dashboard">
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ border: "1px solid rgb(205 214 218 / 50%)", "&:hover": { border: "1px solid #fff" } }}
                    >
                      <Typography fontWeight="700" fontSize="14px">
                        Dashboard
                      </Typography>
                    </Button>
                  </Link>
                  <Link href="/allproducts">
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ border: "1px solid rgb(205 214 218 / 50%)", "&:hover": { border: "1px solid #fff" } }}
                    >
                      <Typography fontWeight="700" fontSize="14px">
                        AllProducts
                      </Typography>
                    </Button>
                  </Link>
                </Stack>
              </Grid>
              <Grid item xs={12} md={12} lg={8}>
                <Grid container columnSpacing={4} justifyContent="space-between" alignItems="center">
                  <Grid item className="note" display="flex" xs={2}>
                    <Typography variant="body2" my="auto" textTransform="uppercase" fontWeight={700} textAlign="center">
                      welcome to porto!
                    </Typography>
                  </Grid>
                  <Grid item className="btns" xs={10} sm={8}>
                    <Grid container columnSpacing={isSmall ? 1 : 2} justifyContent="center">
                      <Grid item>
                        <Button
                          variant="text"
                          size="small"
                          sx={{ color: theme?.palette?.text?.secondary, fontWeight: "bold", letterSpacing: "0.275px" }}
                        >
                          <Typography variant="body2" color={theme?.palette?.text?.primary} fontWeight="700" letterSpacing="0.275px">
                            contact us
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="text"
                          size="small"
                          sx={{ color: theme?.palette?.text?.secondary, fontWeight: "bold", letterSpacing: "0.275px" }}
                        >
                          <Typography variant="body2" color={theme?.palette?.text?.primary} fontWeight="700" letterSpacing="0.275px">
                            my account
                          </Typography>
                        </Button>
                      </Grid>{" "}
                      <Grid item>
                        <Button
                          variant="text"
                          size="small"
                          sx={{ color: theme?.palette?.text?.secondary, fontWeight: "bold", letterSpacing: "0.275px" }}
                        >
                          <Typography variant="body2" color={theme?.palette?.text?.primary} fontWeight="700" letterSpacing="0.275px">
                            my wishlist
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="text"
                          size="small"
                          sx={{ color: theme?.palette?.text?.secondary, fontWeight: "bold", letterSpacing: "0.275px" }}
                        >
                          <Typography variant="body2" color={theme?.palette?.text?.primary} fontWeight="700" letterSpacing="0.275px">
                            cart
                          </Typography>
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="text" size="small">
                          <Typography variant="body2" color={theme?.palette?.text?.primary} fontWeight="700" letterSpacing="0.275px">
                            login
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    className="social"
                    xs={0}
                    sm={2}
                    sx={{ display: "none", [theme.breakpoints.up("sm")]: { display: "flex", justifyContent: "center" } }}
                  >
                    <Grid container>
                      <Grid item>
                        <IconButton>
                          <ImFacebook size="1rem" color={theme.palette.text.primary} />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton>
                          <ImTwitter size="1rem" color={theme.palette.text.primary} />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton>
                          <ImInstagram size="1rem" color={theme.palette.text.primary} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ maxWidth: "1250px", width: "100%" }} px="1.5rem" pt="1.5rem">
        <Grid
          container
          sx={{ flexWrap: "nowrap", [theme.breakpoints.down("sm")]: { flexWrap: "wrap", "-webkit-flex-wrap": "wrap" } }}
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Grid item className="logo" sx={{ position: "relative", [theme.breakpoints.down("sm")]: { order: 1, display: "flex", width: "50%" } }}>
            <Link href={"/"}>
              <Box width="111px" position="relative">
                <Image src="/images/shop1_logo.png" priority fill sizes="100vw" className="imageStyle" alt="Logo" style={{ margin: "auto" }} />
              </Box>
            </Link>
          </Grid>
          <Grid
            item
            className="search"
            mx=".5rem"
            sm={12}
            md={8}
            sx={{ [theme.breakpoints.down("sm")]: { order: 3, display: "flex", width: "100%" } }}
            py={isSmall ? ".75rem" : "0"}
          >
            <Grid container>
              {!isLarge && (
                <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
                  <IconButton aria-label="SideMenu" onClick={() => setIsOpenDrawer(true)} sx={{ mr: "10px" }}>
                    <GiHamburgerMenu size="3rem" />
                  </IconButton>
                </Grid>
              )}
              <Grid item xs={10} display="flex" alignItems="center">
                <Search />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            className="btns"
            sx={{ maxWidth: "150px", width: "100%", [theme.breakpoints.down("sm")]: { order: 2, display: "flex", width: "50%" } }}
            xs={2}
          >
            <Grid container columnSpacing={0.3} wrap="nowrap" justifyContent="end">
              <Grid item>
                <IconButton
                  sx={{ "&.MuiIconButton-root": { color: "black" }, fontSize: "2.25rem", [theme.breakpoints.down("md")]: { fontSize: "1.75rem" } }}
                >
                  <AiOutlineUser color={theme.palette.text.primary} />
                </IconButton>
              </Grid>
              <Grid item>
                <Link href="/wishlist">
                  <IconButton
                    sx={{ "&.MuiIconButton-root": { color: "black" }, fontSize: "2.25rem", [theme.breakpoints.down("md")]: { fontSize: "1.75rem" } }}
                  >
                    <Badge color="secondary" badgeContent={wishlist.length} /* invisible={!!mailBadgeCount} */>
                      <AiOutlineHeart color={theme.palette.text.primary} />
                    </Badge>
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/cartpage">
                  <IconButton
                    sx={{ "&.MuiIconButton-root": { color: "black" }, fontSize: "2.25rem", [theme.breakpoints.down("md")]: { fontSize: "1.75rem" } }}
                  >
                    <Badge color="secondary" badgeContent={cartProducts.length} /* invisible={!!mailBadgeCount} */>
                      <BsHandbag color={theme.palette.text.primary} />
                    </Badge>
                  </IconButton>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {compareProducts.length > 0 && (
        <Grid item xs={12} sm={2} textAlign="center" position="fixed" right="1rem" top="1rem">
          <Grid item xs={12} sm={2} textAlign="center">
            <Fab aria-label="delete" onClick={modalToggleHandle} size="medium">
              <Badge
                variant="standard"
                color="primary"
                badgeContent={<Typography> {compareProducts.length} </Typography>} /* invisible={!!mailBadgeCount} */
              >
                <MdCompareArrows size="2rem" />
              </Badge>
            </Fab>
          </Grid>
        </Grid>
      )}
      <Grid item>
        <Dialog
          open={open}
          fullWidth
          maxWidth="xl"
          TransitionComponent={Transition}
          keepMounted
          onClose={modalToggleHandle}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            <Typography textTransform="capitalize" fontWeight={700}>
              Compare Products
            </Typography>
          </DialogTitle>
          <DialogContent>{renderCompareModal()}</DialogContent>
          <DialogActions>
            <Button onClick={modalToggleHandle}>Close</Button>
            <Button onClick={resetCompareProducts}>Reset</Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Drawer toggleDrawer={toggleDrawer} isOpenDrawer={isOpenDrawer} />
    </Grid>
  )
}

export default Header
