// ** React Core
import React, { forwardRef, useState } from "react"
import { useGlobalContext } from "src/contexts"

// ** MUI Imports
import {
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Fab,
  useMediaQuery,
  Collapse,
} from "@mui/material"
import { useTheme, IconButton } from "@mui/material"

// **Icons
import { FaPlus, FaMinus } from "react-icons/fa"

// ** React Hook Form
import { Controller, useFieldArray, useForm } from "react-hook-form"

// ** Third Party Imports
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

// ** Components
import VariantCardSection from "@/components/sections/admin-panel/VariantCardSection"

const schema = yup.object({
  variantName: yup.string().required("Type is required"),
  variantValues: yup.array().of(
    yup.object().shape({
      value: yup.string().required("Name is required"),
    })
  ),
})
const defaultValues = { variantName: "", variantValues: [{ value: "" }] }

// ** Types
import { VariantsType } from "@/types/context"

const CreateVariant = forwardRef((props, ref) => {
  const { variants, setVariants, products } = useGlobalContext()

  // ** States
  const [selectValue, setSelectValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  // ** Calls
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.up("md"))

  // ** Hooks
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variantValues",
  })

  const addHandler = () => {
    append({ value: "" })
  }

  const handleOnSubmit = (data: VariantsType) => {
    console.log(data)
    if (variants.every((item) => item.variantName !== data.variantName)) {
      let variantData = [...variants]
      variantData.push({ ...data, id: Date.now() })
      setVariants(variantData as never)
    } else {
      let variantData = [...variants]
      variantData.find((item) => item.id === data.id)!.variantValues = data.variantValues
      setVariants(variantData as never)
    }
    reset()
  }
  console.log(products)
  const minuss = (index: number) => {
    console.log(fields)
    checkProduct(getValues().variantName, getValues().variantValues[index].value) && remove(index)
  }

  const renderSelectItem = () => {
    return variants.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.variantName}
        </MenuItem>
      )
    })
  }

  const editHandler = () => {
    let tmpVariant = variants.find((variant) => variant.id === Number(selectValue))
    setIsOpen(true)
    reset(tmpVariant)

    console.log(fields)
  }

  // ** resetFunction
  const resetData = (data: VariantsType) => {
    reset(data)
    setIsOpen(true)
  }

  const renderListCardSection = () => {
    return (
      <Grid container spacing={4}>
        {variants.map((variant, index) => {
          return (
            <Grid item key={index} xs={12} md={4}>
              <VariantCardSection variantData={variant} reset={resetData} />
            </Grid>
          )
        })}
      </Grid>
    )
  }

  // ** Can we delete it.. if it has used in product we cant delete it
  const checkProduct = (type: string, value: string): boolean => {
    let canUdoIt = products.every((product) => {
      return product.selected_variants.every((variant) => {
        if (variant.variantName === type) {
          return variant.variantValues.every((variantValue) => {
            return variantValue.value !== value
          })
        } else {
          return true
        }
      })
    })
    return canUdoIt
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container gap={1} justifyContent={"center"} alignItems="center">
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Variant Select</InputLabel>
                  <Select
                    color="secondary"
                    size="small"
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Variant Select"
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value as string)}
                  >
                    {renderSelectItem()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8} sm={2} md={1.5} textAlign="center">
                <Button variant="contained" onClick={editHandler} fullWidth>
                  Edit
                </Button>
              </Grid>
              <Grid item xs={8} sm={2} md={1.5} textAlign="center">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setIsOpen(true)
                    reset(defaultValues)
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
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <form onSubmit={handleSubmit(handleOnSubmit as () => string)}>
            <Card elevation={4} sx={{ borderRadius: "30px" }}>
              <CardContent>
                <Grid container alignItems="center" spacing={4}>
                  <Grid item xs={12} sm={2}>
                    <Controller
                      control={control}
                      name="variantName"
                      rules={{ required: true }}
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                          fullWidth
                          size="small"
                          variant="standard"
                          InputLabelProps={{
                            sx: { color: theme.palette.text.primary },
                          }}
                          label="Variant Type"
                          value={value}
                          onChange={onChange}
                          autoComplete="off"
                          error={!!errors.variantName}
                        />
                      )}
                    />
                    {errors.variantName && <FormHelperText sx={{ color: "error.main" }}>{errors.variantName.message}</FormHelperText>}
                  </Grid>

                  <Grid item xs={3} md={1}>
                    <Fab color="primary" aria-label="add" onClick={addHandler} size="small">
                      <FaPlus />
                    </Fab>
                  </Grid>
                  <Grid item xs={9}>
                    <Grid container spacing={2} alignItems="center">
                      {fields.map((field, index) => (
                        <Grid item xs={12} md={4} key={field.id}>
                          <Grid container alignItems="center" columnSpacing={1}>
                            <Grid item xs={8} md={9}>
                              <Controller
                                control={control}
                                name={`variantValues.${index}.value`}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                  <TextField
                                    key={field.id}
                                    size="small"
                                    sx={{ width: "100%" }}
                                    variant="outlined"
                                    label={`Variant Value ${index + 1}`}
                                    value={value}
                                    onChange={onChange}
                                    autoComplete="off"
                                    error={!!errors?.variantValues?.[index]}
                                  />
                                )}
                              />
                              {errors?.variantValues?.[index] && (
                                <FormHelperText sx={{ color: "error.main" }}>{errors?.variantValues?.[index]?.value?.message}</FormHelperText>
                              )}
                            </Grid>
                            <Grid item xs={3} md={2}>
                              <Fab color="secondary" aria-label="delete" onClick={() => minuss(index)} size="small">
                                <FaMinus />
                              </Fab>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end" spacing={4}>
                          <Button variant="contained" type="submit" onClick={() => setIsOpen(false)}>
                            save
                          </Button>
                          <Button variant="contained" type="submit" onClick={() => setIsOpen(false)}>
                            Close
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>
        </Collapse>
      </Grid>
      <Grid item xs={12}>
        {renderListCardSection()}
      </Grid>
    </Grid>
  )
})

export default CreateVariant
