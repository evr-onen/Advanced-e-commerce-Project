// ** React Core
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

// import { useSearchParams } from "next/navigation"
import { useGlobalContext } from "src/contexts"

// ** MUI imports
import { Box, Button, Chip, Grid, InputAdornment, Rating, Stack, TextField, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"

// ** Components
import UIBreadcrumbs from "src/components/global/Breadcrumbs"

// ** Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"
import { type Swiper as SwiperRef } from "swiper"
import { Zoom, Thumbs } from "swiper"
import "swiper/css"
import "swiper/css/thumbs"

// ** Icon Imports
import { FaPlus, FaMinus } from "react-icons/fa"
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai"
import { MdCompareArrows } from "react-icons/md"

// ** Types
import { ProductType } from "src/types/createProduct"
import { BsHandbag } from "react-icons/Bs"
import { useRouter } from "next/router"
import TabsProduct from "@/components/sections/admin-panel/product/TabsProduct"
// import { useRouter } from "next/navigation"

type ProductVariantsObjType = {
  [key: string]: string[]
}
interface ParamsType {
  params: {
    productType: string
    slugProduct: string
  }
  router: {
    query: {
      data: number
    }
  }
}

// ** Vars
let tmpProductVariantsObj: ProductVariantsObjType = {}

const Index = (props: ParamsType) => {
  const { params } = props

  // ** States
  const [productVariantsObj, setProductVariantsObj] = useState<ProductVariantsObjType>()
  const [quantity, setQuantity] = useState<number>(1)
  const [product, setProduct] = useState<ProductType>()
  const [count, setCount] = useState(0)
  const swiperRef = useRef<SwiperRef>()
  const quantityRef = useRef<HTMLInputElement>()
  const [checkedButton, setCheckedButton] = useState<{ [key: string]: string }>({})
  const [selectedVariantObj, setSelectedVariantObj] = useState<string>("")

  // ** Calls
  const theme = useTheme()
  const router = useRouter()
  const { setWishlist, wishlist, products, setCompareProducts, compareProducts } = useGlobalContext()
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"))
  const isSm = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    if (router.asPath.split("/").pop() === params.slugProduct) {
      setProduct(products.find((item) => item.id == Number(params.slugProduct)))

      setTimeout(() => {
        // ** it is not render variants i dont know why yet. product is a mutable state and doesnt rerender
        setCount((prev) => prev + 1)
      }, 100)
    } else {
      setProduct(products.find((item) => item.id == Number(router.asPath.split("/").pop())))

      setTimeout(() => {
        // ** it is not render variants i dont know why yet. product is a mutable state and doesnt rerender
        setCount((prev) => prev + 1)
      }, 100)
    }
  }, [router.asPath.split("/").pop()])

  useEffect(() => {
    product?.rowVariantData?.map((variantProduct, index) => {
      Object.keys(variantProduct).map((variant: string) => {
        if (variant !== "quantity") {
          if (tmpProductVariantsObj.hasOwnProperty(variant)) {
            if (tmpProductVariantsObj[variant].indexOf(product?.rowVariantData[index][variant]) === -1) {
              tmpProductVariantsObj[variant].push(product?.rowVariantData[index][variant])
            }
          } else {
            tmpProductVariantsObj[variant] = [product?.rowVariantData[index][variant]]
          }
        }
      })
    })
    setProductVariantsObj(tmpProductVariantsObj)
    tmpProductVariantsObj = {}
  }, [product])

  // ** Functions
  const makePlus = () => {
    setQuantity((prev) => prev + 1)
  }
  const makeMinus = () => {
    if (Number(quantityRef.current?.value) > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const makeCheckedButton = (type: string, data: string) => {
    setCheckedButton({ ...checkedButton, [type]: data })
  }

  const addCompareProduct = () => {
    let tmpCompareProducts = [...compareProducts]!
    if (compareProducts.findIndex((compareItem) => compareItem.id === product?.id)! === -1) {
      tmpCompareProducts = [...tmpCompareProducts, product!]
      setCompareProducts(tmpCompareProducts)
    } else {
      tmpCompareProducts = tmpCompareProducts.filter((item) => item.id !== product?.id)
      setCompareProducts(tmpCompareProducts)
    }
  }

  useEffect(() => {
    renderQuantity()
  }, [checkedButton])

  const addToWishlist = () => {
    let tmp = [...wishlist]
    if (tmp.indexOf(product?.id!) === -1) {
      tmp = [...tmp, product?.id!]
    } else {
      tmp = tmp.filter((id) => id !== product?.id!)
    }
    setWishlist(tmp)
  }

  const renderQuantity = () => {
    if (product !== undefined) {
      if (Object.keys(product?.rowVariantData[0]!).length - 1 === Object.keys(checkedButton).length) {
        let tmpObjVariantBtn = product?.rowVariantData.find((item) => {
          return Object.keys(checkedButton).every((variantkey) => {
            return item[variantkey] === checkedButton[variantkey]
          })
        })
        if (tmpObjVariantBtn !== undefined) {
          setSelectedVariantObj(tmpObjVariantBtn!.quantity as string)
        } else {
          setSelectedVariantObj("0")
        }
      }
    }
  }

  const renderVariants = () => {
    if (productVariantsObj !== undefined) {
      return Object.keys(productVariantsObj as object)?.map((variantKey, index) => {
        return (
          <Grid item xs={12} key={index}>
            <Grid container>
              <Grid item xs={3}>
                <Typography fontWeight="700" textTransform="uppercase">
                  {variantKey} :
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Stack direction="row" spacing={2}>
                  {productVariantsObj?.[variantKey].map((value, ind) => {
                    return (
                      <Button
                        key={ind}
                        variant={checkedButton[variantKey] === value ? "contained" : "outlined"}
                        size="small"
                        sx={{ width: "fit-content" }}
                        onClick={() => {
                          makeCheckedButton(variantKey, value)
                        }}
                      >
                        <Typography textTransform="uppercase" fontWeight="700">
                          {value}
                        </Typography>
                      </Button>
                    )
                  })}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        )
      })
    }
  }

  return (
    <Grid container justifyContent="center">
      <Grid item maxWidth="1250px" width="100%" px="1.5625rem">
        <Grid container>
          <Grid item xs={12}>
            <UIBreadcrumbs product={product} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item maxWidth="1250px" width="100%" mb="25px" px="1.5625rem">
        <Grid container columnSpacing={4} justifyContent="center">
          <Grid item width="100%" maxWidth="500px" height={isSm ? "460px" : "600px"}>
            <Swiper loop={true} spaceBetween={10} thumbs={{ swiper: swiperRef.current }} modules={[Zoom, Thumbs]} className="ProductSwiper">
              {product?.imageFiles.map((imageItem, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Box position="relative" height={isSm ? "325px" : "500px"}>
                      <Image src={`/images/productImages/${imageItem}`} fill className="imageStyle" alt={imageItem} />
                    </Box>
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <Stack justifyContent="space-between">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                spaceBetween={0}
                slidesPerView={3}
                watchSlidesProgress={true}
                modules={[Thumbs]}
                className="ProductThumb"
                style={{ gap: "10px", display: "flex", padding: "0 5px" }}
              >
                {product?.imageFiles.map((imageItem, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Box position="relative" height={isSm ? "100px" : "130px"} m="auto" width={isSm ? "100px" : "130px"}>
                        <Image src={`/images/productImages/${imageItem}`} fill className="imageStyle" alt={imageItem} />
                      </Box>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </Stack>
          </Grid>
          <Grid item width="100%" maxWidth="700px" minHeight="600px">
            <Grid container rowSpacing={4} textAlign="center" justifyContent="center">
              <Grid item>
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant={isSm ? "h4" : "h4"} textTransform="uppercase" fontWeight="700">
                      {product?.product_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Rating name="read-only" value={5} readOnly />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight="700" textAlign={isLarge ? "center" : "left"}>
                  {product?.price} &#8378;
                </Typography>
              </Grid>

              <Grid item>
                <Typography>{product?.description}as</Typography>
              </Grid>

              <Grid item display="flex" alignItems="center" xs={12}>
                <Typography variant="h6" fontWeight={700} mr="5px">
                  Categories :
                </Typography>
                <Link href="/bag">
                  <Chip
                    label={
                      <Typography fontWeight="700" textTransform="uppercase">
                        {product?.sub_cat?.label}
                      </Typography>
                    }
                    className="link"
                  />
                </Link>
              </Grid>
              {selectedVariantObj || product?.quantity ? (
                <Grid item display="flex" alignItems="center" xs={12}>
                  <Typography variant="h6" fontWeight={700} mr="5px">
                    Stock Size :
                  </Typography>

                  <Chip label={<Typography fontWeight="700">{selectedVariantObj || product?.quantity} in stok</Typography>} className="link" />
                </Grid>
              ) : null}

              {productVariantsObj && renderVariants()}

              <Grid item xs={12}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} sm={4} textAlign="center">
                    <TextField
                      sx={{ width: "200px", mx: "10%", "& .MuiOutlinedInput-root": { borderRadius: "50px", background: "#fff" } }}
                      autoComplete="off"
                      type="number"
                      value={quantity}
                      disabled={product?.quantity! || Number(selectedVariantObj) ? false : true}
                      inputRef={quantityRef}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              sx={{ mr: "10px" }}
                              onClick={makeMinus}
                              disabled={product?.quantity! || Number(selectedVariantObj) ? false : true}
                            >
                              <FaMinus fontSize="20px" />
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={makePlus} disabled={product?.quantity! || Number(selectedVariantObj) ? false : true}>
                              <FaPlus fontSize="20px" />
                            </IconButton>
                          </InputAdornment>
                        ),
                        sx: { "& input": { fontSize: "25px", py: "8px", textAlign: "center" } },
                      }}
                      InputLabelProps={{
                        sx: { borderRadius: "250px", color: "secondary" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} textAlign="center">
                    <Button variant="contained" disabled={product?.quantity! > 0 || Number(selectedVariantObj) ? false : true}>
                      <AiOutlineShoppingCart fontSize="24px" />
                      <Typography fontWeight="700" fontSize="18px" textTransform="uppercase" ml="10px">
                        add to cart
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={2} textAlign="center">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        fontSize: "2.25rem",
                        background: theme.palette.secondary.light,
                        "&:hover": { background: theme.palette.secondary.main },
                        [theme.breakpoints.down("md")]: { fontSize: "2rem" },
                      }}
                      onClick={addCompareProduct}
                    >
                      {compareProducts.findIndex((compareItem) => compareItem.id === product?.id)! === -1 ? (
                        <MdCompareArrows color="white" />
                      ) : (
                        <MdCompareArrows color="black" />
                      )}
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={2} textAlign="center">
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        fontSize: "2.25rem",
                        background: theme.palette.secondary.light,
                        "&:hover": { background: theme.palette.secondary.main },
                        [theme.breakpoints.down("md")]: { fontSize: "2rem" },
                      }}
                      onClick={addToWishlist}
                    >
                      {wishlist.indexOf(product?.id as never) === -1 ? (
                        <AiOutlineHeart style={{ color: "crimson" }} />
                      ) : (
                        <AiFillHeart style={{ color: "crimson" }} />
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item maxWidth="1250px" width="100%" mb="25px" px={"2.5625rem"} my={5}>
        <TabsProduct productData={product!} />
      </Grid>
    </Grid>
  )
}

export default Index

export function getServerSideProps(context: any) {
  return {
    props: { params: context.params },
  }
}
