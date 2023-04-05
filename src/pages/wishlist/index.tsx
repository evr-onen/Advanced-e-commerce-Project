// ** Core
import React from "react"

// ** MUI import
import { Card, CardContent, Fab, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"

// ** Icons
import { ImCross } from "react-icons/im"

// ** Components
import ProductCard from "@/components/global/ProductCard"

// ** Context API
import { useGlobalContext } from "src/contexts"

const Index = () => {
  const { products, wishlist } = useGlobalContext()

  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down("sm"))

  const renderCards = () => {
    return wishlist.map((wishProduct) => {
      let productData = products.find((product) => product.id === wishProduct)
      if (productData !== undefined) return <ProductCard productData={productData} isRemovable={true} key={productData.id} />
    })
  }

  return (
    <Grid container className="wishListPage" justifyContent="center">
      <Grid item maxWidth="1200px" width="100%" mx="1.25rem">
        <Card>
          <CardContent>
            <Grid container spacing={4} justifyContent={isSm ? "center" : "start"}>
              <Grid item xs={12}>
                <Typography variant="h4" fontWeight={700} textAlign="center">
                  My Wishlist
                </Typography>
              </Grid>
              {renderCards()}
              {!wishlist.length && (
                <Stack width="100%" height="50vh" justifyContent="center" alignItems="center">
                  <Typography textTransform="capitalize" variant="h6" fontWeight="700">
                    There is no product in wishlist
                  </Typography>
                </Stack>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Index
