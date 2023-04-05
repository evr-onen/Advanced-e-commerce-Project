// ** React Core
import React, { useState, forwardRef } from "react"
import Image from "next/image"
import fs from "fs/promises"
import path from "path"

// ** Context API
import { useGlobalContext } from "src/contexts"

// ** MUI imports
import {
  Grid,
  TextField,
  Autocomplete,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  useMediaQuery,
  Box,
} from "@mui/material"
import { useTheme } from "@mui/material"

// ** Third Party Imports
import * as yup from "yup"
import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import Axios from "axios"

// ** Types
import { ProductType } from "src/types/createProduct"
import { GetServerSideProps } from "next"

// ** Components
import AddProperties from "@/components/sections/admin-panel/product/addProperties"
import TopSection from "@/components/sections/admin-panel/product/TopSection"
import CategorySection from "@/components/sections/admin-panel/product/CategorySection"
import VariantSection from "@/components/sections/admin-panel/product/VariantSection"
import ImageSection from "@/components/sections/admin-panel/product/ImageSection"

// NOTE - YUP Schema
const schema = yup.object().shape({
  product_name: yup.string().required("Name Required"),
  section_cat: yup
    .object()
    .shape({
      id: yup.number().required(),
      label: yup.string().required(),
    })
    .required("Section Category Required")
    .nullable(),
  main_cat: yup
    .object()
    .shape({
      id: yup.number().required(),
      label: yup.string().required(),
    })
    .required("Main Category Required")
    .nullable(),
  sub_cat: yup
    .object()
    .shape({
      id: yup.number().required(),
      label: yup.string().required(),
    })
    .required("Sub Category Required")
    .nullable(),

  price: yup.string().required("Price Required"),
  description: yup.string().required("Description Required"),
  rowVariantData: yup.array().when("isShouldUseVariant", {
    is: true,
    then: yup.array().of(
      yup.object().shape({
        quantity: yup.string().required("quantity required"),
      })
    ),
  }),
  imageFiles: yup.array().min(1, "Please upload photo").of(yup.string().required()),
  productProperties: yup.array().of(yup.array().of(yup.string().required("Property Item Can not be empty"))),
  isShouldUseVariant: yup.boolean(),
  quantity: yup.number().when("isShouldUseVariant", {
    is: false,
    then: yup.number().required("quantity can not be empty").nullable(),
  }),
  selected_variants: yup.array().when("isShouldUseVariant", {
    is: true,
    then: yup.array().min(1, " Select Variant pls"),
  }),
})

const defaultValues = {
  id: null,
  product_name: "",
  price: "",
  section_cat: null,
  main_cat: null,
  sub_cat: null,
  selected_variants: [],
  rowVariantData: [{ quantity: "" }],
  description: "",
  imageFiles: [],
  selected_properties: null,
  productProperties: [],
  isShouldUseVariant: false,
  quantity: null,
  pics: [],
}

interface PropsType {
  // dirs: string[]
}

const Index = forwardRef((props: PropsType, ref) => {
  // const { dirs } = props
  const { products, setProducts } = useGlobalContext()

  // ** States
  const [selectProduct, setSelectProduct] = useState("")
  const [productImages, setProductImages] = useState<FileList | null>()
  const [imageCount, setImageCount] = useState<number>(0)

  // **Calls
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"))

  // ** Hooks
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
  })

  const {
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = methods

  // ** send images to public
  const handleUpload = async () => {
    try {
      if (!productImages) return
      const formData = new FormData()
      Object.values(productImages!).map((item, index) => {
        formData.append(index.toString() as string, item)
      })

      const { data } = await Axios.post("/api/upload", formData)
    } catch (error: any) {
      // console.log(error.response?.data)
    }
  }

  // ** when Press Save btn
  const submitHandler = (data: ProductType) => {
    console.log(data)
    console.log(products)
    let tmpImageNames: string[] = []
    getValues().pics.map((item: { name?: string; src: File }) => {
      if (item.hasOwnProperty("name")) {
        tmpImageNames.push(item.name as never)
      } else {
        tmpImageNames.push(item.src.name)
      }
      setValue("imageFiles", tmpImageNames! as never)
    })
    if (/* products.every((item) => item.product_name !== data.product_name */ !data.id) {
      let productsData = [...products]
      productsData.push({ ...data, id: Date.now() } as never)
      handleUpload()
      setProducts(productsData as never)
    } else {
      let productsData = [...products]
      let theProduct = productsData.find((item: ProductType) => item.id === data.id)!
      theProduct.product_name = data.product_name
      theProduct.price = data.price
      theProduct.section_cat = data.section_cat
      theProduct.main_cat = data.main_cat
      theProduct.sub_cat = data.sub_cat
      theProduct.selected_variants = data.selected_variants
      theProduct.rowVariantData = data.rowVariantData
      theProduct.description = data.description
      theProduct.imageFiles = data.imageFiles
      theProduct.selected_properties = data.selected_properties
      theProduct.productProperties = data.productProperties
      theProduct.isShouldUseVariant = data.isShouldUseVariant
      !data.isShouldUseVariant ? (theProduct.quantity = data.quantity) : null

      handleUpload()
      setProducts(productsData as never)
    }
    reset(defaultValues)
    setProductImages(null)
    console.log(products)
  }

  // ** render options on select menu at left side edit btn options
  const renderSelectItem = () => {
    return products.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.product_name}
        </MenuItem>
      )
    })
  }

  const editHandler = () => {
    let tmpProduct = products.find((product) => product.id === Number(selectProduct))
    console.log(tmpProduct)
    setProductImages(null)
    reset(tmpProduct as never)
    setImageCount((prev) => prev + 1)
  }
  const takeProductImages = (data: FileList) => {
    setProductImages(data)
  }
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container justifyContent="center" alignItems="center" spacing={4}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" sx={{ color: theme.palette.text.primary }}>
                    Product Select
                  </InputLabel>
                  <Select
                    color="secondary"
                    fullWidth
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Product Select"
                    value={selectProduct}
                    onChange={(e) => setSelectProduct(e.target.value as string)}
                  >
                    {renderSelectItem()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={1} textAlign={isSmall ? "end" : "start"}>
                <Button variant="contained" onClick={editHandler}>
                  Edit
                </Button>
              </Grid>
              <Grid item xs={6} md={1}>
                <Button
                  variant="contained"
                  onClick={() => {
                    reset(defaultValues)

                    setProductImages(null)
                  }}
                >
                  New
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submitHandler as () => string)}>
            <Grid container spacing={4} color="#796c7f" justifyContent="center">
              <TopSection />
              <CategorySection />
              <ImageSection productImages={productImages!} takeProductImages={takeProductImages} imageCount={imageCount} />
              <VariantSection />
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <AddProperties ref={ref} />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="flex-end"></Grid>
            </Grid>
          </form>
        </FormProvider>
      </Grid>
    </Grid>
  )
})
Index.displayName = "Index"

export default Index

// export const getServerSideProps: GetServerSideProps = async () => {
//   const props = { dirs: [] }
//   try {
//     const dirs = await fs.readdir(path.join(process.cwd(), "/public/images/productImages"))
//     props.dirs = dirs as any
//     return { props }
//   } catch (error) {
//     return { props }
//   }
// }
