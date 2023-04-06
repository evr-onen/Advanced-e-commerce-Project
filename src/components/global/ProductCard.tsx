// ** Core
import React from "react"
import Image from "next/image"
import Link from "next/link"

// ** MUI imports
import { Box, Card, CardContent, Fab, Grid, Rating, Typography, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material"

// ** Types
import { ProductType } from "@/types/createProduct"
import { ImCross } from "react-icons/im"
import { useGlobalContext } from "@/contexts"

interface PropsType {
  productData: ProductType
  isRemovable?: boolean
}

const ProductCard = (props: PropsType) => {
  const { productData, isRemovable } = props

  // ** Calls
  const { wishlist, setWishlist } = useGlobalContext()

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down("sm"))

  const removeProduct = (id: number) => {
    let tmpWishlist = [...wishlist]
    setWishlist(tmpWishlist.filter((item) => item !== id))
    console.log(id)
  }
  return (
    <>
      <Grid item xs={8} sm={4} md={3} className="allProduct">
        <Card
          className="productCard"
          sx={{
            position: "relative",
            "&:hover": {
              boxShadow: ` ${theme.palette.text.primary} 0px 14px 28px, ${theme.palette.text.primary} 0px 10px 10px  `,
            },
          }}
          elevation={4}
        >
          <CardContent>
            <Link href={`/allproducts/${productData.id}`}>
              <Grid
                container
                width="100%"
                maxWidth="200"
                minHeight="300px"
                alignItems="flex-start"
                className="link"
                justifyContent="center"
                position="relative"
              >
                <Grid item position="relative" width="200px" height="200px">
                  <Image
                    src={`/images/productImages/${productData.imageFiles[0]}`}
                    fill
                    className="imageStyle"
                    alt={productData.imageFiles[0]}
                    style={{ border: "0.5px solid black" }}
                  />
                </Grid>
                <Grid item>
                  <Grid container textAlign="center">
                    <Grid item xs={12}>
                      <Typography variant={isSm ? "body1" : "subtitle1"} textTransform="capitalize" fontWeight={700} color="error">
                        {productData.sub_cat.label}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant={isSm ? "h5" : "h6"} fontWeight={700}>
                        {productData.product_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Rating name="disabled" value={5} precision={0.5} readOnly />
                    </Grid>
                    <Grid item xs={12} fontSize="24px" fontWeight={700} textAlign="center">
                      ${productData.price}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Link>
            {isRemovable && (
              <Grid item position="absolute" right="0" top="0">
                <Fab color="primary" aria-label="delete" onClick={() => removeProduct(productData.id!)} size="small">
                  <ImCross size="1rem" />
                </Fab>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default ProductCard
