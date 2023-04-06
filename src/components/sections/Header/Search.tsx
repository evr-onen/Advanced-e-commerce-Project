// ** Core
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/router"

// ** MUI Imports
import { Box, Card, CardContent, Fab, Grid, IconButton, InputAdornment, Stack, TextField, Typography, useMediaQuery } from "@mui/material"
import { useTheme, FormControl, FormLabel, FormHelperText } from "@mui/material"

// ** Icona
import { Magnify } from "mdi-material-ui"

// ** Context API
import { useGlobalContext } from "@/contexts"
import { ImCross } from "react-icons/im"
import { ProductType } from "@/types/createProduct"

const Search = () => {
  const { products } = useGlobalContext()

  // ** States
  const [value, setValue] = useState("")
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [foundProducts, setFoundProducts] = useState([])

  // ** Calls
  const theme = useTheme()
  const router = useRouter()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const linkToPage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    setValue("")
    setIsOpen(false)
    router.push("/allproducts/" + id)
  }

  const findProductByValue = () => {
    let tmpProducts = [...products]
    let tmpFounded: ProductType[] | [] = []
    tmpProducts.map((product) => {
      if (product.product_name.toLocaleLowerCase("tr-TR").includes(value.toLocaleLowerCase("tr-TR"))) {
        tmpFounded.push(product as never)
      }
    })
    setFoundProducts(tmpFounded as never)
  }
  useEffect(() => {
    findProductByValue()
  }, [value])

  const searchOverlayRender = () => {
    if (value.length > 2) {
      return foundProducts.map((product: ProductType) => {
        return (
          <Grid item xs={12} key={product.id}>
            <Card onClick={(e) => linkToPage(e, product.id!)} sx={{ cursor: "pointer", "&:hover": { boxShadow: "15" } }}>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item className="image" xs={4}>
                    <Box width="auto" height="100px" position="relative">
                      <Image
                        src={`/images/productImages/${product.imageFiles[0]}`}
                        alt={product.product_name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item className="ProductName" xs={4}>
                    <Grid container>
                      <Grid item xs={12} mt="1rem">
                        <Typography variant="subtitle2" textTransform="capitalize">
                          {product.sub_cat.label}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1" textTransform="uppercase" fontWeight="700">
                          {product.product_name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item className="ProductPrice" xs={4} display="flex" height="100px" alignItems="center" justifyContent="center">
                    <Typography fontSize="1.25rem" textTransform="uppercase" fontWeight="700" my="auto">
                      {product.price} &#8378;
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )
      })
    }
  }
  useEffect(() => {
    value.length > 2 ? setIsOpen(true) : setIsOpen(false)
  }, [value])

  return (
    <Grid container flexWrap="nowrap" justifyContent="center" width="100%">
      <Grid item position="relative" /* width={isSm ? "50%" : "100%"}  */ xs={12} md={5}>
        <TextField
          placeholder="Search..."
          variant="filled"
          autoComplete="off"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Magnify fontSize={"large"} sx={{ m: "auto" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "&::placeholder": { fontSize: "0.4rem" },
            [theme.breakpoints.down("md")]: { maxWidth: "150px" },

            maxWidth: "500px",
            width: "100%",
            minWidth: "100%",

            "& input": { pb: "0.75rem", pt: "0.8125rem", pl: "1.875rem" },
            "& .MuiFilledInput-root": { borderRadius: "20px" },
            "& .MuiFilledInput-root::after": { left: "16px", right: "16px" },
            "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": { borderBottom: 0 },
            "& .MuiFilledInput-root::before": { left: "16px", right: "16px", border: 0 },
          }}
        />

        <Box
          className={`searchOverlay ${isOpen && "searchOverlay-open"} `}
          position="absolute"
          display="flex"
          sx={{
            boxShadow: " rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
            background: theme.palette.background.default,
            minWidth: "100%",
            width: "25vw",
            minHeight: "320px",
            opacity: "0",
            visibility: "hidden",
            transition: "300ms",
          }}
        >
          <Grid container spacing={2} p={1} justifyContent="center" alignItems="center" m="auto">
            {searchOverlayRender()}
            {!foundProducts.length && <Typography>there is no product have like {value} </Typography>}
          </Grid>
          <Box position="absolute" right="0" top="0" zIndex={11}>
            <Fab color="primary" aria-label="delete" onClick={() => setIsOpen(false)} size="small">
              <ImCross size="1rem" />
            </Fab>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Search
