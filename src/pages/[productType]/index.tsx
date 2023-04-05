// ** Core
import { useEffect, useState } from "react"

// ** Context API
import { useGlobalContext } from "src/contexts"

// ** MUI imports
import {
  Grid,
  Slider,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { useTheme } from "@mui/material"

// ** Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

// ** Components
import CatsTree from "src/components/sections/filterPage/CatsTree"
import TopSlider from "src/components/sections/filterPage/TopSlider"
import ProductCard from "@/components/global/ProductCard"

// ** Vars
let allVariantsContainer: VariantType = {}
const minDistance = 1

interface ParamsType {
  params: {
    productType: string
    /* slugProduct: string */
  }
}

// ** Types
import { ProductType } from "src/types/createProduct"

type VariantType = {
  [key: string]: string[] | undefined
}
type SimpleArrayObjType = {
  [key: string]: string[]
}

function valuetext(value: number) {
  return `${value}`
}

const index = (props: ParamsType) => {
  const { params } = props

  const { products, sectionCategory, mainCategory, subCategory } = useGlobalContext()
  console.log(params.productType)

  // ** States
  const [productData, setProductData] = useState<ProductType[]>(products)
  const [allVariants, setAllVariants] = useState<VariantType>({})
  const [filterData, setFilterData] = useState<SimpleArrayObjType>({})
  const [filteredProduct, setFilteredProduct] = useState<ProductType[]>([])
  const [productCats, setProductCats] = useState<{ [key: string]: string }>({})
  const [value1, setValue1] = useState<number[]>([0, 1000])
  const [maxValue, setMaxValue] = useState<number>(1000)
  const [open, setOpen] = useState<boolean>(false)

  // ** Calls
  const theme = useTheme()
  const isLg = useMediaQuery(theme.breakpoints.down("lg"))
  const isSm = useMediaQuery(theme.breakpoints.down("sm"))
  const isMd = useMediaQuery(theme.breakpoints.down("md"))

  const handleCheckBox = (variantType: string, variantName: string) => {
    let tmpFilter = { ...filterData }
    if (tmpFilter.hasOwnProperty(variantType)) {
      if (tmpFilter[variantType].indexOf(variantName) === -1) {
        tmpFilter[variantType].push(variantName)
      } else {
        tmpFilter[variantType] = tmpFilter[variantType].filter((item) => item !== variantName)
        tmpFilter[variantType].length === 0 ? delete tmpFilter[variantType] : null
      }
    } else {
      tmpFilter[variantType] = [variantName]
    }

    setFilterData(tmpFilter)
    filterProducts(tmpFilter)
  }

  // ** Filter Function
  const filterProducts = (tmpFilter: SimpleArrayObjType) => {
    let tmpProduct: ProductType[] = []
    let tmpcatFltered: ProductType[] = []
    productData.map((product: ProductType) => {
      Number(product.price) > maxValue ? setMaxValue(Number(product.price)) : null
      // ** for price
      if (Number(product.price) >= value1[0] && Number(product.price) <= value1[1]) {
        if (Object.keys(productCats).length > 0) {
          // ** for category
          if (productCats.hasOwnProperty("section_cat")) {
            if (productCats.section_cat === product.section_cat.label) {
              tmpcatFltered.push(product)
            }
          }
          if (productCats.hasOwnProperty("main_cat")) {
            if (productCats.main_cat === product.main_cat.label) {
              tmpcatFltered.push(product)
            }
          }
          if (productCats.hasOwnProperty("sub_cat")) {
            if (productCats.sub_cat === product.sub_cat.label) {
              tmpcatFltered.push(product)
            }
          }
        } else {
          if (Number(product.price) >= value1[0] && Number(product.price) <= value1[1]) {
            tmpcatFltered.push(product)
          }
        }
        // ** for variant
        if (Object.keys(tmpFilter).length > 0) {
          tmpcatFltered.map((product: ProductType) => {
            product?.rowVariantData?.map((productVariant) => {
              Object.keys(tmpFilter).map((variant) => {
                if (tmpFilter[variant].indexOf(productVariant[variant]) !== -1) {
                  tmpProduct.push(product)
                }
              })
            })
          })
        } else {
          tmpProduct = [...tmpcatFltered]
        }
      }
    })

    tmpProduct = tmpProduct.filter((value, index, array) => array.indexOf(value) === index)
    setFilteredProduct(tmpProduct)
  }

  // ** Cat tree expand handler
  const saveCatsHandler = (data: string, typeKey: string, isExpanded: boolean) => {
    console.log(productCats)

    let tmpData: { [key: string]: string } = {}

    if (isExpanded) {
      tmpData[typeKey] = data
      setProductCats(tmpData)
    }
  }

  // ** Price Filter Handler
  const priceHandleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]])
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)])
    }
  }

  const handleClickOpenToggle = () => {
    open ? setOpen(false) : setOpen(true)
  }

  // ** Dynamic Variants adding function
  const renderVariantFilter = () => {
    return Object.keys(allVariants).map((variantType, index) => {
      return (
        <Grid item xs={12} key={index}>
          <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography textAlign="center" variant="h6" fontWeight="700">
                {variantType}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    {allVariants[variantType]!.map((variantName, ind) => {
                      return (
                        <Grid
                          item
                          key={ind}
                          sx={{
                            "& p": { background: theme.palette.secondary.main },
                            "& .Mui-checked + p": { background: theme.palette.primary.main },
                          }}
                        >
                          <FormControlLabel
                            control={<Checkbox onClick={() => handleCheckBox(variantType, variantName)} style={{ display: "none" }} />}
                            label={
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "white",
                                  p: "5px 8px",
                                  borderRadius: "10px",
                                }}
                              >
                                {variantName}
                              </Typography>
                            }
                          />
                        </Grid>
                      )
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      )
    })
  }

  useEffect(() => {
    const getAllVariants = () => {
      let productVariants: string[] | [] = []

      productData.map((product) => {
        product.selected_variants.map((selectedProductVariant) => {
          productVariants = [...productVariants, selectedProductVariant.variantName] //
        })
      })
      productVariants = productVariants.filter((v, i, a) => a.indexOf(v) === i)

      productData.map((product) => {
        productVariants.map((variant) => {
          product.rowVariantData?.map((variantValue) => {
            if (allVariantsContainer.hasOwnProperty(variant)) {
              if (allVariantsContainer[variant]?.indexOf(variantValue[variant]) === -1 && variantValue[variant] !== undefined) {
                allVariantsContainer[variant]!.push(variantValue[variant])
              }
            } else {
              if (variantValue[variant] !== undefined) allVariantsContainer[variant] = [variantValue[variant]]
            }
          })
        })
      })
      setAllVariants({ ...allVariantsContainer })
    }

    getAllVariants()
  }, [])

  useEffect(() => {
    filterProducts(filterData)
  }, [productCats, value1])

  useEffect(() => {
    if (params.productType) {
      if (sectionCategory.findIndex((item) => item.label === params.productType) !== -1) {
        saveCatsHandler(params.productType, "section_cat", true)
      }
      if (mainCategory.findIndex((item) => item.label === params.productType) !== -1) {
        saveCatsHandler(params.productType, "main_cat", true)
      }
      console.log(subCategory)
      console.log(params.productType)
      if (subCategory.findIndex((item) => item.label === params.productType) !== -1) {
        saveCatsHandler(params.productType, "sub_cat", true)
      }
    }
  }, [])

  return (
    <Grid container>
      <Grid item maxWidth="1250px" width="100%" mx="auto" px="1.5625rem">
        <Grid container spacing={4}>
          {isLg && (
            <Grid item xs={12} textAlign="center" mt="1rem">
              <Button variant="outlined" onClick={handleClickOpenToggle}>
                Filters
              </Button>
            </Grid>
          )}
          {!isLg && (
            <Grid item xs={2} minWidth="250px">
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <CatsTree saveCatsHandler={saveCatsHandler} />
                </Grid>
                <Grid item xs={12}>
                  <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                      <Typography fontSize="24px" fontWeight="700">
                        Price
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container>
                        <Grid item xs={12}>
                          <Grid container justifyContent="space-between">
                            <Grid item xs={4}>
                              {value1[0]}
                            </Grid>
                            <Grid item xs={4}>
                              {value1[1]}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Slider
                            // getAriaLabel={() => "Minimum distance"}
                            value={value1}
                            onChange={priceHandleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            disableSwap
                            marks
                            min={0}
                            max={maxValue}
                            step={10}
                          />
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>

                {renderVariantFilter()}
              </Grid>
            </Grid>
          )}
          <Grid item maxWidth="980px" width="100%" /* xs={isLg ? 12 : 9} */>
            <Grid container>
              <TopSlider />
              <Grid item xs={12} mt="15px">
                <Grid container spacing={4} justifyContent={isSm ? "center" : "start"}>
                  {filteredProduct.map((productCard, index) => (
                    <ProductCard productData={productCard} isRemovable={false} key={index} />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Dialog fullScreen={isSm} open={open} onClose={handleClickOpenToggle} aria-labelledby="responsive-dialog-title">
              <DialogTitle id="responsive-dialog-title">
                <Typography variant="h3">Filters</Typography>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <CatsTree saveCatsHandler={saveCatsHandler} />
                  </Grid>
                  <Grid item xs={12}>
                    <Accordion defaultExpanded={true}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                        <Typography fontSize="24px" fontWeight="700">
                          Price
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container>
                          <Grid item xs={12}>
                            <Grid container justifyContent="space-between">
                              <Grid item xs={4}>
                                {value1[0]}
                              </Grid>
                              <Grid item xs={4}>
                                {value1[1]}
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Slider
                              // getAriaLabel={() => "Minimum distance"}
                              value={value1}
                              onChange={priceHandleChange}
                              valueLabelDisplay="auto"
                              getAriaValueText={valuetext}
                              disableSwap
                              marks
                              min={0}
                              max={maxValue}
                              step={10}
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>

                  {renderVariantFilter()}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClickOpenToggle}>
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default index

export function getServerSideProps(context: any) {
  return {
    props: { params: context.params },
  }
}
