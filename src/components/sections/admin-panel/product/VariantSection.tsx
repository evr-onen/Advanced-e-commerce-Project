// ** Core
import React, { forwardRef, useEffect } from "react"

// ** MUI imports
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"

// ** Context API
import { useGlobalContext } from "@/contexts"

// ** Third Party
import { Controller, useWatch, useFormContext, useFieldArray } from "react-hook-form"

interface PropsType {}

const VariantSection = forwardRef((props: PropsType, ref) => {
  // ** Context API
  const { variants } = useGlobalContext()

  // ** Calls
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

  // ** Hooks
  const {
    reset,
    getValues,
    control,
    formState: { errors },
  } = useFormContext()

  const { fields, append } = useFieldArray({
    control,
    name: "rowVariantData",
  })

  const selectedVariantTypes = useWatch({
    control,
    name: "selected_variants",
  })

  // ** Add variant Products handler
  const addHandler = () => {
    append({ quantity: "" })
  }
  const shouldUseVariantWatch = useWatch({
    control,
    name: "isShouldUseVariant",
  })
  useEffect(() => {
    if (shouldUseVariantWatch === false) reset({ ...getValues(), selected_variants: [], rowVariantData: [{ quantity: "" }] })
  }, [shouldUseVariantWatch])

  const renderVariantValueQuantities = () => {
    return fields.map((item, fieldIndex) => {
      if (selectedVariantTypes?.length && getValues().selected_variants) {
        return (
          <Grid item key={fieldIndex} xs={12} sm={12}>
            <Card>
              <CardContent>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={1}>
                    <Typography variant="h6" fontWeight="700">{`Variant ${fieldIndex + 1}`}</Typography>
                  </Grid>
                  <Grid item xs={12} md={1}>
                    <Controller
                      name={`rowVariantData.${fieldIndex}.quantity`}
                      shouldUnregister
                      control={control}
                      render={({ field: { value, onChange, ref }, fieldState }) => (
                        <TextField
                          variant="standard"
                          size="small"
                          autoComplete="off"
                          value={value || ""}
                          onChange={onChange}
                          inputRef={ref}
                          label="Quantity"
                          fullWidth
                          error={!!fieldState.error}
                        />
                      )}
                    />

                    {/* {errors.rowVariantData?[fieldIndex]?.quantity!  && ( // ts-ignore
                     <FormHelperText error>{errors.rowVariantData?.[fieldIndex]?.quantity?.message?.toString()}</FormHelperText>  
                     )}  */}
                  </Grid>
                  {selectedVariantTypes?.map((variant: { id: number; variantName: string; variantValues: { value: string }[] }, index: number) => {
                    return (
                      <Grid item key={variant.id} minWidth={"150px"} width={isSmall ? "100%" : "auto"}>
                        <FormControl fullWidth>
                          <InputLabel id={variant.variantName + index} sx={{ color: theme.palette.text.primary }}>
                            {variant.variantName}
                          </InputLabel>
                          <Controller
                            name={`rowVariantData.[${fieldIndex}].${variant.variantName}` as any}
                            shouldUnregister
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, value, ref } }) => (
                              <Select
                                size="small"
                                variant="standard"
                                fullWidth
                                defaultValue={variant.variantValues[0]}
                                value={value || ""}
                                onChange={onChange}
                                label={variant.variantName}
                                labelId={variant.variantName + index}
                                ref={ref}
                              >
                                {(variant?.variantValues).map((value: { value: string }, ind: number) => {
                                  return (
                                    <MenuItem key={ind} value={value.value}>
                                      {value.value}
                                    </MenuItem>
                                  )
                                })}
                              </Select>
                            )}
                          />
                          {/* {(errors.rowVariantData[fieldIndex][variant.variantName] as any) && (
                            <FormHelperText error>{errors.product_name?.message}</FormHelperText>
                          )} */}
                        </FormControl>
                      </Grid>
                    )
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )
      }
    })
  }

  return (
    <>
      {shouldUseVariantWatch && (
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={5}>
                  <Controller
                    name="selected_variants"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <Autocomplete
                        size="small"
                        id="selected_variants"
                        onChange={(_, data) => onChange(data)}
                        value={value || null}
                        options={variants}
                        multiple
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.variantName}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Variant Type"
                            inputRef={ref}
                            InputLabelProps={{
                              sx: { color: theme.palette.text.primary },
                            }}
                            error={!!errors.selected_variants}
                            inputProps={{
                              ...params.inputProps,
                            }}
                          />
                        )}
                      />
                    )}
                  />
                  {errors?.selected_variants && (
                    <FormHelperText sx={{ color: "error.main" }}>{errors?.selected_variants?.message?.toString()}</FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button variant="contained" onClick={addHandler}>
                    Add Variant
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}
      <Grid item xs={12}>
        <Grid container spacing={4}>
          {renderVariantValueQuantities()}
        </Grid>
      </Grid>
    </>
  )
})
VariantSection.displayName = "VariantSection"

export default VariantSection
