// ** Core
import React, { useEffect, useState } from "react"

// ** MUI import
import { Box, Card, CardContent, Chip, Divider, Fab, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"

// ** Icons
import { ImCross } from "react-icons/im"

// ** Components
import PlusMInusInput from "@/components/global/PlusMInusInput"

// ** Context API
import { useGlobalContext } from "src/contexts"
import Link from "next/link"
import Image from "next/image"

// ** Types
import { ProductType } from "src/types/createProduct"
import { CartProductType } from "src/types/context"

interface PropsType {
  productData: ProductType
  cartProduct: CartProductType
  destroyRow: (id: number) => void
}

const RowProduct = (props: PropsType) => {
  const { productData, cartProduct, destroyRow } = props

  // ** Calls
  const { cartProducts, setCartProducts } = useGlobalContext()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down("sm"))

  // **States
  const [quantity, setQuantity] = useState<number>(cartProduct.quantity)

  const takeQuantity = (QuantityData: number) => {
    setQuantity(QuantityData)
  }

  useEffect(() => {
    let tmpObj = [...cartProducts]
    tmpObj.find((cartItem) => cartItem.id === cartProduct.id)!.quantity = quantity
    setCartProducts(tmpObj)
  }, [quantity])

  const renderVariants = () => {
    if (cartProducts !== undefined) {
      let tmpCartData = cartProducts!.find((item) => item.id === cartProduct.product_id)
      return Object.entries(cartProduct?.variantValue!).map((cartData, index) => {
        if (cartData[0] === "quantity") return
        return (
          <React.Fragment key={index}>
            <Grid item ml="0.5rem">
              <Typography variant="body1" textTransform="uppercase" fontWeight="500" textAlign={isSm ? "center" : "left"}>
                {cartData[0] + "    :"}
              </Typography>
            </Grid>
            <Grid item ml="0.5rem">
              <Chip
                size="small"
                label={
                  <Typography variant="body1" textTransform="uppercase" fontWeight="300" textAlign={isSm ? "center" : "left"}>
                    {cartData[1]}
                  </Typography>
                }
                variant="filled"
              />
            </Grid>
          </React.Fragment>
        )
      })
    }
  }
  return (
    <Grid item xs={12} key={productData?.id}>
      <Grid container height={isSm ? "auto" : "100px"} justifyContent="space-between" alignItems={isSm ? "center" : "start"}>
        <Grid item xs={6}>
          <Grid container columnSpacing={isSm ? 1 : 4} flexDirection={isSm ? "column" : "row"} alignItems={isSm ? "center" : "center"}>
            <Grid item md={4}>
              <Link href={`/allproducts/${productData.id}`}>
                <Box width="100px" height="100px" position="relative">
                  <Image
                    src={`/images/productImages/${productData.imageFiles[0]}`}
                    fill
                    style={{ objectFit: "contain" }}
                    alt={productData.product_name}
                  />
                </Box>
              </Link>
            </Grid>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={12} mt="1rem">
                  <Typography variant="body2" textTransform="capitalize" textAlign={isSm ? "center" : "left"}>
                    {productData.sub_cat.label}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" textTransform="uppercase" fontWeight="700" textAlign={isSm ? "center" : "left"}>
                    {productData.product_name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container>{renderVariants()}</Grid>
                </Grid>
                {isSm && (
                  <>
                    <Grid item xs={12} display="flex" height="100%" alignItems="center" justifyContent="center">
                      <Typography fontSize="1.25rem" textTransform="uppercase" fontWeight="700">
                        {productData.price} &#8378;
                      </Typography>
                    </Grid>
                    <Grid item xs={2} display="flex" alignItems="center" height="100%" justifyContent="center">
                      <PlusMInusInput width={125} iconSize={15} height={25} padY={0} takeQuantity={takeQuantity} defaultQuantity={quantity} />
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {!isSm && (
          <>
            <Grid item xs={2} display="flex" height="100%" alignItems="center" justifyContent="center">
              <Typography fontSize="1.25rem" textTransform="uppercase" fontWeight="700">
                {productData.price} &#8378;
              </Typography>
            </Grid>
            <Grid item xs={2} display="flex" alignItems="center" height="100%" justifyContent="center">
              <PlusMInusInput width={125} iconSize={15} height={25} padY={0} takeQuantity={takeQuantity} defaultQuantity={quantity} />
            </Grid>
          </>
        )}
        <Grid
          item
          xs={2}
          mr={isSm ? "1rem" : 0}
          display="flex"
          alignItems="center"
          width={isSm ? 0 : "100%"}
          height={isSm ? 0 : "100%"}
          justifyContent="center"
          mt={isSm ? "6.5rem" : 0}
        >
          <Typography fontSize="1.25rem" textTransform="uppercase" fontWeight="700" textAlign="center" width="auto" my="auto">
            {Number(productData?.price) * quantity} &#8378;
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default RowProduct
