// ** Core
import React, { forwardRef, useEffect } from "react"

// ** MUI imports
import { Autocomplete, Card, CardContent, Checkbox, FormControlLabel, FormHelperText, Grid, TextField, Typography, useTheme } from "@mui/material"

// ** Context API
import { useGlobalContext } from "@/contexts"

// ** Third Party
import { Controller, useWatch, useFormContext } from "react-hook-form"

// ** Types
import { PropertyType, PropertyTitleType } from "@/types/context"

interface PropsType {}

const TopSection = forwardRef((props: PropsType, ref) => {
  const { properties, setProperties } = useGlobalContext()

  // ** Calls
  const theme = useTheme()
  // ** Hooks
  const {
    register,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useFormContext()

  const selectedPropertiesObj: PropertyType | null = useWatch({
    control,
    name: "selected_properties",
  })
  const shouldUseVariantWatch = useWatch({
    control,
    name: "isShouldUseVariant",
  })
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Controller
                control={control}
                name="product_name"
                render={({ field: { value, onChange, ref }, fieldState }) => (
                  <TextField
                    variant="standard"
                    autoComplete="off"
                    InputLabelProps={{
                      sx: { color: theme.palette.text.primary },
                    }}
                    value={value || ""}
                    onChange={onChange}
                    inputRef={ref}
                    label="Product Name"
                    fullWidth
                    error={!!fieldState.error}
                  />
                )}
              />

              {errors.product_name && <FormHelperText error>{errors.product_name?.message?.toString()}</FormHelperText>}
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container columnSpacing={4}>
                <Grid item xs={12} md={!shouldUseVariantWatch ? 4 : 9}>
                  <Controller
                    control={control}
                    name="price"
                    render={({ field: { value, onChange, ref }, fieldState }) => (
                      <TextField
                        InputLabelProps={{
                          sx: { color: theme.palette.text.primary },
                        }}
                        autoComplete="off"
                        type="number"
                        variant="standard"
                        value={value || ""}
                        onChange={onChange}
                        inputRef={ref}
                        label="Price"
                        fullWidth
                        error={!!fieldState.error}
                      />
                    )}
                  />

                  {errors.price && <FormHelperText error>{errors.price?.message?.toString()}</FormHelperText>}
                </Grid>
                {!shouldUseVariantWatch && (
                  <Grid item xs={12} md={5}>
                    <Controller
                      control={control}
                      shouldUnregister
                      name="quantity"
                      render={({ field: { value, onChange, ref }, fieldState }) => (
                        <TextField
                          InputLabelProps={{
                            sx: { color: theme.palette.text.primary },
                          }}
                          autoComplete="off"
                          type="number"
                          variant="standard"
                          value={value || ""}
                          onChange={onChange}
                          inputRef={ref}
                          label="Quantity"
                          fullWidth
                          error={!!fieldState.error}
                        />
                      )}
                    />

                    {errors.quantity && <FormHelperText error>{errors.quantity?.message?.toString()}</FormHelperText>}
                  </Grid>
                )}

                <Grid item xs={12} md={3}>
                  <Controller
                    control={control}
                    name="isShouldUseVariant"
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        label='is "Should Use Variant?"'
                        control={<Checkbox checked={value} /* onClick={checkIsParentHandler} */ onChange={onChange} />}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="description"
                render={({ field: { value, onChange, ref }, fieldState }) => (
                  <TextField
                    variant="standard"
                    InputLabelProps={{
                      sx: { color: theme.palette.text.primary },
                    }}
                    value={value || ""}
                    onChange={onChange}
                    inputRef={ref}
                    label="Description"
                    multiline
                    rows={4}
                    // maxRows={4}
                    fullWidth
                    error={!!fieldState.error}
                  />
                )}
              />

              {errors.description && <FormHelperText error>{errors.description?.message?.toString()}</FormHelperText>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
})

export default TopSection
