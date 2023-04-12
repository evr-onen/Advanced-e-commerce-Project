// ** Core
import React, { useEffect, useState } from "react"

// ** MUI import
import { Box, Card, CardContent, Divider, Fab, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"

// ** Icons
import { ImCross } from "react-icons/im"

// ** Components
import RowProduct from "@/components/sections/cart/RowProduct"

// ** Context API
import { useGlobalContext } from "src/contexts"
import Link from "next/link"
import Image from "next/image"
import NoSSR from "react-no-ssr"

// ** Types
import { ProductType } from "src/types/createProduct"
import { CartProductType } from "src/types/context"

interface PropsType {
  productData: ProductType
  cartProduct: CartProductType
}
// ** Vars
let totalPrice = 0
const Index = () => {
  const { products, cartProducts, setCartProducts } = useGlobalContext()

  // ** Calls
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down("sm"))
  let jsxItems: any
  const renderProductUnits = () => {
    totalPrice = 0
    let tmpCartProducts = [...cartProducts]

    jsxItems = tmpCartProducts.map((cartProduct, index) => {
      let dataproduct = products.find((product) => product.id === cartProduct.product_id)!

      totalPrice += Number(dataproduct.price) * cartProduct.quantity
      return cartProduct.quantity !== 0 && <RowProduct productData={dataproduct} cartProduct={cartProduct} key={index} destroyRow={destroyRow} />
    })

    return jsxItems
  }

  useEffect(() => {
    cartProducts.map((cartItem) => {
      cartItem.quantity === 0 && destroyRow(cartItem.id)
    })
    console.log(cartProducts)
  }, [cartProducts])

  const destroyRow = (id: number) => {
    let tmpObj = [...cartProducts]
    setCartProducts(tmpObj.filter((item) => item.id !== id))
  }

  return (
    <Grid container className="cartPage" justifyContent="center">
      <Grid item maxWidth="1200px" width="100%">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between" pr={isSm ? "1rem" : 0}>
              <Grid item xs={6}>
                <Typography variant="body1" textTransform="uppercase" fontWeight="700" textAlign="center">
                  item
                </Typography>
              </Grid>
              {!isSm && (
                <>
                  <Grid item xs={2}>
                    <Typography variant="body1" textTransform="uppercase" fontWeight="700" textAlign="center">
                      Price
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1" textTransform="uppercase" fontWeight="700" textAlign="center">
                      quantity
                    </Typography>
                  </Grid>
                </>
              )}
              <Grid item xs={2}>
                <Typography variant="body1" textTransform="uppercase" fontWeight="700" textAlign="center">
                  total
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider light variant="fullWidth" />
          </Grid>
          {renderProductUnits()}
        </Grid>
      </Grid>
      <Grid item maxWidth="1200px" width="100%">
        <Divider light variant="fullWidth" />
      </Grid>
      <Grid item maxWidth="1200px" width="100%" mr={isSm ? "1rem" : 0}>
        <Grid container>
          <Grid item xs={10}>
            <Typography fontSize="20px" textTransform="uppercase" fontWeight="700" textAlign="end">
              SubTotal :
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontSize="20px" textTransform="uppercase" fontWeight="700" textAlign="center">
              {Math.floor(totalPrice * 0.82)} &#8378;
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography fontSize="20px" textTransform="uppercase" fontWeight="700" textAlign="end">
              Tax 18% :
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontSize="20px" textTransform="uppercase" fontWeight="700" textAlign="center">
              {Math.floor(totalPrice * 0.18)} &#8378;
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography fontSize="20px" textTransform="uppercase" fontWeight="700" textAlign="end">
              Grand Total :
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography fontSize="20px" textTransform="uppercase" fontWeight="700" textAlign="center">
              {totalPrice} &#8378;
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Index
