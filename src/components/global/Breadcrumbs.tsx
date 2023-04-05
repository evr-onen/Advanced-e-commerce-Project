// Core
import Link from "next/link"

// ** MUI Imports
import { Box, Typography, Breadcrumbs, Link as MuiLink } from "@mui/material"

// ** Types
import { ProductType } from "src/types/createProduct"

interface PropsType {
  product?: ProductType
}

const UIBreadcrumbs = (props: PropsType) => {
  const { product } = props
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="black" href={`/${product?.section_cat.label}`}>
          <Typography
            variant="body2"
            color="text.primary"
            textTransform="uppercase"
            sx={{ "&:hover": { textDecoration: "underline" } }}
            fontWeight={700}
          >
            {product?.section_cat.label}
          </Typography>
        </Link>
        <Link color="black" href={`/${product?.main_cat.label}`}>
          <Typography
            variant="body2"
            color="text.primary"
            textTransform="uppercase"
            sx={{ "&:hover": { textDecoration: "underline" } }}
            fontWeight={700}
          >
            {product?.main_cat.label}
          </Typography>
        </Link>
        <Link color="black" href={`/${product?.sub_cat.label}`}>
          <Typography
            variant="body2"
            color="text.primary"
            textTransform="uppercase"
            sx={{ "&:hover": { textDecoration: "underline" } }}
            fontWeight={700}
          >
            {product?.sub_cat.label}
          </Typography>
        </Link>
        <Typography variant="body1" color="text.primary" textTransform="uppercase" fontWeight={700}>
          {product?.product_name}
        </Typography>
      </Breadcrumbs>
    </Box>
  )
}

export default UIBreadcrumbs
